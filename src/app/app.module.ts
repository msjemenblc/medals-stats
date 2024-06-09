import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({ declarations: [AppComponent, HomeComponent, NotFoundComponent],
    bootstrap: [AppComponent], imports: [BrowserModule, AppRoutingModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
