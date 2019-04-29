import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalFormComponent } from './modal-form.component';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { DynamicFormInputComponent } from '../dynamic-form/dynamic-form-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TextareaInput } from '../dynamic-form/form-elements/textArea';

describe('ModalFormComponent', () => {
  let component: ModalFormComponent;
  let fixture: ComponentFixture<ModalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalFormComponent,
        DynamicFormComponent,
        DynamicFormInputComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CalendarModule
      ],
      providers: [
        NgbActiveModal
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should set entity name in modal header', () => {
    const expectedHeader = 'TestEntity';
    component.entityName = expectedHeader;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.modal-title').textContent).toBe(expectedHeader);
  });

  it('should close modal when Close button is clicked', async () => {
    const closeButton = fixture.nativeElement.querySelector('.modal-close-btn');
    closeButton.click();

    fixture.whenStable().then(() => {
      expect(component.activeModal.close).toHaveBeenCalledWith({ action: 'close' });
    });
  });

  it('should close modal when Delete button is clicked', async () => {
    const deleteButton = fixture.nativeElement.querySelector('.modal-delete-btn');
    deleteButton.click();

    fixture.whenStable().then(() => {
      expect(component.activeModal.close).toHaveBeenCalledWith({ action: 'delete' });
    });
  });

  it('should close modal when Edit button is clicked', async () => {
    const editButton = fixture.nativeElement.querySelector('.modal-edit-btn');
    editButton.click();

    fixture.whenStable().then(() => {
      expect(component.activeModal.close).toHaveBeenCalledWith({ action: 'save' });
    });
  });

  it('should close modal when Save button is clicked', async () => {
    component.isNewModel = true; // to show save btn
    fixture.detectChanges();

    const saveButton = fixture.nativeElement.querySelector('.modal-save-btn');
    saveButton.click();

    fixture.whenStable().then(() => {
      expect(component.activeModal.close).toHaveBeenCalledWith({ action: 'save' });
    });
  });

  it('should render dynamic form to modal body', () => {
    const textareaInput = new TextareaInput({ key: 'test1', value: 'test' });
    component.formElements = [ textareaInput ];
    component.formComponent.form = new FormGroup({ test1: new FormControl() });
    fixture.detectChanges();

    const modalBody = fixture.nativeElement.querySelector('.modal-body');
    const textarea = modalBody.querySelector('textarea');

    expect(textarea).toBeTruthy();
  });

  it('should show only Delete and Edit button when model is not new', () => {
    component.isNewModel = false;
    fixture.detectChanges();

    const deleteBtn = fixture.nativeElement.querySelector('.modal-delete-btn');
    const editBtn = fixture.nativeElement.querySelector('.modal-edit-btn');
    const saveBtn = fixture.nativeElement.querySelector('.modal-save-btn');

    expect(deleteBtn).toBeTruthy();
    expect(editBtn).toBeTruthy();
    expect(saveBtn).toBeFalsy();
  });

  it('should show only Save button when model is new', () => {
    component.isNewModel = true;
    fixture.detectChanges();

    const deleteBtn = fixture.nativeElement.querySelector('.modal-delete-btn');
    const editBtn = fixture.nativeElement.querySelector('.modal-edit-btn');
    const saveBtn = fixture.nativeElement.querySelector('.modal-save-btn');

    expect(deleteBtn).toBeFalsy();
    expect(editBtn).toBeFalsy();
    expect(saveBtn).toBeTruthy();
  });

  it('should disable Edit button, when the form is not valid', () => {
    spyOn(component.formComponent, 'getPayload').and.returnValue(null);
    fixture.detectChanges();

    const editBtn = fixture.nativeElement.querySelector('.modal-edit-btn');

    expect(editBtn.disabled).toBeTruthy();
  });
});
