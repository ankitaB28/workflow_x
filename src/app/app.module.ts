import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CaseInterceptor } from './core/interceptors/case.interceptor';
import { DashboardModule } from './dashboard/dashboard.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LayoutModule } from './layout/layout.module';

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    SharedModule,
    TasksModule,
    UsersModule,
    DashboardModule,
    LayoutModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: CaseInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
