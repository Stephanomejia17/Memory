import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css']
})
export class CertificateComponent implements AfterViewInit {
  @ViewChild('firmaCanvas', { static: false }) firmaCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  ngAfterViewInit() {
    const canvas = this.firmaCanvas?.nativeElement;
    if (!canvas) {
      console.error('Canvas no disponible');
      return;
    }
    this.ctx = canvas.getContext('2d')!;

    canvas.addEventListener('mousedown', () => this.drawing = true);
    canvas.addEventListener('mouseup', () => {
      this.drawing = false;
      this.ctx.beginPath();
    });
    canvas.addEventListener('mouseout', () => {
      this.drawing = false;
      this.ctx.beginPath();
    });
    canvas.addEventListener('mousemove', (event) => this.draw(event));
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;
    const canvas = this.firmaCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#000';

    this.ctx.lineTo(x, y);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
  }

  clearSignature() {
    const canvas = this.firmaCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.ctx.beginPath();
  }
}
