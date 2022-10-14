import { IPlugin } from './plugins/declarations';

export interface ISettings {
  path: string,
  plugins?: IPlugin[];
}

export const settings : ISettings = {
  path: '',
  plugins: [],
};