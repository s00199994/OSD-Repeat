import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GunServiceService } from 'services/gun-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-gun',
  templateUrl: './edit-gun.component.html',
  styleUrls: ['./edit-gun.component.css']
})
export class EditGunComponent implements OnInit {
  editForm: FormGroup;

  constructor(
    private gunService: GunServiceService,
    private fb: FormBuilder,
    private location: Location,
    private actRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.updateGunData();
    const id: any = this.actRoute.snapshot.paramMap.get('id');
    this.gunService
      .getGunById(id)
      .valueChanges()
      .subscribe((data) => {
        this.editForm.setValue(data);
      });
  }

  updateGunData() {
    this.editForm = this.fb.group({
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
    return this.editForm.get('ownerName');
  }
  get emailAddress() {
    return this.editForm.get('emailAddress');
  }
  get phoneNumber() {
    return this.editForm.get('phoneNumber');
  }
  get address() {
    return this.editForm.get('address');
  }
  get make() {
    return this.editForm.get('make');
  }
  get type() {
    return this.editForm.get('type');
  }
  get serialNumber() {
    return this.editForm.get('serialNumber');
  }
  get logNumber() {
    return this.editForm.get('logNumber');
  }
  get daysStored() {
    return this.editForm.get('daysStored')
  }

  goBack() {
    this.location.back();
  }

  updateForm() {
    this.gunService.updateGun(this.editForm.value);
    this.toastr.success(
      this.editForm.controls['ownerName'].value + ' updated sucessfully'
    );
    this.router.navigate(['view-guns'])
  }
}
