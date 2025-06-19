import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignalsChildrenComponent } from './signals-children.component';

describe('SignalsChildrenComponent', () => {
  let component: SignalsChildrenComponent;
  let fixture: ComponentFixture<SignalsChildrenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignalsChildrenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignalsChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
