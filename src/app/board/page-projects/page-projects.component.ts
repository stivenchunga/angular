import { Component, OnInit } from '@angular/core';
import { Projec } from '../interfaces/interfaces';
import { DataService } from '../services/data.service';
import { faEject } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';


@Component({
  selector: 'app-page-projects',
  templateUrl: './page-projects.component.html',
  styleUrls: ['./page-projects.component.css']
})
export class PageProjectsComponent implements OnInit {

  faEject= faEject;

  projects:Projec[] = [];
  filterPost:any | Projec[] = [];


  constructor(private dataService: DataService,
              private router:Router) {
                this.getProjects();
               }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this.dataService.getProjects()
    .subscribe( projects => {
      this.projects = projects;

      //Obtener ciudad de el projecto
      const {city_id} = this.projects[0]

    })
  }

  getCity(id: string){
    this.dataService.getCity(id)
    .subscribe( city => console.log(city))
  }

  mostrarInfo(project:any){
    this.dataService.sendProject(project);
    this.router.navigateByUrl('/board/add');
  }

}
