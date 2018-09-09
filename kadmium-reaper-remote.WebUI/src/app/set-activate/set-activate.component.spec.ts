import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetActivateComponent } from './set-activate.component';

describe('SetActivateComponent', () => {
  let component: SetActivateComponent;
  let fixture: ComponentFixture<SetActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
