import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormData } from '../interfaces/form.interfaces';
import { VideoInformation } from '../interfaces/historyVideoFileInformation';
import { GetVideo } from '../interfaces/historyVideoMonthly.interface';

import * as moment from 'moment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _apiUrl: string = 'http://67.231.248.74:12056/api/v1'
  private _apiKey: string = localStorage.getItem('apiKey') || 'zT908g2j9nhN588DYZDrFmmN3P7FllzEyQyWdGv35YGVaFbYwCpg9g%3D%3D'

  private _horas: number = 0
  private _horasPorCanal: any = {}

  public resultadosVideos: any = null

  constructor(private http: HttpClient) { }

  get getHorasTotal() {
    return this._horas
  }

  get getHorasPorCanal() {
    return this._horasPorCanal
  }

  // terid:string, st:string, starttime:Date
  GetHistoryVideoMonthlyCalendarInformation() {
    // const url = `${this._apiUrl}/basic/record/calendar/?key=${this._apiKey}&terid=${terid}&starttime=${starttime}&st=${st}`
    const url = `${this._apiUrl}/basic/record/calendar`

    const params = new HttpParams()
      .set('key', this._apiKey)
      .set('terid', '0098000227')
      .set('starttime', '2022-07-010')
      .set('st', '1,2,3,4');

    return this.http.get<GetVideo>(url, { params });
  }

  GetHistoryVideoFileInformation(data: FormData) {
    const url = `${this._apiUrl}/basic/record/filelist`

    const { fechaInicio, fechaFin } = data

    const fechaInicioTemp = moment(new Date(fechaInicio)).format("YYYY-MM-DD HH:mm:ss");
    const fechaFinTemp = moment(new Date(fechaFin)).format("YYYY-MM-DD HH:mm:ss");

    if (data.canal === 'todos') {
      data.canal = '1,2,3,4,5,6,7,8,9'
    }

    /* 00980000FF | '1,2,3,4'*/
    const params = new HttpParams()
      .set('key', this._apiKey)
      .set('terid', data.terid)
      .set('starttime', fechaInicioTemp)
      .set('endtime', fechaFinTemp)
      .set('chl', data.canal)
      .set('ft', '0')
      .set('st', '1');

    return this.http.get<VideoInformation>(url, { params })
      .pipe(
        map(videos => {
          const { errorcode, data } = videos
          const result = data.map((item, i) => {
            const fecha1 = moment(item.starttime, "YYYY-MM-DD HH:mm:ss");
            const fecha2 = moment(item.endtime, "YYYY-MM-DD HH:mm:ss")
            let diff = fecha2.diff(fecha1, 'minutes');
            this._horas += diff


            if (!this._horasPorCanal.hasOwnProperty(item.chn)) {
              this._horasPorCanal[item.chn] = 0
            }
            for(let i in this._horasPorCanal) {
              console.log(item.chn, i)
              if(item.chn == parseInt(i)){
                this._horasPorCanal[item.chn] += diff
              }else{
                this._horasPorCanal[item.chn] += 0
              }
            }
            return {
              ...item,
              minutos: diff
            }
          })
          for (const key in this._horasPorCanal) {
            if (Object.prototype.hasOwnProperty.call(this._horasPorCanal, key)) {
              const element = this._horasPorCanal[key];
              this._horasPorCanal[key] = element / 60
            }
          }
          console.log(this._horasPorCanal)
          this._horas = this._horas / 60
          return { data: result, errorcode }
        })
      )
  }

}
