import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Components
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DetailsComponent } from './pages/details/details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

// Charts
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({ 
    declarations: [
        HeaderComponent,
        AppComponent,
        HomeComponent,
        DetailsComponent,
        NotFoundComponent
    ],
    bootstrap: [
        AppComponent
    ], 
    imports: [
        BrowserModule, 
        AppRoutingModule,
        BaseChartDirective,
        FontAwesomeModule
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ],
})

export class AppModule {
    constructor() {
        Chart.register(...registerables, ChartDataLabels);
    }
}
