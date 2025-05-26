import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
})
export class AppComponent {
  title = 'memory';
  showHeader = false;
  showFooter = true; 

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects;

        this.showHeader = url === '';

        // Oculta el footer en login y register
        this.showFooter = event.url === ''
        this.showFooter =
          url !== '/login' &&
          url !== '/sign-up' && 
          url !== '/services-memory' && 
          url !== '/solicitud-sin-plan' &&
          url !== '/confirm' &&
          url !== '/payments' &&
          url !== '/certificate' &&
          url !== '/deceased' &&
          url !== '/plans' &&
          url !== '/profile' &&
          url !== '/profile-edit' &&
          url !== '/transfer' &&
          url !== '/transfer-standar';
      });
  }
}
