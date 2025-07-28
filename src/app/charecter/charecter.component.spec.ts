import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharecterComponent } from './charecter.component';

describe('CharecterComponent', () => {
  let component: CharecterComponent;
  let fixture: ComponentFixture<CharecterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharecterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
