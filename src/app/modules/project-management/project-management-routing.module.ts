import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './component/project/project.component';
import { AddProjectComponent } from './component/add-project/add-project.component';

const routes: Routes = [
  { path: "", component: ProjectComponent },
  { path: "add", component: AddProjectComponent },
  { path: "edit/:id", component: AddProjectComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
