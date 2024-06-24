// Angular imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component imports
import { HomeComponent } from './pages/home/home.component';
import { DetailsListComponent } from './pages/details-list/details-list.component';
import { DetailsComponent } from './pages/details/details.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
    },
    {
        path: 'details',
        component: DetailsListComponent,
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
    },
    {
        path: '**', // wildcard
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
