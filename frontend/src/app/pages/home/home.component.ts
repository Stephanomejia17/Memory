import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PlansComponent } from '../plans/plans.component';
import { ServiceComponent } from '../services-memory/services-memory.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule, PlansComponent, ServiceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
