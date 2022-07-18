import { Component } from '@angular/core';
import { FormData } from '../../interfaces/form.interfaces';
import { VideoHistorical } from '../../interfaces/historicalVideo';
import { GetVideo } from '../../interfaces/historyVideoMonthly.interface';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-get-historial-video',
  templateUrl: './get-historial-video.component.html',
})
export class GetHistorialVideoComponent {

  videoUrl: string = ''

  canales: string[] = ['todos']

  fechaAuto = new Date()

  formDispositivos: FormData = {
    terid: '',
    canal: '',
    fechaInicio: this.fechaAuto.toDateString(),
    fechaFin: this.fechaAuto.toDateString(),
  }

  constructor(private crudService: CrudService) { }

  verVideoInformacion() {
    this.crudService.GetHistoricalVideoStreamInformation(this.formDispositivos)
      .subscribe(({data:{url}}) => {
        this.videoUrl = url 
      })
  }

}
