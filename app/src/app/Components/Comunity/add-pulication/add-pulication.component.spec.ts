import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPulicationComponent } from './add-pulication.component';

describe('AddPulicationComponent', () => {
  let component: AddPulicationComponent;
  let fixture: ComponentFixture<AddPulicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPulicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPulicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
