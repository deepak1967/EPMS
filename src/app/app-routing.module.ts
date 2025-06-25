import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "login", loadChildren: () => import("./modules/authentication/authentication.module").then(m => m.AuthenticationModule) },
  { path: "dashboard", loadChildren: () => import("./shared/shared.module").then(m => m.SharedModule) },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
