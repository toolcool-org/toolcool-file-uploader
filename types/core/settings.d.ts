import { IPlugin } from './plugins/declarations';
export interface ISettings {
    path: string;
    plugins?: (() => IPlugin)[];
}
export declare const settings: ISettings;
