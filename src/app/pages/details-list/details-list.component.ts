import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { Country } from 'src/app/core/models/Country';
import { CountryService } from 'src/app/core/services/country.service';
import { Router } from '@angular/router';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-details-list',
    templateUrl: './details-list.component.html',
    styleUrls: ['./details-list.component.scss'],
})

export class DetailsListComponent implements OnInit, OnDestroy {
    faArrowLeft = faArrowLeft
    public countries$: Observable<Country[] | null>;

    private destroy$: Subject<void> = new Subject<void>();

    constructor(private countryService: CountryService,
                private router: Router) {
        this.countries$ = this.countryService.getCountries();
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
