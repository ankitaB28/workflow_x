import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit
} from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Chart } from 'chart.js';

import { TaskService } from '../../../tasks/services/task.service';
import { UserService } from '../../../users/services/user.service';
import { Task } from '../../../tasks/models/task.model';
import { User } from '../../../users/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {

  private tasks: Task[] = [];
  private users: User[] = [];

  constructor(
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.taskService.getAllTasks(),
      this.userService.getUsers()
    ]).subscribe(([tasks, users]) => {
      this.tasks = tasks;
      this.users = users;

      this.buildStatusChart();
      this.buildPriorityChart();
      this.buildAssigneeChart();
    });
  }

  ngAfterViewInit(): void {}

  // 📊 Status Chart
  private buildStatusChart(): void {
    const statusCount = {
      OPEN: 0,
      IN_PROGRESS: 0,
      DONE: 0
    };

    this.tasks.forEach(task => statusCount[task.status]++);

    new Chart('statusChart', {
      type: 'bar',
      data: {
        labels: ['Open', 'In Progress', 'Done'],
        datasets: [{
          data: [
            statusCount.OPEN,
            statusCount.IN_PROGRESS,
            statusCount.DONE
          ]
        }]
      },
      options: {
        responsive: true,
        legend: { display: false }
      }
    });
  }

  // 🥧 Priority Chart
  private buildPriorityChart(): void {
    const priorityCount = {
      LOW: 0,
      MEDIUM: 0,
      HIGH: 0
    };

    this.tasks.forEach(task => priorityCount[task.priority]++);

    new Chart('priorityChart', {
      type: 'pie',
      data: {
        labels: ['Low', 'Medium', 'High'],
        datasets: [{
          data: [
            priorityCount.LOW,
            priorityCount.MEDIUM,
            priorityCount.HIGH
          ]
        }]
      }
    });
  }

  // 📈 Tasks by Assignee
  private buildAssigneeChart(): void {
    const labels = this.users.map(u => u.firstname+ ' ' + u.lastname);
    const data = this.users.map(
      u => this.tasks.filter(t => t.assignedTo === u.id).length
    );

    new Chart('assigneeChart', {
      type: 'horizontalBar',
      data: {
        labels,
        datasets: [{
          data
        }]
      },
      options: {
        responsive: true,
        legend: { display: false }
      }
    });
  }
}
