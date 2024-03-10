import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTribeComponent } from './add-tribe.component';

describe('AddTribeComponent', () => {
  let component: AddTribeComponent;
  let fixture: ComponentFixture<AddTribeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTribeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
