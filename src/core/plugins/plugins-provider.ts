import { ISettings } from '../settings';
import { IPlugin } from './declarations';

export interface IPluginsProvider {
  init: () => void;
  destroy: () => void;
}

const PluginsProvider = (settings: ISettings) : IPluginsProvider => {

  const plugins: IPlugin[] = [];

  const init = () => {
    if(!settings.plugins) return;

    for(const pluginFunc of settings.plugins){
      const plugin = pluginFunc();
      plugins.push(plugin);

      if(plugin.init && typeof plugin.init === 'function'){
        plugin.init();
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

  return {
    init,
    destroy,
  };
};

export default PluginsProvider;