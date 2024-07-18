import { setUTMCookies } from './src/utils/utm';

export const onClientEntry = () => {
  setUTMCookies();
};
