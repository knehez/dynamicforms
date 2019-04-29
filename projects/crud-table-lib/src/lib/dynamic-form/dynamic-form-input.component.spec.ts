import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormInputComponent } from './dynamic-form-input.component';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { FileHandlerService } from './fileHandler.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { TextareaInput } from './form-elements/textArea';
import { TextboxInput } from './form-elements/textBox';
import { FileInput } from './form-elements/fileinput';
import { DropdownInput } from './form-elements/dropdown';
import { CheckBoxInput } from './form-elements/checkbox';
import { RadioInput } from './form-elements/radio';
import { By } from '@angular/platform-browser';

describe('DynamicFormInputComponent', () => {
  let component: DynamicFormInputComponent;
  let fixture: ComponentFixture<DynamicFormInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormInputComponent ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CalendarModule
      ],
      providers: [
        FileHandlerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function testIfControlElementIsExists (formElementConstructor, formControlSelector, constructorOptions?) {
    component.input = new formElementConstructor(constructorOptions || { key: 'test' });
    component.form = new FormGroup({ test: new FormControl() });
    fixture.detectChanges();

    const control = fixture.nativeElement.querySelector(formControlSelector);
    expect(control).toBeTruthy();
  }

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render input header to label text', () => {
    const expectedHeader = 'Test header';
    component.input = new TextareaInput({ key: 'test', header: expectedHeader });
    component.form = new FormGroup({ test: new FormControl() });
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('label');
    expect(label.textContent).toBe(expectedHeader);
  });

  it('should render textbox control when TextboxInput is passed', () => {
    testIfControlElementIsExists(TextboxInput, 'input');
  });

  it('should render textarea control when TextareaInput is passed', () => {
    testIfControlElementIsExists(TextareaInput, 'textarea');
  });

  it('should render file control when FileInput is passed', () => {
    testIfControlElementIsExists(FileInput, 'input[type="file"]', { key: 'test', type: 'file'});
  });

  it('should render select control when DropdownInput is passed', () => {
    testIfControlElementIsExists(DropdownInput, 'select');
  });

  it('should render checkbox input control when CheckboxInput is passed', () => {
    testIfControlElementIsExists(CheckBoxInput, 'input[type="checkbox"]');
  });

  it('should render radio input control when RadioInput is passed', () => {
    testIfControlElementIsExists(RadioInput, 'input[type="radio"]', { key: 'test', options: [{ key: 'test', value: 'test'}] });
  });

  it('should render not hidden inputs', () => {
    component.input = new TextareaInput({ key: 'test', hidden: false });
    component.form = new FormGroup({ test: new FormControl() });
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.dynamic-form-input');

    expect(input).not.toBeNull();
  });

  it('should not render hidden inputs', () => {
    component.input = new TextareaInput({ key: 'test', hidden: true });
    component.form = new FormGroup({ test: new FormControl() });
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('.dynamic-form-input');

    expect(input).toBeNull();
  });
});
