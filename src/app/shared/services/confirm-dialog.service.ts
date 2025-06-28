import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  constructor(private dialog: MatDialog) { }

  confirm(title: string, message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { title, message },
    });

    return dialogRef.afterClosed();
  }
}
