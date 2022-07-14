import { Component } from '@angular/core';
import { VideoInformation } from '../../interfaces/historyVideoFileInformation';
import { CrudService } from '../../services/crud.service';
import * as moment from 'moment';
import { FormData } from '../../interfaces/form.interfaces';

@Component({
  selector: 'app-get-video-file',
  templateUrl: './get-video-file.component.html',
  styles: []
})


export class GetVideoFileComponent {

  loading: boolean = false;
  horas: number = 0
  horasPorCanal: any = {}

  canales: string[] = ['todos', '1', '2', '3', '4']

  fechaAuto = moment(new Date)

  formDispositivos: FormData = {
    terid: '',
    canal: '',
    fechaInicio: this.fechaAuto.format('YYYY-MM-DD HH:mm:ss'),
    fechaFin: this.fechaAuto.format('YYYY-MM-DD HH:mm:ss'),
  }

  videosInformacion: VideoInformation = {
    data:[],
    errorcode: 0
  } 

  constructor(private crudService: CrudService) { }

  verVideoInformacion(){
    this.loading = true
    this.crudService.GetHistoryVideoFileInformation(this.formDispositivos)
    .subscribe((videos) => {
      this.loading = false;
      this.videosInformacion = videos
      this.horas = this.crudService.getHorasTotal
      this.horasPorCanal = this.crudService.getHorasPorCanal
      this.canales = this.crudService.getCanales
      this.canales.push('todos')
    })
  }

}
