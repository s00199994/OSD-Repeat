import { Component, Input } from '@angular/core';
import { Gun } from '../interfaces/gun';
import { Subject } from 'rxjs';
import { StorageService } from 'src/services/storage.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-gun-card',
  templateUrl: './gun-card.component.html',
  styleUrls: ['./gun-card.component.css']
})
export class GunCardComponent {

  @Input() gun!: Gun;

  editForm: boolean = false;

  constructor(private storageService: StorageService, private router: Router) { }

  deleteGun(gun: Gun) {
    this.storageService.deleteFirearm(this.gun).subscribe(
      (response) => {
        console.log('Successfully deleted', response)
        window.location.reload();
      },
      (error) => {
        console.error('Failed to delete', error);
      }
    )
  }

  editGun() {
    this.editForm = !this.editForm;
  }

  updateGun(gun: Gun) {
    const data = {
      id: gun.id,
      logNumber: gun.logNumber,
      owner: gun.owner,
      make: gun.make,
      model: gun.model,
      type: gun.type,
      serialNumber: gun.serialNumber
    }

    this.storageService.editFirearm(data).subscribe(response => {
      console.log('Successfully updated', response);
      window.location.reload();
    });
  }
}
