import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamingSnakeComponent } from './taming-snake.component';

describe('TamingSnakeComponent', () => {
  let component: TamingSnakeComponent;
  let fixture: ComponentFixture<TamingSnakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamingSnakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamingSnakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
