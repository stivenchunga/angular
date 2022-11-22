export interface Projec {
  nombre:      string;
  descripcion: string;
  city_id?:     string;
  _id?:         string;
}

export interface City {
  _id?:          string;
  ciudad:       string;
  departamento: string;
  pais:         string;
  __v?:          number;
}
