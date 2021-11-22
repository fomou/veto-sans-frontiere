import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescritpionComponent } from './prescritpion.component';

describe('PrescritpionComponent', () => {
  let component: PrescritpionComponent;
  let fixture: ComponentFixture<PrescritpionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrescritpionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescritpionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
