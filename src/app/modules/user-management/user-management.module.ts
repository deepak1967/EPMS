import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { UserComponent } from './component/user/user.component';
import { AddUserComponent } from './component/add-user/add-user.component';


@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ]
})
export class UserManagementModule { }
