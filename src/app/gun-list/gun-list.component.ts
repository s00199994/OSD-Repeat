import { Component, OnInit } from '@angular/core';
import { Gun } from 'interfaces/gun';
import { GunServiceService } from 'services/gun-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gun-list',
  templateUrl: './gun-list.component.html',
  styleUrls: ['./gun-list.component.css']
})
export class GunListComponent implements OnInit {
  p: number = 1;
  Guns: Gun[];
  hideWhenNoGun: boolean = false;
  noData: boolean = false;

  constructor(
    private gunService: GunServiceService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.dataState();
    let s = this.gunService.getGuns();
    s.snapshotChanges().subscribe(data => {
      this.Guns = [];
      data.forEach(item => {
        let a: any = item.payload.toJSON();
        a['$key'] = item.key;
        this.Guns.push(a as Gun);
      })
    })
  }

  dataState() {
    this.gunService.getGuns().valueChanges().subscribe(data => {
      if (data.length <= 0){
        this.hideWhenNoGun = false;
        this.noData = false;
      } else {
        this.hideWhenNoGun = true;
        this.noData = true;
      }
    })
  }

  deleteGun(gun: any) {
    if (window.confirm('Are you sure you want to delete this?')) {
      this.gunService.deleteGun(gun.$key)
      this.toastr.success(gun.logNumber + ' successfully deleted!')
    }
  }

}
