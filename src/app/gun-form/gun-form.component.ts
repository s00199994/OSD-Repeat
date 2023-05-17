import { Component } from '@angular/core';
import { Gun } from '../interfaces/gun';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-gun-form',
  templateUrl: './gun-form.component.html',
  styleUrls: ['./gun-form.component.css']
})
export class GunFormComponent {

  gun: Gun = {logNumber: 0, owner: '', make: '', model: '', type: '', serialNumber: ''};

  constructor(private storageService: StorageService) {}

  addFirearm() {
    const data = {
      logNumber: this.gun.logNumber,
      owner: this.gun.owner,
      make: this.gun.make,
      model: this.gun.model,
      type: this.gun.type,
      serialNumber: this.gun.serialNumber
    }
  }

}
