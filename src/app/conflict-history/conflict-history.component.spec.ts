import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConflictHistoryComponent } from './conflict-history.component';

describe('ConflictHistoryComponent', () => {
  let component: ConflictHistoryComponent;
  let fixture: ComponentFixture<ConflictHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConflictHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConflictHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
