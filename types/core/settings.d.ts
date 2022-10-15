import { IPlugin } from './plugins/plugin-declarations';
export interface IPreviewCallbackData {
    files: File[];
}
export interface IUploadCallbackData {
    files: File[];
}
export interface ISettings {
    path: string;
    maxSizeInBytes?: number;
    plugins?: ((settings: ISettings) => IPlugin)[];
    uploadCallback?: (data: IUploadCallbackData) => void;
    previewCallback?: (data: IPreviewCallbackData) => void;
    validationEnabled?: boolean;
    maxWidth?: number;
    maxHeight?: number;
}
export declare const settings: ISettings;
