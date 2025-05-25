import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deceased',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './deceased.component.html',
  styleUrl: './deceased.component.css'
})
export class DeceasedComponent {
  
}
