import { Routes,RouterModule } from '@angular/router';
import { AddConflictComponent } from './add-conflict/add-conflict.component';
import { NgModule } from '@angular/core';
import { ConflictMapComponent } from './conflict-map/conflict-map.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { AddTribeComponent } from './add-tribe/add-tribe.component';
import { ConflictDetailComponent } from './conflict-detail/conflict-detail.component';
import { ConflictEditComponent } from './conflict-edit/conflict-edit.component';
import { ConflictHistoryComponent } from './conflict-history/conflict-history.component';
import { PeirceMapComponent } from './peirce-map/peirce-map.component';

export const routes: Routes = [
    {path:'addTribe',component: AddTribeComponent,canActivate: [authGuard],},
    {path:'addWar',component: AddConflictComponent,canActivate: [authGuard],},
    {path:'map',component: PeirceMapComponent},
    {path:'login',component: LoginComponent},
    {path:'war/:id',component: ConflictDetailComponent},
    {path:'war/edit/:id',component: ConflictEditComponent,canActivate:[authGuard]},
    {path:'war/versions/:id',component: ConflictHistoryComponent},
    {path:'peirce',component:PeirceMapComponent}
];

@NgModule({
    imports:[RouterModule.forRoot(routes,{enableTracing:true})],
    exports:[RouterModule]
})
export class RoutingModule{


}
