import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { SidebarService, MenuItem } from '../../core/services/sidebar.service';
import { AuthService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems!: MenuItem[];
  // isCollapsed: boolean = false;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.sidebarService.menuItems$.subscribe(
      items => this.menuItems = items
    );

    // this.sidebarService.isCollapsed$.subscribe(
    //   collapsed => this.isCollapsed = collapsed
    // );
  }

  // toggleSidebar() {
  //   this.sidebarService.toggleSidebar();
  // }

  getUserInitials(): string {
    const user = {firstname: 'ankita',
      lastname: 'bhosale'
    }; // this.authService.getCurrentUser()
    return user
      ? (user.firstname[0] + user.lastname[0]).toUpperCase()
      : 'UN';
  }

  getUserName(): string {
    const user = {firstname: 'ankita',
      lastname: 'bhosale'
    }; // this.authService.getCurrentUser()
    return user
      ? `${user.firstname} ${user.lastname}`
      : 'Unknown User';
  }
}
