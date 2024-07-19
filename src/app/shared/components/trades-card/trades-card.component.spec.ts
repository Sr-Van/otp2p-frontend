import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradesCardComponent } from './trades-card.component';

describe('TradesCardComponent', () => {
  let component: TradesCardComponent;
  let fixture: ComponentFixture<TradesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradesCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TradesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
