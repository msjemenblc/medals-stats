// Angular imports
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// Model imports
import { Participation } from '../models/Participation';
import { Country } from '../models/Country';

@Injectable({
    providedIn: 'root',
})
export class CountryService {
    private countryUrl = './assets/mock/countries.json';
    private countries$ = new BehaviorSubject<Country[] | null>(null);

    constructor(private http: HttpClient) {}

    loadInitialData(): Observable<Country[]> {
        return this.http.get<Country[]>(this.countryUrl).pipe(
            tap((data: Country[]) => this.countries$.next(this.mapCountryData(data))),
            catchError((error) => {
                console.error(error);
                this.countries$.next(null);
                return throwError(() => new Error(error.message));
            })
        );
    }

    getCountries(): Observable<Country[] | null> {
        return this.countries$.asObservable();
    }

    getCountryById(countryId: number): Observable<Country | null> {
        return this.countries$.pipe(
            map(countries => {
                if (!countries) return null;

                const country = countries.find(c => c.id === countryId);
                return country ? country : null;
            })
        );
    }

    getCountryParticipationsById(countryId: number): Observable<number | null> {
        return this.countries$.pipe(
            map(countries => {
                if (!countries) return null;

                const country = countries.find(c => c.id === countryId);
                if (!country) return null;

                return country.participations.length;
            })
        )
    }

    getCountryMedalsById(countryId: number): Observable<number | null> {
        return this.countries$.pipe(
            map(countries => {
                if (!countries) return null;
      
                const country = countries.find(c => c.id === countryId);
                if (!country) return null;
      
                return country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0);
            })
        );
    }

    getCountryAthletesById(countryId: number): Observable<number | null> {
        return this.countries$.pipe(
            map(countries => {
                if (!countries) return null;

                const country = countries.find(c => c.id === countryId);
                if (!country) return null;

                return country.participations.reduce((sum, participation) => sum + participation.athleteCount, 0);
            })
        )
    }

    getNumberOfCountries(): Observable<number | null> {
        return this.countries$.pipe(
            map(countries => countries ? countries.length : 0)
        );
    }

    getNumberOfJOs(): Observable<number | null> {
        return this.countries$.pipe(
            map(countries => {
              if (!countries) return 0;
      
              const yearsSet = new Set<number>();
      
              countries.forEach(country => {
                country.participations.forEach(participation => {
                  yearsSet.add(participation.year);
                });
              });
      
              return yearsSet.size;
            })
          );
    }

    private mapCountryData(data: Country[]): Country[] {
        return data.map(country => 
            new Country(
                country.id,
                country.country,
                country.participations.map((participation: Participation) => 
                    new Participation(
                        participation.id, 
                        participation.year, 
                        participation.city, 
                        participation.medalsCount,
                        participation.athleteCount
                    )
                )
            )
        );
    }
}