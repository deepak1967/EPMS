import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './component/start/start.component';
import { authGuard } from '../modules/authentication/auth.guard';

const routes: Routes = [
  {
    path: "", component: StartComponent,
    canActivate: [authGuard],
    children: [
      { path: "", loadChildren: () => import("./../modules/dashboard/dashboard.module").then(m => m.DashboardModule) },

    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
