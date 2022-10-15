import { ISettings } from '../settings';
import { IUploadData } from './plugin-declarations';
export interface IPluginsProvider {
    init: () => void;
    upload: (uploadData: IUploadData) => void;
    destroy: () => void;
}
declare const PluginsProvider: (settings: ISettings) => IPluginsProvider;
export default PluginsProvider;
