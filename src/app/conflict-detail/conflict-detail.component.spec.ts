import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictDetailComponent } from './conflict-detail.component';

describe('ConflictDetailComponent', () => {
  let component: ConflictDetailComponent;
  let fixture: ComponentFixture<ConflictDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConflictDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConflictDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
