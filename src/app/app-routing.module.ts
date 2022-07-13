import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GetHistorialVideoComponent } from './crud/pages/get-historial-video/get-historial-video.component';
import { GetVideoFileComponent } from './crud/pages/get-video-file/get-video-file.component';
import { GetVideoMonthlyComponent } from './crud/pages/get-video-monthly/get-video-monthly.component';

const routes: Routes = [
  {
    path: '',
    component: GetVideoMonthlyComponent ,
    pathMatch: 'full'
  },
  {
    path: 'video-file-information',
    component: GetVideoFileComponent,
  },
  {
    path: 'video-historical',
    component: GetHistorialVideoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
