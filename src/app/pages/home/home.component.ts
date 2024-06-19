import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Country } from 'src/app/core/models/Country';
import { CountryService } from 'src/app/core/services/country.service';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    
    public countries$: Observable<Country[] | null>;
    public numberOfCountries$: Observable<number | null>;
    public numberOfJOs$: Observable<number | null>;

    private destroy$: Subject<void> = new Subject<void>();

    // Pie 
    public pieChartOptions: ChartConfiguration['options'] = {
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                formatter: (value, ctx) => {
                    if (ctx.chart.data.labels) {
                        return ctx.chart.data.labels[ctx.dataIndex];
                    }
                    return '';
                },
                color: 'black',
                font: {
                    size: 13,
                    weight: "bold"
                }
            },
        },
    };
    public pieChartData: ChartData<'pie', number[], string | string[]> = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: ['#EF9C66', '#FCDC94', '#C8CFA0', '#78ABA8'],
            },
        ],
    };
    public pieChartType: ChartType = 'pie';

    constructor(private countryService: CountryService) {
        this.countries$ = this.countryService.getCountries();
        this.numberOfCountries$ = this.countryService.getNumberOfCountries();
        this.numberOfJOs$ = this.countryService.getNumberOfJOs();
    }

    ngOnInit(): void {
        this.countryService.loadInitialData()
            .pipe(takeUntil(this.destroy$))
            .subscribe(countries => {
                if (countries) {
                    const labels = countries.map(country => country.country);
                    const data = countries.map(country =>
                        country.participations.reduce((sum, participation) => sum + participation.medalsCount, 0)
                    );
                    
                    this.pieChartData.labels = labels;
                    this.pieChartData.datasets[0].data = data;
          
                    if (this.chart) {
                      this.chart.update();
                    }
                }
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}