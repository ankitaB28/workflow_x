import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { UserService } from 'src/app/users/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/users/models/user.model';
import { isFieldInvalid } from 'src/app/shared/utils/form-utils';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss', '../../../shared/styles/form-styles.scss'],
})
export class TaskFormComponent implements OnInit {
  isEditMode = false;
  taskForm!: FormGroup;
  taskId!: number;
  users$!: Observable<User[]>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.users$ = this.userService.getUsers();
    this.initForm();
    this.checkEditMode();
  }

  private initForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['LOW', Validators.required],
      status: ['OPEN', Validators.required],
      assignedTo: [null],
      dueDate: ['', Validators.required],
    });
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.isEditMode = true;
      this.taskId = +id;
      this.loadTask(this.taskId);
    }
  }

  private loadTask(taskId: number): void {
    this.taskService.getTaskById(taskId).subscribe((task) => {
      console.log(task);

      this.taskForm.patchValue(task);
    });
  }

  get f() {
    return this.taskForm.controls;
  }

  submitTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const task: Task = {
      ...this.taskForm.value,
      id: this.taskId,
    };

    if (this.isEditMode) {
      this.taskService.updateTask(task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    }
  }

  onCancel(): void {
    this.taskForm.reset();
  }

  isInvalid(form: FormGroup, field: string): boolean {
    return isFieldInvalid(form, field);
  }


}
