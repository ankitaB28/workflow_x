import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';

import { combineLatest } from 'rxjs';
import { Chart, ChartConfiguration, registerables } from 'chart.js';

import { TaskService } from '../../../tasks/services/task.service';
import { UserService } from '../../../users/services/user.service';
import { Task } from '../../../tasks/models/task.model';
import { User } from '../../../users/models/user.model';
import {
  CHART_COLORS
} from 'src/app/shared/utils/chart-color-util';
import { DashboardStatsService } from '../../services/dashboard-stats.service';

Chart.register(...registerables);

type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'COMPLETE';
type Priority = 'Low' | 'Medium' | 'High';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {

  @ViewChild('statusChart') statusChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('priorityChart') priorityChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('assigneeChart') assigneeChartRef!: ElementRef<HTMLCanvasElement>;

  private tasks: Task[] = [];
  private users: User[] = [];

  animatedTotal = 0;
  animatedCompleted = 0;
  animatedInProgress = 0;
  animatedOpen = 0;

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private statsService: DashboardStatsService
  ) {}

  ngOnInit(): void {
    this.loadData();
    this.getAnimatedCounts();
  }

  ngAfterViewInit(): void {}

  private loadData(): void {
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

  private getAnimatedCounts(): void {
    this.statsService.getStats().subscribe(stats => {
      this.animatedTotal = stats.total;
      this.animatedCompleted = stats.completed;
      this.animatedInProgress = stats.inProgress;
      this.animatedOpen = stats.open;
    });
  }

  // 📊 Status Chart
  private buildStatusChart(): void {

    const statusCount: Record<TaskStatus, number> = {
      OPEN: 0,
      IN_PROGRESS: 0,
      COMPLETE: 0
    };

    this.tasks.forEach(task => {
      statusCount[task.status as TaskStatus]++;
    });

    new Chart(this.statusChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Open', 'In Progress', 'Complete'],
        datasets: [{
          data: [
            statusCount.OPEN,
            statusCount.IN_PROGRESS,
            statusCount.COMPLETE
          ],
          backgroundColor: CHART_COLORS.blue
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  // 🥧 Priority Chart
  private buildPriorityChart(): void {

    const priorityCount: Record<Priority, number> = {
      Low: 0,
      Medium: 0,
      High: 0
    };

    this.tasks.forEach(task => {
      priorityCount[task.priority as Priority]++;
    });

    new Chart(this.priorityChartRef.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Low', 'Medium', 'High'],
        datasets: [{
          data: [
            priorityCount.Low,
            priorityCount.Medium,
            priorityCount.High
          ],
          backgroundColor: [
            CHART_COLORS.green,
            CHART_COLORS.yellow,
            CHART_COLORS.red
          ]
        }]
      }
    });
  }

  // 📈 Tasks by Assignee
  private buildAssigneeChart(): void {

    const labels = this.users.map(u => `${u.firstname} ${u.lastname}`);

    const data = this.users.map(
      u => this.tasks.filter(t => t.assignedTo === u.id).length
    );

    new Chart(this.assigneeChartRef.nativeElement, {
      type: 'bar', // horizontalBar removed in v3+
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: CHART_COLORS.blue
        }]
      },
      options: {
        indexAxis: 'y', // this replaces horizontalBar
        responsive: true,
        plugins: {
          legend: { display: false }
        }
      }
    });
  }
}