import { ISettings } from '../settings';

export interface IPluginsProvider {
  init: () => void;
  destroy: () => void;
}

const PluginsProvider = (settings: ISettings) : IPluginsProvider => {

  const init = () => {
    if(!settings.plugins) return;

    for(const plugin of settings.plugins){
      if(plugin.init && typeof plugin.init === 'function'){
        plugin.init();
      }
    }
  };

  const destroy = () => {
    if(!settings.plugins) return;
    
    for(const plugin of settings.plugins){
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