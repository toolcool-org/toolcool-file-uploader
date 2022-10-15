import { ISettings } from '../settings';
import { getExtensionWithoutDot } from './io-provider';
import { IPlugin } from '../plugins/plugin-declarations';

export interface IValidationResult {
  isValid: boolean;
  message: string;
}

/**
 * Check if the specified file extension
 * is included in at least one plugin.
 */
const extensionIncluded = (ext: string, plugins: IPlugin[]) => {

  for(const plugin of plugins){
    if(plugin.extensions.includes(ext)) return true;
  }

  return false;
};

export const validate = (settings: ISettings, file: File, plugins: IPlugin[]) : IValidationResult => {
  if(!settings.validationEnabled) return {
    isValid: true,
    message: '',
  };

  let isValid = true;
  let message = '';

  // validate file extension ---------------
  if(isValid){
    const ext = getExtensionWithoutDot(file.name);
    if(!extensionIncluded(ext, plugins)){
      return {
        isValid: false,
        message: `The '.${ ext }' file extension is not supported.`,
      };
    }
  }

  return {
    isValid,
    message,
  };
};