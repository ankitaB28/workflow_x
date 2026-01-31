import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { UserService } from 'src/app/users/services/user.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class TaskListComponent implements OnInit {
  tasks$!: Observable<Task[]>;
  total$!: Observable<number>;

  userMap$!: Observable<{ [key: number]: string }>;

  private page$ = new BehaviorSubject<number>(1);
  private status$ = new BehaviorSubject<string>('All');

  pageSize = 5;
  page = 1;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.fetchUserNames();
    this.loadTasks();
  }

  fetchUserNames(): void {
    this.userMap$ = this.userService.getUsers().pipe(
      map((users) => {
        const mapObj: { [key: number]: string } = {};
        users.forEach(
          (user) => (mapObj[user.id] = user.firstname + ' ' + user.lastname),
        );
        return mapObj;
      }),
    );
  }

  loadTasks(): void {
    this.tasks$ = combineLatest([this.page$, this.status$]).pipe(
      switchMap(([page, status]) => {
        return this.taskService.getTasks(page, this.pageSize, status);
      }),
    );
    this.tasks$.subscribe((tasks) => {
      console.log(tasks);
    });
    this.total$ = this.taskService.total$;
    console.log(this.total$.subscribe((t) => t));
  }

  onPageChange(currentPage: number): void {
    this.page = currentPage;
    this.page$.next(currentPage);
  }

  onStatusChange(status: string): void {
    this.status$.next(status);
    // this.page$.next(1);
  }

  trackByTaskId(index: number, task: Task): number {
    return task.id;
  }


}
