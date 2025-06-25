import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './component/start/start.component';

const routes: Routes = [
  {
    path: "", component: StartComponent,
    children: [
      { path: "", loadChildren: () => import("./../modules/dashboard/dashboard.module").then(m => m.DashboardModule) },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
