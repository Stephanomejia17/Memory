import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicesMemoryComponent } from './services-memory.component';

describe('ServicesMemoryComponent', () => {
  let component: ServicesMemoryComponent;
  let fixture: ComponentFixture<ServicesMemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicesMemoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicesMemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
