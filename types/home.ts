export type HomeSectionType =
  | "hero"
  | "information"
  | "services"
  | "background"
  | "features"
  | "imageinfo"
  | "doctors"
  | "cta";

export interface HomeLayoutItem {
  id: string;
  type: HomeSectionType;
  props: any; // contenido de la sección
  visible?: boolean; // para permitir ocultarla
}

export interface HomeData {
  sections: HomeLayoutItem[];
}


export interface HomeData1 {
  hero: {
    slides: HeroSlideType[];
  };
  information: InformationSectionType;
  servicios: ServiciosSectiontype;
  maternidad: BackgroundSectionType;
  diagnosticos: FeatureSection;
  detalle_hosp: ImgDetailSection;
  detalle_ce: ImgDetailSection;

  doctors: BestDoctorsType;
  cta: {
    title?: string;
    description?: string;
    buttonText?: string;
    href?: string;
  };
}

export interface EmpresaInforType {
  direccion?: string;
  emergenciasTelf?: string;

  telefono?: string;
  whatsapp?: string;
  email?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
  targets?: {
    mision?: string;
    vision?: string;
    valores?: string;
  };
}

export type HeroSlideType = {
  title: string;
  description: string;
  background: string;
  align?: string;
  button: {
    text: string;
    url: string;
  };
};

export type InformationSectionType = {
  content: string;
  items: { icon: string; text: string }[];
};

export type ServiciosSectiontype = {
  title: string;
  items: {
    title: string;
    icon: string;
    href: string;
    content: string;
  }[];
};

export type BackgroundSectionType = {
  title?: string;
  content?: string;
  items: { icon: string; title?: string; content: string }[];
  background: string;
};

export type FeatureSection = {
  title: string;
  content?: string;
  items: {
    label: string;
    iamgeUrl: string;
    color: string;
  }[];
  button?: {
    label?: string;
    href?: string;
    color?: string;
  };
};

export interface ImgDetailSection {
  title: string;
  description?: string;
  imageSrc: string;
  imagePosition?: "left" | "right";
  listItems?: string[];
  button?: {
    label?: string;
    href?: string;
    color?: "orange" | "dark" | "blue";
  };
}

export type BestDoctorsType = {
  title: string;
  items: {
    name: string;
    specialty: string;
    image?: string;
  }[];
};
