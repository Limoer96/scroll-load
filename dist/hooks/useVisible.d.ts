/// <reference types="react" />
export interface IConfig {
    offset?: number | number[];
    onLoad?: () => void;
}
declare function useVisible(currentElem: React.MutableRefObject<Element | null>, config: IConfig): boolean;
export default useVisible;
