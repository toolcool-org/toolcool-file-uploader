export interface IPlugin {
  extensions: string[]; // The list of extensions that plugin can handle, without the dot.
  destroy?: () => void;
}