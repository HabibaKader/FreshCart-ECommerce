import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Angular-FreshCart';
  isLoading = false;

  constructor(private loaderService: LoaderService, private router: Router) {
    // Debug subscription
    this.loaderService.isLoading.subscribe((val) => {
      console.log('Loader state:', val);  
      this.isLoading = val;
    });

    // Route change events
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loaderService.show();
      }
      if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.loaderService.hide();
      }
    });
  }
}

