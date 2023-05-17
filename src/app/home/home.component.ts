import { Component } from '@angular/core';
import { Gun } from '../interfaces/gun';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  showForm: boolean = false;

  guns: Gun[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.storageService.getLocker().subscribe((gunsInStore) => {
      this.guns = gunsInStore;
    });
  }
}
