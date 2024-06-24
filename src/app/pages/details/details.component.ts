import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Country } from 'src/app/core/models/Country';
import { CountryService } from 'src/app/core/services/country.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
})

export class DetailsComponent implements OnInit, OnDestroy {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

    faArrowLeft = faArrowLeft;

    public country$: Observable<Country | null>;
    public numberOfParticipations$: Observable<number | null>;
    public numberOfMedals$: Observable<number | null>;
    public numberOfAthletes$: Observable<number | null>;

    private destroy$: Subject<void> = new Subject<void>();

    // Line 
    public lineChartOptions: ChartConfiguration['options'] = {
        layout: {
            padding: {
                top: 30,
            },
        },
        plugins: {
            legend: {
                display: false
            },
            datalabels: {
                padding: {
                    bottom: 5,
                },
                align: 'end',
                color: 'black',
                font: {
                    weight: 'bold',
                    size: 14,
                },
                formatter: (value) => `${value}`
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
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Dates',
                    font: {
                        size: 18,
                        lineHeight: 1.5,
                        weight: 'bolder'
                    }
                },
                grid: {
                    color: 'rgba(200, 200, 200, 1)',
                }
            },
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.7)',
                }
            }
        },
        elements: {
            line: {
                tension: 0,
            },
            point: {
                radius: 6,
                hoverRadius: 9,
            }
        },
    };
    public lineChartData: ChartData<'line', number[], string | string[]> = {
        labels: [],
        datasets: [
            {
                data: [],
                borderColor: '#0c686b',
                backgroundColor: '#0c686b',
            },
        ],
    };
    public lineChartType: ChartType = 'line';

    constructor(private countryService: CountryService,
                private route: ActivatedRoute) {
        this.country$ = this.route.params.pipe(
            switchMap((params) => this.countryService.getCountryById(+params['id']))
        );
        this.numberOfParticipations$ = this.route.params.pipe(
            switchMap((params) => this.countryService.getCountryParticipationsById(+params['id']))
        );
        this.numberOfMedals$ = this.route.params.pipe(
            switchMap((params) => this.countryService.getCountryMedalsById(+params['id']))
        );
        this.numberOfAthletes$ = this.route.params.pipe(
            switchMap((params) => this.countryService.getCountryAthletesById(+params['id']))
        );

    }
    
    ngOnInit(): void {
        this.countryService.loadInitialData()
            .pipe(takeUntil(this.destroy$))
            .subscribe();
            
        this.country$
            .pipe(takeUntil(this.destroy$))
            .subscribe(country => {
                if (country) {
                    const labels = country.participations.map(participation => participation.year.toString());
                    const data = country.participations.map(participation => participation.medalsCount);
          
                    this.lineChartData.labels = labels;
                    this.lineChartData.datasets[0].data = data;
          
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
