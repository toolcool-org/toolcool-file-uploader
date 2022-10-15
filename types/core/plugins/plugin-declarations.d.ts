import { IValidationResult } from '../domain/validation-provider';
import { ISettings } from '../settings';
export interface IUploadData {
    file: File;
    $uploader: HTMLElement;
    $uploadPanel?: HTMLElement;
}
export interface IPlugin {
    id: string;
    title: string;
    extensions: string[];
    mimeTypes: string[];
    init?: () => void;
    upload?: (uploadData: IUploadData) => void;
    validate?: (settings: ISettings, file: File) => Promise<IValidationResult>;
    destroy?: () => void;
}
