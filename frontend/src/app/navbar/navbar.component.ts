import {Component, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {

    toggleOffCanvas() {
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
    }

    constructor(config: NgbDropdownConfig) {
        config.placement = 'bottom-right';
    }

    ngOnInit() {
    }

}
