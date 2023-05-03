export interface SideNav {
  url?: string;
  icon: string;
  name: string;
  children: SideNav[];
}

export interface Child {
  url: string;
  icon: string;
  name: string;
}
