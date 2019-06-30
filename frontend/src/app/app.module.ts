import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {ToolsComponent} from './tools/tools.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        SidebarComponent,
        FooterComponent,
        DashboardComponent,
        ChatComponent,
        ToolsComponent,
        ManiaplanetStylePipe
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        AppRoutingModule,
        FormsModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        GbxService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
