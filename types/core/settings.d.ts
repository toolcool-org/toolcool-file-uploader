import { IPlugin } from './plugins/plugin-declarations';
export interface IPreviewCallbackData {
    file: File;
    ext: string;
}
export interface IUploadCallbackData {
    file: File;
    ext: string;
}
export interface ISettings {
    path: string;
    plugins?: ((settings: ISettings) => IPlugin)[];
    uploadCallback?: (data: IUploadCallbackData) => void;
    previewCallback?: (data: IPreviewCallbackData) => void;
    validationEnabled?: boolean;
}
export declare const settings: ISettings;
