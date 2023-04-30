export interface ISideNav {
  url?: string,
  icon: string,
  name: string,
  children: ISideNav[]
}

interface IChild {
  url: string,
  icon: string,
  name: string
}
