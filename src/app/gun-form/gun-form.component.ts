import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Gun } from '../interfaces/gun';
import { StorageService } from 'src/services/storage.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-gun-form',
  templateUrl: './gun-form.component.html',
  styleUrls: ['./gun-form.component.css']
})
export class GunFormComponent {

  @Input() showForm: boolean = false;
  @Output() formClose = new EventEmitter<boolean>();
  
  gun: Gun = {id: '', logNumber: 0, owner: '', make: '', model: '', type: '', serialNumber: ''};

  constructor(private storageService: StorageService) {}

  closeForm() {
    this.showForm = !this.showForm;

    this.formClose.emit(this.showForm);
  }

  addFirearm() {
    const data = {
      id: uuidv4(),
      logNumber: this.gun.logNumber,
      owner: this.gun.owner,
      make: this.gun.make,
      model: this.gun.model,
      type: this.gun.type,
      serialNumber: this.gun.serialNumber
    }

    this.storageService.addFirearm(data).subscribe(response => {
      console.log(response)
      window.location.reload();
    })
  }

}
