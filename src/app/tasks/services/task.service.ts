import { HttpClient, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from '../models/task.model';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl = `${environment.supabaseUrl}tasks`;

  header: HttpHeaders = new HttpHeaders({
    // apikey: environment.supabaseAnonKey,
    // authorization: 'Bearer ' + environment.supabaseAnonKey,
    Prefer: 'count=exact'
  });

  private totalTask$ = new BehaviorSubject<number>(0);
  total$ = this.totalTask$.asObservable();

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task[]>{
    return this.http.get<Task[]>(this.apiUrl);
  }

  getTasks(
    page: number,
    pageSize: number,
    status: string
  ): Observable<Task[]> {
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;

    let params = new HttpParams()
      .set('select', '*')
      .set('order', 'created_at.desc');

    if (status !== 'All') {
      params = params.set('status', `eq.${status}`);
    }

    this.header.append('Range', `${start}-${end}`);

    return this.http.get<Task[]>(this.apiUrl,
      { headers: this.header, params, observe: 'response' }).pipe(
        tap((res: HttpResponse<Task[]>) => {
          const contentRange = res.headers.get('content-range');
          console.log(contentRange);
          const total = Number(contentRange?.split('/')[1]);

          // const total = res.headers.get('X-Total-Count');
          this.totalTask$.next(total ? total : 0);
        }),
        map((res: HttpResponse<any[]>) => {
          return res.body || [];

        })
      );
  }

  getTaskById(taskId: number): Observable<Task> {
    const params = new HttpParams()
      .set('select', '*')
      .set('id', `eq.${taskId}`);

    return this.http.get<any>(this.apiUrl, { params })
      .pipe(
        map((task) => {
          task = task[0];

          return task;

          // return mappedTask;
        })
      );
  }

  updateTask(task: Task): Observable<Task> {
    // const mappedTask = {
    //       id: task.id,
    //       title: task.title,
    //       description: task.description,
    //       status: task.status,
    //       priority: task.priority,
    //       due_date: task.dueDate,
    //       assigned_to: task.assignedTo
    //     };
    return this.http.patch<Task>(`${this.apiUrl}?id=eq.${task.id}`, task);
  }

  createTask(task: Task): Observable<Task> {

    return this.http.post<Task>(this.apiUrl, task);
  }
}
