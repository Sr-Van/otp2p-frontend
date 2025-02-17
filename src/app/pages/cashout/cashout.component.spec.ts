import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashoutComponent } from './cashout.component';

describe('CashoutComponent', () => {
  let component: CashoutComponent;
  let fixture: ComponentFixture<CashoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
