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

  terid: string = '0098000227'

  canal: string = '1,2,3,4'
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
      this.horas = 0
      let diff = 0
      const result = videos.data.map((item) => {
        const fecha1 = moment(item.starttime, "YYYY-MM-DD HH:mm:ss");
        const fecha2 = moment(item.endtime, "YYYY-MM-DD HH:mm:ss")
        diff = fecha2.diff(fecha1, 'minutes'); 
        this.horas += diff

        return {
          item,
          minutos: diff
        }
      })
      console.log(videos)
      this.videosInformacion = videos
      this.horas = this.horas / 60
      
    })
  }

}