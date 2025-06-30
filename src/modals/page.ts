export enum PageType {
  API_GET = "API_GET",
  API_POST = "API_POST",
  API_PUT = "API_PUT",
  API_DELETE = "API_DELETE",
  CONFIG = "CONFIG",
  DOCUMENT = "DOCUMENT",
  ENV = "ENV",
  TEST = "TEST",
}

export interface Manager {
  setName: (id: string, name: string) => void;
  setInstance: (meta: any) => void;
}

export interface Meta {
  id: string;
  name: string;
}

export interface Pager<T extends Meta = Meta> {
  id: string;
  type: PageType;
  title: string;
  changed: boolean;
  meta: T;
}
