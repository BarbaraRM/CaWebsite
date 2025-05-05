export interface UsuarioInterface {
  _id?: string;
  username?: string;
  servicio?: any[];
  firma?: string;
  sello?: string;
  istmppwd?: boolean;
  cedula?: string;
  email?: string;
  name: string;
  lastname: string;
  ambiente?: string;
  roles?: string[];
  sesion_name?: string;
  sesiones?: Sessions[];
  consultas?: any[];
  meds?: any[];
  pupo?: any[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Sessions {
  name: string;
  lastname: string;
  code?: string;
  sesion_name?: string;
  roles?: string[];
  meds?: any[];
}

export interface RecordedUserType {
  id: string;
  fecha: string;
  roles: string[];
  nombrecompleto: string;
  name: string;
  lastname: string;
}
