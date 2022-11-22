import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../services/data.service';
import { City, Projec } from '../interfaces/interfaces';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit, OnDestroy {

  faMinusSquare = faMinusSquare;
  faPlus = faPlus;

  cities: City[] = [];
  filterPost: any;
  ciudadesAr: any[] = [];
  modificar: boolean = false;
  idProd: string;

  subcripcion: Subscription = null;

  miFormulario: any;

  constructor(private fb: FormBuilder,
              private dataService: DataService,
              private router:Router) {
    this.getCities();
  }

  ngOnDestroy(): void {
    this.dataService.sendProject(null);
    this.subcripcion.unsubscribe();
  }


  ngOnInit(): void {

    this.miFormulario = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.required])
    })

    this.subcripcion = this.dataService.getProject
      .subscribe((dataPro) => {
        if (dataPro) {
          this.idProd = dataPro._id;
          this.modificar = true;
          this.miFormulario.get('nombre').setValue(dataPro.nombre);
          this.miFormulario.get('descripcion').setValue(dataPro.descripcion);
          this.obtenerCiudades(dataPro.cities)
          console.log(this.miFormulario)
        }
      })

  }


  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors
      && this.miFormulario.controls[campo].touched;
  }

  agregar() {
    const { nombre, descripcion } = this.miFormulario.value;
    const stringCities = this.ciudadesAr.toString();

    const projecto = {
      nombre,
      descripcion,
      cities: stringCities
    }

    if (this.miFormulario.value['nombre'] && this.miFormulario.value['descripcion']) {
      this.dataService.postProject(projecto)
        .subscribe(resp => console.log(resp))
      return
    }
    console.log('campos vacios')
  }



  getCities() {
    this.dataService.getCities()
      .subscribe(cities => {
        this.cities = cities;
      })
  }


  ciudadSeleccion() {
    if (this.filterPost) {
      this.ciudadesAr.push(this.filterPost)
    }
  }

  dataInput(item: any) {
    this.filterPost = item.ciudad
    if (this.filterPost) {
      this.ciudadesAr.push(item.ciudad)
    }
    setTimeout(() => {
      this.filterPost = ''
    }, 10)
  }

  obtenerCiudades(ciudades) {
     if(ciudades){
       const ciudadesAr = ciudades.split(',');
       for (let i of ciudadesAr) {
         this.ciudadesAr.push(i);
       }
       console.log(this.cities)
     }
  }

  eliminarSeleccion(item: string) {
    let i = this.ciudadesAr.indexOf(item)
    this.ciudadesAr.splice(i, 1);
  }

  //TODO: Actualizar datos
  modificarOb() {
    const { nombre, descripcion } = this.miFormulario.value;
    const stringCities = this.ciudadesAr.toString();


    const projecto = {
      nombre,
      descripcion,
      cities: stringCities
    }
    console.log(this.idProd,projecto)

    this.dataService.putProject(this.idProd, projecto)
      .subscribe(resp => console.log(resp));

      this.router.navigate(['board/projects'])
  }
}
