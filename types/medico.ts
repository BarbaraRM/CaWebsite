
export interface MedicoInterface {
  sufix?: string;
  nombre: string;
  apellido: string;
  especialidad: string;
  horario: {
    lun?: { start?: string; end?: string };
    mar?: { start?: string; end?: string };
    mier?: { start?: string; end?: string };
    jue?: { start?: string; end?: string };
    vier?: { start?: string; end?: string };
    sab?: { start?: string; end?: string };
    dom?: { start?: string; end?: string };
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    tiktok?: string;
    whatsapp?: string;
  };
  imagen: string;
}
