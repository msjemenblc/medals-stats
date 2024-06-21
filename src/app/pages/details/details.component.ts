import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Country } from 'src/app/core/models/Country';
import { CountryService } from 'src/app/core/services/country.service';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})

export class DetailsComponent implements OnInit, OnDestroy {
    public country$: Observable<Country | null>;

    private destroy$: Subject<void> = new Subject<void>();

    constructor(private countryService: CountryService,
                private route: ActivatedRoute) {
        this.country$ = this.route.params.pipe(
            switchMap((params) => this.countryService.getCountryById(+params['id']))
        );
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
