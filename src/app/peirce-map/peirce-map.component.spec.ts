import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeirceMapComponent } from './peirce-map.component';

describe('PeirceMapComponent', () => {
  let component: PeirceMapComponent;
  let fixture: ComponentFixture<PeirceMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeirceMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeirceMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
