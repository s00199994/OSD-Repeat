import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GunFormComponent } from './gun-form.component';

describe('GunFormComponent', () => {
  let component: GunFormComponent;
  let fixture: ComponentFixture<GunFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GunFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GunFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
