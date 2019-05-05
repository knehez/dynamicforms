import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImgComponent } from './modal-img.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalImgComponent', () => {
  let component: ModalImgComponent;
  let fixture: ComponentFixture<ModalImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalImgComponent
      ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show the given image in modal body', () => {
    // 1x1 transparent PNG
    const b64ImageToRender =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

    component.imgDataB64 = b64ImageToRender;
    fixture.detectChanges();
    const b64ImageRendered = fixture.nativeElement.querySelector('.modal-body>img').attributes['src'].value;

    expect(b64ImageRendered).toBe(b64ImageToRender);
  });
});
