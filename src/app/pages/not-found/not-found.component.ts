// Angular imports
import { Component } from '@angular/core';

// Icon imports
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
    faArrowLeft = faArrowLeft; // Icon declaration
}
