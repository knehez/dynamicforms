import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTableLibComponent } from './crud-table-lib.component';

describe('CrudTableLibComponent', () => {
  let component: CrudTableLibComponent;
  let fixture: ComponentFixture<CrudTableLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudTableLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudTableLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
