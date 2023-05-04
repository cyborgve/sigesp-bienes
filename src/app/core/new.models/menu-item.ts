export interface MenuItem {
  label: string;
  routerLink: string;
  image?: string;
  icon?: string;
  items?: MenuItem[];
}
