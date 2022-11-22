import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board.component';
import { PageProjectsComponent } from './page-projects/page-projects.component';
import { FormularioComponent } from './formulario/formulario.component';

const routes: Routes = [
  {
    path:'board',
    component:BoardComponent,
    children:[
      {
        path:'add',
        component:FormularioComponent
      },
      {
        path:'projects',
        component:PageProjectsComponent
      },
      {
        path:'**',
        redirectTo:'projects'
      }
    ]
  },
  {
    path:'**',
    redirectTo:'board'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoardRoutingModule { }
