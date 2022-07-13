import { Component } from '@angular/core';
import { GetVideo } from '../../interfaces/historyVideoMonthly.interface';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-get-historial-video',
  templateUrl: './get-historial-video.component.html',
})
export class GetHistorialVideoComponent {

  videos : GetVideo = {
    data:[],
    errorcode: 0
  }

  constructor(private crudService: CrudService) { }

  verInformacionMensual(){
    this.crudService.GetHistoryVideoMonthlyCalendarInformation()
    .subscribe(videos => {
      this.videos = videos
    })
  }

}
