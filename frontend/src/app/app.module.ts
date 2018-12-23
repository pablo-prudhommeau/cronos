import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {FooterComponent} from './footer/footer.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GbxService} from '../gbx/gbx.service';
import {ChatComponent} from './chat/chat.component';
import {ManiaplanetStylePipe} from './pipes/maniaplanet-style.pipe';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        DashboardComponent,
        ChatComponent,
        ManiaplanetStylePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        NgbModule
    ],
    providers: [GbxService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
