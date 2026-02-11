import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { camelToSnake, snakeToCamel } from 'src/app/shared/utils/case.utils';
import { environment } from 'src/environments/environment';



@Injectable()
export class CaseInterceptor implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const modifiedReq = req.clone({
            setHeaders: {
                apikey: environment.supabaseAnonKey,
                Authorization: 'Bearer ' + environment.supabaseAnonKey
            },
            body: req.body ? camelToSnake(req.body) : req
        });

        return next.handle(modifiedReq).pipe(
            map((event) => {
                if (event instanceof HttpResponse){
                    return event.clone({
                        body: snakeToCamel(event.body)
                    });
                }
                return event;
            })
        );
    }
}
