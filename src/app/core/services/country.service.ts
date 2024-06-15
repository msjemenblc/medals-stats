import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
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

    getNumberOfCountries(): Observable<number> {
        return this.countries$.pipe(
            map(countries => countries ? countries.length : 0)
        )
    }

    getNumberOfJOs(): Observable<number> {
        return of(140);
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