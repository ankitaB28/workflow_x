// dashboard-stats.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TaskService } from '../../tasks/services/task.service';


@Injectable({ providedIn: 'root' })
export class DashboardStatsService {

  constructor(private taskService: TaskService) {}

  getStats(): Observable<{ total: number; completed: number; inProgress: number, open: number }> {
    return this.taskService.getAllTasks().pipe(
      map(tasks => {
        const total = tasks.length;
        const completed = tasks.filter(t => t.status.toUpperCase() === 'COMPLETE').length;
        const open = tasks.filter(t => t.status.toUpperCase() === 'OPEN').length;
        const inProgress = total - completed - open;
        console.log({ total, completed, inProgress, open });

        return { total, completed, inProgress, open };
      })
    );
  }
}
