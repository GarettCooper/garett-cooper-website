declare module 'react-loading-overlay' { 
  import { ReactNode, Component } from 'react';
  declare class LoadingOverlay extends Component<LoadingOverlayProps> {
      constructor(props: LoadingOverlayProps);
  }

  export interface LoadingOverlayProps {
    active?: boolean;
    fadeSpeed?: number;
    onClick?: () => void;
    className?: string;
    classNamePrefix?: string;
    spinner?: boolean | ReactNode;
    text?: ReactNode;
    styles?: object;
  }

  export default LoadingOverlay;
}