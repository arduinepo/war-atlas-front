import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictMapComponent } from './conflict-map.component';

describe('ConflictMapComponent', () => {
  let component: ConflictMapComponent;
  let fixture: ComponentFixture<ConflictMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConflictMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConflictMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
