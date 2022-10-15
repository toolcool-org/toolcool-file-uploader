import { ISettings } from '../settings';
import { IPlugin, IUploadData } from './plugin-declarations';

export interface IPluginsProvider {
  init: () => void;
  upload: (uploadData: IUploadData) => void;
  destroy: () => void;
  getPlugins: () => IPlugin[];
}

const PluginsProvider = (settings: ISettings) : IPluginsProvider => {

  const plugins: IPlugin[] = [];

  const init = () => {
    if(!settings.plugins) return;

    for(const pluginFunc of settings.plugins){
      const plugin = pluginFunc(settings);
      plugins.push(plugin);

      if(plugin.init && typeof plugin.init === 'function'){
        plugin.init();
      }
    }
  };

  const upload = (uploadData: IUploadData) => {
    for(const plugin of plugins){
      if(plugin.upload && typeof plugin.upload === 'function'){
        plugin.upload(uploadData);
      }
    }
  };

  const destroy = () => {
    for(const plugin of plugins){
      if(plugin.destroy && typeof plugin.destroy === 'function'){
        plugin.destroy();
      }
    }
  };

  const getPlugins = () => {
    return plugins;
  };

  return {
    init,
    upload,
    destroy,
    getPlugins,
  };
};

export default PluginsProvider;