import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartComponent } from './component/start/start.component';
import { authGuard } from '../modules/authentication/guard/auth.guard';
import { roleGuard } from '../modules/authentication/guard/role.guard';

const routes: Routes = [
  {
    path: "", component: StartComponent,
    canActivate: [authGuard],
    children: [
      {
        path: "",
        loadChildren: () => import("./../modules/dashboard/dashboard.module")
          .then(m => m.DashboardModule)
      },
      {
        path: "user",
        canActivateChild: [roleGuard],
        loadChildren: () => import("./../modules/user-management/user-management.module")
          .then(m => m.UserManagementModule)
      },
      {
        path: "project",
        loadChildren: () => import("./../modules/project-management/project-management.module")
          .then(m => m.ProjectManagementModule)
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
