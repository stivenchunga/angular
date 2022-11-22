import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { BoardRoutingModule } from './board-routing.module';
import { PageProjectsComponent } from './page-projects/page-projects.component';
import { BoardComponent } from './board.component';
import { FormularioComponent } from './formulario/formulario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
    PageProjectsComponent,
    BoardComponent,
    FormularioComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    BoardRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class BoardModule { }
