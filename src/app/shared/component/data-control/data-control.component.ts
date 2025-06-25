import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-data-control',
  templateUrl: './data-control.component.html',
  styleUrls: ['./data-control.component.css']
})
export class DataControlComponent {
  @Input() data: any[] | MatTableDataSource<any> = [];
  @Input() filterFields: string[] = [];
  @Input() totalItems: any;
  @Input() pageSize: number = 20;


  @Output() filtered = new EventEmitter<any[]>();
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();


  applyFilter(event: Event): void {
    const term = (event.target as HTMLInputElement).value.trim().toLowerCase();

    // If it's a MatTableDataSource
    if (this.data instanceof MatTableDataSource) {
      this.data.filterPredicate = (row: any, filter: string) =>
        this.filterFields.some(f =>
          (row[f] ?? '').toString().toLowerCase().includes(filter)
        );
      this.data.filter = term;
      return;
    }

    // Else, plain array
    const filteredArray = this.data.filter(row =>
      this.filterFields.some(f =>
        (row[f] ?? '').toString().toLowerCase().includes(term)
      )
    );
    this.filtered.emit(filteredArray);
  }

  onPageChange(event:any) {
    this.pageChange.emit(event);
  }
}
