import { ISettings } from '../settings';
import { IPlugin, IUploadData } from './plugin-declarations';
export interface IPluginsProvider {
    init: () => void;
    upload: (uploadData: IUploadData) => void;
    destroy: () => void;
    getPlugins: () => IPlugin[];
}
declare const PluginsProvider: (settings: ISettings) => IPluginsProvider;
export default PluginsProvider;
