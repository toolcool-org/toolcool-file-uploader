export interface IPlugin {
    extensions: string[];
    init?: () => void;
    destroy?: () => void;
}
