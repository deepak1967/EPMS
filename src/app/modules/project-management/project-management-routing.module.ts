import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './component/project/project.component';
import { AddProjectComponent } from './component/add-project/add-project.component';
import { ProjectDetailComponent } from './component/project-detail/project-detail.component';

const routes: Routes = [
  { path: "", component: ProjectComponent },
  { path: "add", component: AddProjectComponent },
  { path: "edit/:id", component: AddProjectComponent },
  { path: "detail/:id", component: ProjectDetailComponent }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectManagementRoutingModule { }
