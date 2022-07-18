import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormData, FormDataMonthly } from '../interfaces/form.interfaces';
import { VideoInformation } from '../interfaces/historyVideoFileInformation';
import { GetVideo } from '../interfaces/historyVideoMonthly.interface';
import { Data } from '../interfaces/BDhistoryVideoFileInformation';

import * as moment from 'moment';
import { map } from 'rxjs';
import { VideoHistorical } from '../interfaces/historicalVideo';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private _apiUrl: string = 'http://67.231.248.74:12056/api/v1'
  private _BDUrl: string = 'http://localhost:3000'
  private _apiKey: string = localStorage.getItem('apiKey') || 'zT908g2j9nhN588DYZDrFmmN3P7FllzEyQyWdGv35YGVaFbYwCpg9g%3D%3D'

  private _horas: number = 0
  private _horasPorCanal: any = {}
  private _canales: string[] = []

  public resultadosVideos: any = null

  constructor(private http: HttpClient) { }

  get getHorasTotal() {
    return this._horas
  }

  get getHorasPorCanal() {
    return this._horasPorCanal
  }

  get getCanales() {
    return this._canales
  }

  // terid:string, st:string, starttime:Date
  GetHistoryVideoMonthlyCalendarInformation(data: FormDataMonthly) {
    const url = `${this._apiUrl}/basic/record/calendar`

    const { terid, fechaInicio } = data

    const fechaInicioTemp = moment(new Date(fechaInicio)).format("YYYY-MM-DD");

    const params = new HttpParams()
      .set('key', this._apiKey)
      .set('terid', terid)
      .set('starttime', fechaInicioTemp)
      .set('st', '1');

    return this.http.get<GetVideo>(url, { params });
  }

  GetHistoryVideoFileInformation(data: FormData) {
    const url = `${this._apiUrl}/basic/record/filelist`

    const { fechaInicio, fechaFin, terid } = data

    const fechaInicioTemp = moment(new Date(fechaInicio)).format("YYYY-MM-DD HH:mm:ss");
    const fechaFinTemp = moment(new Date(fechaFin)).format("YYYY-MM-DD HH:mm:ss");

    if (data.canal === 'todos') {
      data.canal = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16'
    }

    /* 00980000FF | '1,2,3,4'*/
    const params = new HttpParams()
      .set('key', this._apiKey)
      .set('terid', terid)
      .set('starttime', fechaInicioTemp)
      .set('endtime', fechaFinTemp)
      .set('chl', data.canal)
      .set('ft', '0')
      .set('st', '1');

    return this.http.get<VideoInformation>(url, { params })
      .pipe(
        map(videos => {
          const { errorcode, data } = videos
          this._horasPorCanal = {}
          this._canales = []
          const result = data.map((item, i) => {
            const fecha1 = moment(item.starttime, "YYYY-MM-DD HH:mm:ss");
            const fecha2 = moment(item.endtime, "YYYY-MM-DD HH:mm:ss")
            let diff = fecha2.diff(fecha1, 'minutes');
            this._horas += diff

            if (!this._horasPorCanal.hasOwnProperty(item.chn)) {
              this._horasPorCanal[item.chn] = 0
              this._canales.push(item.chn.toString())
            }
            for (let i in this._horasPorCanal) {
              if (item.chn == parseInt(i)) {
                this._horasPorCanal[item.chn] += diff
              } else {
                this._horasPorCanal[item.chn] += 0
              }
            }
            this.SendDataToBD({...item, minutos: diff, terid: terid})
            .subscribe(data => { console.log("data", data); }, err => { console.log("error", err) })
            return {
              ...item,
              minutos: diff,
              terid
            }
          })
          
          for (const key in this._horasPorCanal) {
            if (Object.prototype.hasOwnProperty.call(this._horasPorCanal, key)) {
              const element = this._horasPorCanal[key];
              this._horasPorCanal[key] = element / 60
            }
          }
          this._horas = this._horas / 60
          return { data: result, errorcode }
        })
      )
  }

  SendDataToBD(data: any) {
    const url = `${this._BDUrl}/recording`
    console.log("url", url);
    console.log("data a enviar", data);
    return this.http.post<any>(url, data)

  }
  GetHistoricalVideoStreamInformation(data: FormData) {
    const url = `${this._apiUrl}/basic/record/video`

    const { terid, fechaInicio, fechaFin, canal } = data

    const fechaInicioTemp = moment(new Date(fechaInicio)).format("YYYY-MM-DD HH:mm:ss");
    const fechaFinTemp = moment(new Date(fechaFin)).format("YYYY-MM-DD HH:mm:ss");

    const params = new HttpParams()
      .set('key', this._apiKey)
      .set('terid', terid)
      .set('starttime', fechaInicioTemp)
      .set('endtime', fechaFinTemp)
      .set('chl', canal);

    return this.http.get<VideoHistorical>(url, { params });
  }
}