export interface SidebarOption {
  name: string;
  label: string;
  href?: string;
  icon?: any;
  subItems?: SidebarOption[];
  permisos?: string[];
}
