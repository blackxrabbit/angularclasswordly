import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatepageComponent } from './authenticatepage.component';

describe('AuthenticatepageComponent', () => {
  let component: AuthenticatepageComponent;
  let fixture: ComponentFixture<AuthenticatepageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticatepageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatepageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
