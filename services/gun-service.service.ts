import { Injectable } from '@angular/core';
import { Gun } from 'interfaces/gun';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class GunServiceService {
  gunsRef: AngularFireList<any>;
  gunRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {
    
   }

   addGun(gun: Gun) {
    this.gunsRef.push({
      ownerName: gun.ownerName,
      make: gun.make,
      type: gun.type,
      address: gun.address,
      emailAddress: gun.emailAddress,
      phoneNumber: gun.phoneNumber,
      logNumber: gun.logNumber,
      serialNumber: gun.serialNumber,
      dayStored: gun.dayStored
    })
   }

   getGunById(id: string) {
    this.gunRef = this.db.object('gun-list/' + id);
    return this.gunRef;
   }

   getGuns() {
    this.gunsRef = this.db.list('guns-list');
    return this.gunsRef;
   }

   updateGun(gun: Gun) {
    this.gunRef.update({
      ownerName: gun.ownerName,
      make: gun.make,
      type: gun.type,
      address: gun.address,
      emailAddress: gun.emailAddress,
      phoneNumber: gun.phoneNumber,
      logNumber: gun.logNumber,
      serialNumber: gun.serialNumber,
      dayStored: gun.dayStored
    })
   }

   deleteGun(id: string) {
    this.gunRef = this.db.object('gun-list/' + id);
    this.gunRef.remove();
   }
}
