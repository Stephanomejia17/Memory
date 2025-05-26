import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule} from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  showUserMenu = false;
  
  constructor(private authService: AuthService) {}
  isLoggedIn(): boolean {
    return this.authService.LoggedUser();
  }

  logout() {
    this.authService.logout();
  }


  toggleUserMenu(event: MouseEvent) {
    event.stopPropagation();
    this.showUserMenu = !this.showUserMenu;
  }

  @HostListener('document:click', ['$event'])
  closeUserMenu(event: MouseEvent) {
    if (!(event.target as Element).closest('.user-menu')) {
      this.showUserMenu = false;
    }
  }
}
