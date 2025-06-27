import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { FormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';

import { HeaderComponent } from './component/header/header.component';
import { StartComponent } from './component/start/start.component';
import { DataControlComponent } from './component/data-control/data-control.component';
import { ToasterComponent } from './component/toaster/toaster.component';


@NgModule({
  declarations: [
    HeaderComponent,
    StartComponent,
    DataControlComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule,
    MatMenuModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,

  ],
  exports: [
    HeaderComponent,
    DataControlComponent
  ]
})
export class SharedModule { }
