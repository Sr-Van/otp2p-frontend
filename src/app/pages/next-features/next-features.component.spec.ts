import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextFeaturesComponent } from './next-features.component';

describe('NextFeaturesComponent', () => {
  let component: NextFeaturesComponent;
  let fixture: ComponentFixture<NextFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NextFeaturesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NextFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
