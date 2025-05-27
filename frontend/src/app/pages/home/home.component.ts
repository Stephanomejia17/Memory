import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PlansComponent } from '../plans/plans.component';
import { ServiceComponent } from '../services-memory/services-memory.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, RouterLink, ReactiveFormsModule, PlansComponent, ServiceComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  backgroundImages: string[] = [
    '/cielo1.jpg',
    '/cielo5.jpg',
    '/cielo3.jpg'
  ];

  currentIndex: number = 0;
  private intervalId: any;

  constructor() { }

  ngOnInit(): void {
    this.startCarousel();
  }

  ngOnDestroy(): void {
    this.stopCarousel();
  }

  private startCarousel(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.backgroundImages.length;
    }, 5000);
  }

  private stopCarousel(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
