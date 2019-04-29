import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormInputComponent } from './dynamic-form-input.component';
import { FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CalendarModule } from 'primeng/calendar';
import { TextareaInput } from './form-elements/textArea';
import { TextboxInput } from './form-elements/textBox';
import { By } from '@angular/platform-browser';

describe('DynamicFormComponent', () => {
  let component: DynamicFormComponent;
  let fixture: ComponentFixture<DynamicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DynamicFormComponent,
        DynamicFormInputComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        CalendarModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render multiple inputs', () => {
    const textareaInput = new TextareaInput({ key: 'test1', value: 'test' });
    const textBoxInput = new TextboxInput({ key: 'test2', value: 'test' });

    component.inputs = [ textareaInput, textBoxInput ];
    component.ngOnInit();

    fixture.detectChanges();

    const textArea = fixture.nativeElement.querySelector('textarea');
    const textBox = fixture.nativeElement.querySelector('input');

    expect(textArea).toBeTruthy();
    expect(textBox).toBeTruthy();
  });

  it('should render inputs in the given order', () => {
    const textareaInput = new TextareaInput({ key: 'test1', value: 'test' });
    const textBoxInput = new TextboxInput({ key: 'test2', value: 'test' });

    component.inputs = [ textareaInput, textBoxInput ];
    component.ngOnInit();

    fixture.detectChanges();

    const inputs = fixture.debugElement.queryAll(By.css('.form-row'));
    expect(inputs[0].nativeElement.querySelector('textarea')).toBeTruthy();
    expect(inputs[1].nativeElement.querySelector('input')).toBeTruthy();
  });

});
