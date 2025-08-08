import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadComicComponent } from './upload-comic.component';

describe('UploadComicComponent', () => {
  let component: UploadComicComponent;
  let fixture: ComponentFixture<UploadComicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadComicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadComicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
