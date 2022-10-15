import { IPlugin } from './plugins/plugin-declarations';
export interface ISettings {
    path: string;
    plugins?: ((settings: ISettings) => IPlugin)[];
    uploadCallback?: () => void;
    previewCallback?: () => void;
}
export declare const settings: ISettings;
