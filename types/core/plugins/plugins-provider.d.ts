import { ISettings } from '../settings';
export interface IPluginsProvider {
    init: () => void;
    destroy: () => void;
}
declare const PluginsProvider: (settings: ISettings) => IPluginsProvider;
export default PluginsProvider;
