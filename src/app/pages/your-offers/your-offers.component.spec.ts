import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourOffersComponent } from './your-offers.component';

describe('YourOffersComponent', () => {
  let component: YourOffersComponent;
  let fixture: ComponentFixture<YourOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YourOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
