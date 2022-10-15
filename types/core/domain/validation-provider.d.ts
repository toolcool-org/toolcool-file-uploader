import { ISettings } from '../settings';
import { IPlugin } from '../plugins/plugin-declarations';
export interface IValidationResult {
    isValid: boolean;
    message: string;
}
export declare const validate: (settings: ISettings, file: File, plugins: IPlugin[]) => Promise<IValidationResult>;
