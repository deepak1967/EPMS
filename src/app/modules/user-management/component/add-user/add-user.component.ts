import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;
  mode: string = '';
  title: string = 'Add New User'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddUserComponent>,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.title = 'Edit User'
      this.userForm.patchValue(this.data?.user);
    }

  }
  save(): void {
    if (!this.userForm.valid) return;

    const data = this.userForm.value;
    data.avatar = '';
    data.id = this.data?.user?.id
    if (this.data.mode === 'add') {
      this.userService.createUser(data).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.userService.updateUser(data).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
