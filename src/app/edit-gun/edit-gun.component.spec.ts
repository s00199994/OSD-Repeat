import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGunComponent } from './edit-gun.component';

describe('EditGunComponent', () => {
  let component: EditGunComponent;
  let fixture: ComponentFixture<EditGunComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditGunComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditGunComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
