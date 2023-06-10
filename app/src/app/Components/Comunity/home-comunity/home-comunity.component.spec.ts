import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComunityComponent } from './home-comunity.component';

describe('HomeComunityComponent', () => {
  let component: HomeComunityComponent;
  let fixture: ComponentFixture<HomeComunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComunityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
