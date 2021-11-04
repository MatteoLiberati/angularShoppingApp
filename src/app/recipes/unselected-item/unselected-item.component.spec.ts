import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnselectedItemComponent } from './unselected-item.component';

describe('UnselectedItemComponent', () => {
  let component: UnselectedItemComponent;
  let fixture: ComponentFixture<UnselectedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnselectedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnselectedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
