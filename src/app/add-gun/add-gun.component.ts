import { Component, OnInit } from '@angular/core';
import { GunServiceService } from 'services/gun-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-gun',
  templateUrl: './add-gun.component.html',
  styleUrls: ['./add-gun.component.css']
})
export class AddGunComponent implements OnInit {
  public gunForm: FormGroup;

  constructor(
    public gunService: GunServiceService,
    public fb: FormBuilder,
    public toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.gunService.getGuns();
    this.initGunForm();
  }

  initGunForm() {
    this.gunForm = this.fb.group({
      ownerName: ['', [Validators.required, Validators.minLength(2)]],
      emailAddress: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      phoneNumber: ['', [Validators.required]],
      address: ['', [Validators.required]],
      make: [''],
      type: [''],
      serialNumber: [''],
      logNumber: [''],
      dayStored: ['']
    })
  }

  get ownerName() {
    return this.gunForm.get('ownerName');
  }
  get emailAddress() {
    return this.gunForm.get('emailAddress');
  }
  get phoneNumber() {
    return this.gunForm.get('phoneNumber');
  }
  get address() {
    return this.gunForm.get('address');
  }
  get make() {
    return this.gunForm.get('make');
  }
  get type() {
    return this.gunForm.get('type');
  }
  get serialNumber() {
    return this.gunForm.get('serialNumber');
  }
  get logNumber() {
    return this.gunForm.get('logNumber');
  }
  get daysStored() {
    return this.gunForm.get('daysStored')
  }

  resetForm() {
    this.gunForm.reset();
  }

  submitGunData() {
    this.gunService.addGun(this.gunForm.value);
    this.toastr.success(
      this.gunForm.controls['ownerName'].value + ' successfully added!'
    );
    this.resetForm();
  }

}
