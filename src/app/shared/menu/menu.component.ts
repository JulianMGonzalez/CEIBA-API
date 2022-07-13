import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  items !: MenuItem[];

    ngOnInit() {
        this.items = [
            {
                label: 'información sobre el calendario mensual del vídeo',
                routerLink: '/',
                routerLinkActiveOptions: { exact: true }
            },
            {
                label: 'información sobre el archivo de vídeo',
                routerLink: 'video-file-information'
            },
            {
                label: 'información histórica del flujo de vídeo',
                routerLink: 'video-historical'
            }
        ];
    }
}