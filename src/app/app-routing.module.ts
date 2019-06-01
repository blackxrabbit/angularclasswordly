import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddpostComponent } from './addpost/addpost.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'addpost', component: AddpostComponent},
  {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
