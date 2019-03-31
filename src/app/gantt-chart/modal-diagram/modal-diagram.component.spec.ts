import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDiagramComponent } from './modal-diagram.component';

describe('ModalDiagramComponent', () => {
  let component: ModalDiagramComponent;
  let fixture: ComponentFixture<ModalDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
