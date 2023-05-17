import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GunCardComponent } from './gun-card.component';

describe('GunCardComponent', () => {
  let component: GunCardComponent;
  let fixture: ComponentFixture<GunCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GunCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GunCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
