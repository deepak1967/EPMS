import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../service/task.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  taskForm: FormGroup;
  mode: string = '';
  title: string = 'Add New Task'

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddTaskComponent>,
    private taskService: TaskService
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      status: ['', Validators.required],
      priority: ['', Validators.required],
      dueDate: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.data.mode === 'edit') {
      this.title = 'Edit Task'
      this.taskForm.patchValue(this.data?.task);
    }

  }
  save(): void {
    if (!this.taskForm.valid) return;

    const data = this.taskForm.value;
    data.id = this.data?.task?.id
    if (this.data.mode === 'add') {
      this.taskService.createTask(this.data.projectId, data).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.taskService.updateTask(this.data.projectId, data).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
