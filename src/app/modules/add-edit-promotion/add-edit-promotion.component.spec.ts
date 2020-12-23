import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditPromotionComponent } from './add-edit-promotion.component';

describe('AddEditPromotionComponent', () => {
  let component: AddEditPromotionComponent;
  let fixture: ComponentFixture<AddEditPromotionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEditPromotionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditPromotionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
