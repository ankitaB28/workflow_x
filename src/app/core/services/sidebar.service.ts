// core/services/sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  children?: MenuItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _menuItems = new BehaviorSubject<MenuItem[]>([
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard'
    },
    {
      id: 'projects',
      label: 'Projects',
      icon: 'folder',
      route: '/projects',
      children: [
        { 
          id: 'project-list', 
          label: 'All Projects', 
          icon: 'list', 
          route: '/projects/list' 
        },
        { 
          id: 'project-create', 
          label: 'Create Project', 
          icon: 'add', 
          route: '/projects/create' 
        }
      ]
    },
    {
      id: 'team',
      label: 'Team',
      icon: 'people',
      route: '/team'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'settings',
      route: '/settings'
    }
  ]);
  menuItems$ = this._menuItems.asObservable();
  private sidebarState = new BehaviorSubject<boolean>(true);
  sidebarOpen$ = this.sidebarState.asObservable();

  open() {
    this.sidebarState.next(true);
  }

  close() {
    this.sidebarState.next(false);
  }

  toggle() {
    this.sidebarState.next(!this.sidebarState.value);
  }
}
