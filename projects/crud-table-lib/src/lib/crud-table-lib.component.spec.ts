import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudTableLibComponent } from './crud-table-lib.component';
import { GeneralRestService } from './general-rest.service';
import { InputService } from './dynamic-form/input.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationService } from 'primeng/api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { ClickStopPropagationDirective } from './click-stop-propagation.directive';
import { ModalImgComponent } from './modal-img/modal-img.component';
import { Permissions, FormField } from './decorator';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/* Default data and mock classes */

@Permissions({
  read:   '*',
  update: [ 'admin', 'manager' ]
})
class Product {

  constructor (id?: number, productName?: string) {
    this.id = id || 0;
    this.productName = productName || '';
  }

  @FormField({
      className: 'TextboxInput',
      header: 'Id',
      required: true,
      type: 'number',
      order: 1,
      hidden: true
  })
  id: number;

  @FormField({
      className: 'TextboxInput',
      header: 'Product Name',
      required: true,
      type: 'string',
      order: 2
  })
  productName: string;
}

const DEFAULT_PERMISSIONS: any[] = [ 'admin', 'manager', 'viewer' ];
const DEFAULT_PRODUCT_STORE = [
  new Product(1, 'rail'),
  new Product(2, 'tension bushing'),
  new Product(3, 'tension spring'),
  new Product(4, 'button cap'),
  new Product(5, 'tennon'),
  new Product(6, 'dowel'),
  new Product(7, 'stile')
];
const DEFAULT_ENTITY_NAME = 'product';
const DEFAULT_ITEMS_PER_PAGE = 5;
const DEFAULT_FILTER = '';

class GeneralRestServiceMock {

  public objectName = 'products';

  store: Product[] = DEFAULT_PRODUCT_STORE;

  getAll (filter) {
    return Promise.resolve(this.store);
  }

  async getAllSync (objectName) {
    return await Promise.resolve(this.store);
  }

  save (obj) {
    this.store.push(obj);
    return Promise.resolve({ success: true });
  }

  update (obj) {
    for (let item of this.store) {
      if (item.id === obj.id) {
        item = obj;
        return Promise.resolve({ success: true });
      }
    }
  }

  delete (obj) {
    return Promise.resolve({ success: true });
  }
}

/* Unit tests */

describe('CrudTableLibComponent', () => {
  let component: CrudTableLibComponent;
  let fixture: ComponentFixture<CrudTableLibComponent>;
  let generalRestService: GeneralRestService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CrudTableLibComponent,
        ModalImgComponent,
        ModalFormComponent,
        ClickStopPropagationDirective
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        DynamicFormModule,
        ConfirmDialogModule,
        HttpClientTestingModule
      ],
      providers: [
        GeneralRestService,
        InputService,
        NgbModal,
        ConfirmationService
      ]
    })
    .overrideComponent(CrudTableLibComponent, {
      set: {
        providers: [
          {
            provide: GeneralRestService,
            useClass: GeneralRestServiceMock
          },
          InputService,
          NgbModal,
          ConfirmationService
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(CrudTableLibComponent);
    component = fixture.componentInstance;

    component.permissions = DEFAULT_PERMISSIONS;
    component.entityName = DEFAULT_ENTITY_NAME;
    component.entity = new Product;
    component.itemsPerPage = DEFAULT_ITEMS_PER_PAGE;
    component.filter = DEFAULT_FILTER;
    component.ngOnInit();

    generalRestService = TestBed.get(GeneralRestService);
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should render search field', () => {
    const searchField = fixture.nativeElement.querySelector('input[type="search"]');
    expect(searchField).toBeTruthy();
  });

  it('should set searchFilter property to search field\'s value', () => {
    const expectedValue = 'some search text';
    const searchField = fixture.nativeElement.querySelector('input[type="search"]');

    searchField.value = expectedValue;
    searchField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchFilter).toBe(expectedValue);
  });

  it('should filter results properly based on filter value', (done) => {
    const searchField = fixture.nativeElement.querySelector('input[type="search"]');
    const searchValue = 'tension';

    searchField.value = searchValue;
    searchField.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const columns = fixture.nativeElement.querySelectorAll('.crud-table-col-content');
      expect(columns.length).toBe(2);

      const searchRegExp = new RegExp(searchValue);
      columns.forEach(col => expect(searchRegExp.test(col.innerText)).toBe(true));

      done();
    });
  });

  it('should render one table at a time', () => {
    expect(fixture.nativeElement.querySelectorAll('table').length).toBe(1);
  });

  it('should render not hidden cols of form elements to table', () => {
    const headers = fixture.nativeElement.querySelectorAll('th');

    // Id is hidden, productName is visible
    headers.forEach(header => {
      expect(header.innerText).not.toBe('Id');
    });

    expect(headers[0].innerText).toBe('Product Name');
  });

  it('should set currentEntities count correctly', () => {
    const count = component.currentEntities;
    expect(count).toBe(7);
  });

  it('should set firstEntity and lastEntity counts correctly', () => {
    expect(component.firstEntity).toBe(0);
    expect(component.lastEntity).toBe(DEFAULT_ITEMS_PER_PAGE);
  });

  it('should display the given entities in table', () => {
    const productNamesColumns = Array.from(fixture.nativeElement.querySelectorAll('.crud-table-col-content'));
    const productNamesRendered = productNamesColumns.map(col => col['innerText']);
    const expectedProductNames = DEFAULT_PRODUCT_STORE
                                    .map(product => product.productName)
                                    .slice(0, DEFAULT_ITEMS_PER_PAGE);

    expect(productNamesRendered).toEqual(expectedProductNames);
  });

  it('should open modal on click to Edit button on table row', (done) => {
    spyOn(NgbModal.prototype, 'open');
    const editBtn = fixture.nativeElement.querySelector('.crud-table-row-edit-btn');
    editBtn.click();
    fixture.whenStable().then(() => {
      expect(NgbModal.prototype.open).toHaveBeenCalled();
      done();
    });
  });

  it('should open confirm dialog on click to Delete button on table row', (done) => {
    spyOn(ConfirmationService.prototype, 'confirm');
    const deleteBtn = fixture.nativeElement.querySelector('.crud-table-row-delete-btn');
    deleteBtn.click();
    fixture.whenStable().then(() => {
      expect(ConfirmationService.prototype.confirm).toHaveBeenCalled();
      done();
    });
  });

  it('should set filter to empty when Show All button is clicked', (done) => {
    component.filter = 'some filter';
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('#crud-table-show-all-btn');
    btn.click();

    fixture.whenStable()
      .then(() => {
        expect(component.filter).toBe('');
        done();
      });
  });

  it('should disable Add button when the user is not own the appropriate permission', () => {
    const permissions = [ 'viewer' ];
    component.permissions = permissions;
    fixture.detectChanges();

    const btn = fixture.nativeElement.querySelector('#crud-table-add-btn');
    expect(btn.attributes['disabled']).toBeTruthy();
  });

  it('should disable Edit buttons when the user is not own the appropriate permission', () => {
    const permissions = [ 'viewer' ];
    component.permissions = permissions;
    fixture.detectChanges();

    const btns = fixture.nativeElement.querySelectorAll('.crud-table-row-edit-btn');
    btns.forEach(btn => expect(btn.attributes['disabled']).toBeTruthy());
  });

  it('should disable Delete buttons when the user is not own the appropriate permission', () => {
    const permissions = [ 'viewer' ];
    component.permissions = permissions;
    fixture.detectChanges();

    const btns = fixture.nativeElement.querySelectorAll('.crud-table-row-delete-btn');
    btns.forEach(btn => expect(btn.attributes['disabled']).toBeTruthy());
  });
});
