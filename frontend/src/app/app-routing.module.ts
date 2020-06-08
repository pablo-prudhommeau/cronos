import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {ChatComponent} from './chat/chat.component';

const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'chat', component: ChatComponent},
    {path: '**', redirectTo: '/dashboard'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
