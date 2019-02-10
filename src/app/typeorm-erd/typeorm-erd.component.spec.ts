import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeormERDComponent } from './typeorm-erd.component';

describe('TypeormERDComponent', () => {
  let component: TypeormERDComponent;
  let fixture: ComponentFixture<TypeormERDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeormERDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeormERDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
