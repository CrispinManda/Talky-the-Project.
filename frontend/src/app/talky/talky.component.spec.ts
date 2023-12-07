import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkyComponent } from './talky.component';

describe('TalkyComponent', () => {
  let component: TalkyComponent;
  let fixture: ComponentFixture<TalkyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TalkyComponent]
    });
    fixture = TestBed.createComponent(TalkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
