import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowMouseComponent } from './follow-mouse.component';

describe('FollowMouseComponent', () => {
  let component: FollowMouseComponent;
  let fixture: ComponentFixture<FollowMouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowMouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowMouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
