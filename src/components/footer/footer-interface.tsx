export interface IFooterMenuItem {
  readonly title: string;
  readonly path: string;
  readonly isExternal?: boolean;
}

export interface IFooterProperties {
  readonly menuItems: Array<IFooterMenuItem>;
}
