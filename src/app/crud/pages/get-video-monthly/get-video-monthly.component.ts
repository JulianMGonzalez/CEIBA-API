import { Component } from '@angular/core';
import { FormDataMonthly } from '../../interfaces/form.interfaces';
import { GetVideo } from '../../interfaces/historyVideoMonthly.interface';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-get-video-monthly',
  templateUrl: './get-video-monthly.component.html',
})
export class GetVideoMonthlyComponent {

  videos : GetVideo = {
    data:[],
    errorcode: 0
  }

  formDispositivos: FormDataMonthly = {
    terid: '',
    fechaInicio: '',
  }

  constructor(private crudService: CrudService) { }

  verInformacionMensual(){
    this.crudService.GetHistoryVideoMonthlyCalendarInformation(this.formDispositivos)
    .subscribe(videos => {
      this.videos = videos
    })
  }

}
