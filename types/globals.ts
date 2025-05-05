

interface BaseGeneric {
  _id: string;

  activo?: boolean;
  updatedAt?: string;
  createdAt?: string;
  creator?: any;
  issuer?: any;
  anulador?: any;
}

export interface GenericInterface extends BaseGeneric {
  codigo: string;
  nombre: string;
  descripcion?: string;
}

export interface ValueProps {
  codigo: string;
  nombre: string;
  printLabel?: string;
}
