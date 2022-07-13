import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { GetHistorialVideoComponent } from './pages/get-historial-video/get-historial-video.component';
import { GetVideoFileComponent } from './pages/get-video-file/get-video-file.component';
import { GetVideoMonthlyComponent } from './pages/get-video-monthly/get-video-monthly.component';
import { TableComponent } from './components/table/table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GetHistorialVideoComponent,
    GetVideoFileComponent,
    GetVideoMonthlyComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule
  ],
  exports: [
    GetHistorialVideoComponent,
    GetVideoFileComponent,
    GetVideoMonthlyComponent
  ]
})
export class CrudModule { }
