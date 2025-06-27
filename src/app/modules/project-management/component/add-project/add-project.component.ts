import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectService } from '../../service/project.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  userForm: FormGroup;
  mode: string = '';
  title: string = 'Add New Project'
  parsedIds: string[] = [];
  projectId: string = '';
  projects: any = []


  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private toastService: ToastService,
    private dialogRef: MatDialogRef<AddProjectComponent>,

  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      status: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      assignedUsers: ['',]
    });
  }

  ngOnInit() {

    if (this.data.mode === 'edit') {
      this.title = 'Edit User'
      this.userForm.patchValue(this.data?.user);
    }
  }

  getProjects() {
    const data = {
      limit: 20,
      page: 1,
    }
    this.projectService.getProjects(data).subscribe((res: any) => {
      this.projects = res?.data;
    })
  }
  save(): void {
    if (!this.userForm.valid) return;

    const data = this.userForm.value;
    data.id = this.data?.user?.id
    if (this.data.mode === 'add') {
      this.projectService.createProjects(data).subscribe((res) => {
       if (res) {
          this.toastService.add('Project successfully added.', 2000, "success");
          this.dialogRef.close();
        }
      }, (error) => {
        this.toastService.add('Something went wrong!', 2000, "error");
      });
    } else {
      this.projectService.updateProjects(data).subscribe((res) => {
       if (res) {
          this.toastService.add('Project successfully added.', 2000, "success");
          this.dialogRef.close();
        }
      }, (error) => {
        this.toastService.add('Something went wrong!', 2000, "error");
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }

  addIds(event: Event): void {
    const input = (event.target as HTMLTextAreaElement).value;
    // Split, trim, and store your IDs array however you need
    this.parsedIds = input.split(',')
      .map(id => id.trim())
      .filter(id => id !== '');
  }


}
