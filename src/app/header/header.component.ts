// Angular imports
import { Component } from '@angular/core';

// Icon imports
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
    faTrophy = faTrophy; // Icon declaration
}
