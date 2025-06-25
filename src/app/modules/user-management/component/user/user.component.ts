import { Component } from '@angular/core';
import { UserService } from '../../service/user.service';
import { SharedService } from 'src/app/shared/shared.service';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  users: any = [];
  displayedColumns: string[] = ['image', 'id', 'name', 'email', 'actions'];


  constructor(
    private userService: UserService,
    private sharedService: SharedService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.sharedService.setTitle('User Management')

    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      this.users = res?.data;
    })
  }

  addUser(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '400px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed();
    this.getUsers();

  }

  editUser(user: any) {
    const ref = this.dialog.open(AddUserComponent, {
      width: '400px',
      data: { mode: 'edit', user }
    });
    ref.afterClosed();
    this.getUsers();
  }

  deleteUser(user: any) {
    this.userService.deleteUser(user?.id).subscribe((res: any) => {
      console.log("user deleted successfully");
      this.getUsers();
    })
  }

}
