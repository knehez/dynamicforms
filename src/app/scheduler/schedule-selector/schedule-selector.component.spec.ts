import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ScheduleSelectorComponent } from './schedule-selector.component';
import { CrudTableLibModule } from 'ngx-crud-forms';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

describe('ScheduleSelectorComponent', () => {
  let component: ScheduleSelectorComponent;
  let fixture: ComponentFixture<ScheduleSelectorComponent>;

  beforeEach(waitForAsync(() => {
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
