import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConflictComponent } from './add-conflict.component';

describe('AddConflictComponent', () => {
  let component: AddConflictComponent;
  let fixture: ComponentFixture<AddConflictComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddConflictComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddConflictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
