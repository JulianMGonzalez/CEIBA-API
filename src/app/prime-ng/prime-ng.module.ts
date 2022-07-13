import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';


@NgModule({
  exports: [
    ButtonModule,
    CardModule,
    MenubarModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    CalendarModule
  ],
})
export class PrimeNgModule { }
