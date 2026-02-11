import { Component, DoCheck } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'WorkFlowX';
  // isCollapsed = false;
  // isLoggedIn$ = this.authService.isLoggedIn$;
  // constructor(private authService:AuthService){

  // }
  // toggleSidebar(): void {
  //   this.isCollapsed = !this.isCollapsed;
  // }

  ngDoCheck(): void{
    //  console.log(this.authService.isAuthentited());

  }
}
