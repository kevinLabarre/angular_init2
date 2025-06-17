import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveNewsComponent } from './remove-news.component';

describe('RemoveNewsComponent', () => {
  let component: RemoveNewsComponent;
  let fixture: ComponentFixture<RemoveNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemoveNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
