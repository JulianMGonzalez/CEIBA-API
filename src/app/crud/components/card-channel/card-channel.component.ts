import { Component, Input } from '@angular/core';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-card-channel',
  templateUrl: './card-channel.component.html',
  styleUrls: []
})
export class CardChannelComponent {

  @Input() horasPorCanal = {}

  objectKeys(obj: any) {
    return Object.keys(obj);
}

  constructor() { }

}
