import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoukuComponent } from './youku.component';

describe('YoukuComponent', () => {
  let component: YoukuComponent;
  let fixture: ComponentFixture<YoukuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoukuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoukuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
