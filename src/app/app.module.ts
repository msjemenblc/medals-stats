import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

@NgModule({ 
    declarations: [
        AppComponent, 
        HomeComponent, 
        NotFoundComponent
    ],
    bootstrap: [
        AppComponent
    ], 
    imports: [
        BrowserModule, 
        AppRoutingModule,
        BaseChartDirective
    ], 
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ] 
})

export class AppModule {
    constructor() {
        Chart.register(...registerables, ChartDataLabels);
    }
}
