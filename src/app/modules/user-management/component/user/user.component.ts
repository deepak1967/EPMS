import { Component, Input, TrackByFunction } from '@angular/core';
import { UserService } from '../../service/user.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { PageEvent } from '@angular/material/paginator';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: any = [];
  displayedColumns: string[] = ['image', 'id', 'name', 'email', 'role', 'actions'];
  filteredUsers: any[] = [];
  pagedUsers: any[] = [];
  page: any = 1;
  limit: any = 20;
  totalItems: any

  trackBy: TrackByFunction<any> = (index: number, item: any) => item.id ?? index;

  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private dialog: MatDialog,
    public toastService: ToastService
  ) { }

  ngOnInit() {
    this.sharedService.setTitle('User Management')
    this.getUsers();
  }

  getUsers() {
    const data = {
      limit: this.limit || 20,
      page: this.page || 1,
    }
    this.userService.getUsers(data).subscribe((res: any) => {
      this.users = res?.data ?? [];
      this.totalItems = res?.data?.length;
      this.filteredUsers = [...this.users];
      this.page = 0;
      this.paginate()
    })
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '600px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsers();
    });

  }

  editUser(user: any) {
    const ref = this.dialog.open(AddUserComponent, {
      width: '600px',
      data: { mode: 'edit', user }
    });
    ref.afterClosed().subscribe(() => {
      this.getUsers();
    });
  }

  deleteUser(user: any) {
    this.userService.deleteUser(user?.id).subscribe((res: any) => {
      if (res) {
        this.toastService.add('User successfully deleted.', 2000, "success");
        this.getUsers()
      }
    }, (error) => {
      this.toastService.add('Something went wrong!', 2000, "error");
    });
  }

  onFilterChanged(filtered: any[]): void {
    this.filteredUsers = filtered;
    this.totalItems = filtered.length;
    this.page = 0;
    this.paginate();
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.limit = event.pageSize;
    this.paginate();
  }

  paginate() {
    const start = this.page * this.limit;
    const end = start + this.limit;
    this.pagedUsers = this.filteredUsers.slice(start, end);
  }


  removeToast(index: number) {
    this.toastService.remove(index);
  }

}
