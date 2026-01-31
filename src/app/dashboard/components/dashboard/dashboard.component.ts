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
import { CHART_COLORS, PRIORITY_BORDER_COLORS, PRIORITY_COLORS } from 'src/app/shared/utils/chart-color-util';

import { DashboardStatsService } from '../../services/dashboard-stats.service';


type StatKey = 'animatedTotal' | 'animatedCompleted' | 'animatedInProgress' | 'animatedOpen';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, AfterViewInit {

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
    this.generateCharts();
    this.getAnimatedCounts();
  }

  private generateCharts(): void{
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
      this.animatedOpen =  stats.open;
    });
  }

//   private animateCount(property: StatKey, target: number) {
//   if (target === 0) {
//     this[property] = 0;
//     return;
//   }

//   let current = 0;
//   const steps = 20;
//   const increment = Math.max(1, Math.floor(target / steps));
//   console.log(target);

//   const interval = setInterval(() => {
//     current += increment;

//     if (current >= target) {
//       this[property] = target;
//       clearInterval(interval);
//     } else {
//       this[property] = current;
//     }
//   }, 30);
// }


  ngAfterViewInit(): void {}

  // 📊 Status Chart
  private buildStatusChart(): void {

    const statusCount = {
      OPEN: 0,
      IN_PROGRESS: 0,
      COMPLETE: 0
    };

    this.tasks.forEach(task => statusCount[task.status]++);

    const barChart = new Chart('statusChart', {
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
        legend: { display: false }
      }
    });
  }

  // 🥧 Priority Chart
  private buildPriorityChart(): void {
    const priorityCount = {
      Low: 0,
      Medium: 0,
      High: 0
    };

    this.tasks.forEach(task => priorityCount[task.priority]++);

    const pieChart = new Chart('priorityChart', {
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
          ],
          // borderColor:[
          //   PRIORITY_BORDER_COLORS.low,
          //   PRIORITY_BORDER_COLORS.medium,
          //   PRIORITY_BORDER_COLORS.high
          // ]
        }]
      }
    });
  }

  // 📈 Tasks by Assignee
  private buildAssigneeChart(): void {
    const labels = this.users.map(u => u.firstname + ' ' + u.lastname);
    const data = this.users.map(
      u => this.tasks.filter(t => t.assignedTo === u.id).length
    );

    const barChart = new Chart('assigneeChart', {
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
