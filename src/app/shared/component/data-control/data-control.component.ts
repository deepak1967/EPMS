import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

type SortField = 'priority' | 'dueDate';
type SortDirection = 'asc' | 'desc';
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
  @Input() IsShowSorting: boolean = false


  @Output() filtered = new EventEmitter<any[]>();
  @Output() sortData = new EventEmitter<any[]>();
  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter<PageEvent>();


  newArray: any[] = [];

  ngOnChanges() {
    if (this.data instanceof MatTableDataSource) {
      this.newArray = this.data.data.slice();
    } else if (Array.isArray(this.data)) {
      this.newArray = this.data.slice();
    }
  }

  applySort(field: SortField, dir: SortDirection = 'desc'): void {
    const priorityIndex: any = { high: 3, medium: 2, low: 1 };

    this.newArray.sort((a, b) => {
      if (field === 'dueDate') {
        const diff = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        return dir === 'asc' ? diff : -diff;
      }

      const diff = priorityIndex[a.priority] - priorityIndex[b.priority];
      return dir === 'asc' ? diff : -diff;
    });

    this.filtered.emit(this.newArray);
  }

  applyFilter(event: Event): void {
    const term = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.data instanceof MatTableDataSource) {
      this.data.filterPredicate = (row: any, filter: string) =>
        this.filterFields.some(f =>
          (row[f] ?? '').toString().toLowerCase().includes(filter)
        );
      this.data.filter = term;
      return;
    }

    const filteredArray = this.data.filter(row =>
      this.filterFields.some(f =>
        (row[f] ?? '').toString().toLowerCase().includes(term)
      )
    );
    this.filtered.emit(filteredArray);
  }

  onPageChange(event: any) {
    this.pageChange.emit(event);
  }
}
