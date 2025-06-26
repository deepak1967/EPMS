import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectManagementRoutingModule } from './project-management-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';



import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProjectComponent } from './component/project/project.component';
import { AddProjectComponent } from './component/add-project/add-project.component';


@NgModule({
  declarations: [
    ProjectComponent,
    AddProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectManagementRoutingModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class ProjectManagementModule { }
