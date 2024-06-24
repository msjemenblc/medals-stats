// Angular imports
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

// Service & Model imports
import { Country } from 'src/app/core/models/Country';
import { CountryService } from 'src/app/core/services/country.service';

// Chart imports
import { ActiveElement, Chart, ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

// Icon imports
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    
    // Observable declarations
    public countries$: Observable<Country[] | null>;
    public numberOfCountries$: Observable<number | null>;
    public numberOfJOs$: Observable<number | null>;

    private destroy$: Subject<void> = new Subject<void>();

    // Icons declaration
    faTrophy = faTrophy;

    // Pie configuration // Using Chart.js
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
            tooltip: {
                titleFont: {
                    size: 17,
                    weight: 'bold'
                },
                bodyFont: {
                    size: 15,
                },
                bodyAlign: 'left',
                padding: {
                    x: 10,
                    y: 5
                },
                backgroundColor: '#0c686b',
                usePointStyle: true,
                callbacks: {
                    labelPointStyle: (context) => {

                        let img = new Image(15, 15)
                        img.src = "../../../assets/medal-solid.svg"
                        return {
                            pointStyle: img,
                            rotation: 0
                        }
                    },
                }
            }
        },
        onClick: (
            event: ChartEvent,
            elements: ActiveElement[],
            chart: Chart<'bar'>
        ) => {
            if (elements[0]) {
                this.showDetails(elements[0].index);
            }
          },
    };
    public pieChartData: ChartData<'pie', number[], string | string[]> = {
        labels: [],
        datasets: [
            {
                data: [],
                backgroundColor: ['#EF9C66', '#FCDC94', '#C8CFA0', '#78ABA8', '#E7F0DC'],
            },
        ],
    };
    public pieChartType: ChartType = 'pie';

    constructor(private countryService: CountryService,
                private router: Router) {
        this.countries$ = this.countryService.getCountries();
        this.numberOfCountries$ = this.countryService.getNumberOfCountries();
        this.numberOfJOs$ = this.countryService.getNumberOfJOs();
    }

    ngOnInit(): void {
        this.countryService.loadInitialData()
            .pipe(takeUntil(this.destroy$))
            .subscribe(countries => {
                if (countries) {
                    // Using datas subscribed to update the pie chart
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

    private showDetails(countryIndex: number) {
        // Method called when clicking on a pie section
        this.router.navigateByUrl(`details/${countryIndex + 1}`);
    }
}