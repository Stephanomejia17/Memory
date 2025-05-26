import { Component, OnInit } from '@angular/core'; 
import { Router, RouterLink } from '@angular/router'; 
import { CommonModule } from '@angular/common'; 

export interface Member {
  id: number;
  name: string;
  planType: 'STANDARD' | 'PREMIUM' | 'BASIC'; 
}

@Component({
  selector: 'app-deceased',
  standalone: true,
  imports: [CommonModule, RouterLink], 
  templateUrl: './deceased.component.html',
  styleUrl: './deceased.component.css'
})
export class DeceasedComponent implements OnInit { 

  members: Member[] = []; 

  constructor(private router: Router) { } 

  ngOnInit(): void {

    this.members = [
      { id: 1, name: 'ANGELA', planType: 'STANDARD' },
      { id: 2, name: 'SOFIA', planType: 'PREMIUM' }, 
      { id: 3, name: 'ANDRES', planType: 'STANDARD' },
  
    ];
  }

  onMemberSelect(member: Member): void {
    console.log('Miembro seleccionado:', member.name, 'Tipo de plan:', member.planType);

    if (member.planType === 'STANDARD') {
      console.log('Plan STANDARD detectado. Redirigiendo a /transfer');
      this.router.navigate(['/transfer']);
    } else {
      console.log('Plan no STANDARD. Redirigiendo a /certificate.');
      this.router.navigate(['/certificate']); 
    }
  }
}