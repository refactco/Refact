import { ICrumbItem } from '../bread-crumb/bread-crumb-interface';
import { IMenuItem } from '../menu/menu-interface';

export interface IHeaderProperties {
  readonly subtitle: string;
  readonly menuItems: Array<IMenuItem>;
  readonly breadCrumbItems?: ICrumbItem[];
}

export interface IHeaderState {
  readonly isMobileNavOpen: boolean;
}
