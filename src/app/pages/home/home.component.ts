import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country } from 'src/app/core/models/Country';
import { CountryService } from 'src/app/core/services/country.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
    public countries$: Observable<Country[] | null>;
    public numberOfCountries$: Observable<number | null>;
    public numberOfJOs$: Observable<number | null>;

    private destroy$: Subject<void> = new Subject<void>();

    constructor(private countryService: CountryService) {
        this.countries$ = this.countryService.getCountries();
        this.numberOfCountries$ = this.countryService.getNumberOfCountries();
        this.numberOfJOs$ = this.countryService.getNumberOfJOs();
    }

    ngOnInit(): void {
        this.countryService.loadInitialData()
            .pipe(takeUntil(this.destroy$))
            .subscribe();
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}