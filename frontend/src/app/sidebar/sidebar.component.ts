import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    public shouldShow = true;

    constructor() {
    }

    toggleOffCanvas() {
        document.querySelector('.sidebar-offcanvas').classList.toggle('active');
    }

    ngOnInit() {
        document.getElementsByClassName('nav-link')
    }

}
