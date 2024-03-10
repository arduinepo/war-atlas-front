import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotiveChoiceComponent } from './motive-choice.component';

describe('MotiveChoiceComponent', () => {
  let component: MotiveChoiceComponent;
  let fixture: ComponentFixture<MotiveChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotiveChoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotiveChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
