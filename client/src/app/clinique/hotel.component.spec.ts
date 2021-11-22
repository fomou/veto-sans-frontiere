import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";

import { CliniqueComponent } from "./clinique.component";

describe("CliniqueComponent", () => {
  let component: CliniqueComponent;
  let fixture: ComponentFixture<CliniqueComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CliniqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliniqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
