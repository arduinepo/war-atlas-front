import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TribeChoiceComponent } from './tribe-choice.component';

describe('TribeChoiceComponent', () => {
  let component: TribeChoiceComponent;
  let fixture: ComponentFixture<TribeChoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TribeChoiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TribeChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
