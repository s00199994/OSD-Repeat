import { Component, Input } from '@angular/core';
import { Gun } from '../interfaces/gun';
import { Subject } from 'rxjs';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-gun-card',
  templateUrl: './gun-card.component.html',
  styleUrls: ['./gun-card.component.css']
})
export class GunCardComponent {

  @Input() gun!: Gun;

  refreshEvent = new Subject<void>();

  constructor(private storageService: StorageService) { }

}
