import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGunComponent } from './add-gun/add-gun.component';
import { EditGunComponent } from './edit-gun/edit-gun.component';
import { GunListComponent } from './gun-list/gun-list.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: GunListComponent },
  { path: 'add-gun', component: AddGunComponent },
  { path: 'edit-gun/:id', component: EditGunComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
