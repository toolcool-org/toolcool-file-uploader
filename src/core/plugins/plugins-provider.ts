import { IPlugin } from './declarations';

export interface IPluginsProvider {
  destroy: () => void;
}

const PluginsProvider = () : IPluginsProvider => {
  let plugins: IPlugin[] = [];

  const destroy = () => {
    for(const plugin of plugins){
      if(plugin.destroy && typeof plugin.destroy === 'function'){
        plugin.destroy();
      }
    }
    plugins = [];
  };

  return {
    destroy,
  };
};

export default PluginsProvider;