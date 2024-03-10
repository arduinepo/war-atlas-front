import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictEditComponent } from './conflict-edit.component';

describe('ConflictEditComponent', () => {
  let component: ConflictEditComponent;
  let fixture: ComponentFixture<ConflictEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConflictEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConflictEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
