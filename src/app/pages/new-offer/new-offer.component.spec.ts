import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOfferComponent } from './new-offer.component';

describe('NewOfferComponent', () => {
  let component: NewOfferComponent;
  let fixture: ComponentFixture<NewOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
