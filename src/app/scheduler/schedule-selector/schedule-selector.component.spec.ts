import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSelectorComponent } from './schedule-selector.component';
import { CrudTableLibModule } from 'projects/crud-table-lib/src/public_api';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

describe('ScheduleSelectorComponent', () => {
  let component: ScheduleSelectorComponent;
  let fixture: ComponentFixture<ScheduleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleSelectorComponent ],
      imports: [
        CrudTableLibModule,
        HttpClientTestingModule,
        ConfirmDialogModule
      ],
      providers: [
        AuthenticationService,
        ConfirmationService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
