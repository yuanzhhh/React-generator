declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.jpeg' {
  const value: any;
  export default value;
}

declare module "*.svg";

declare const SERVICE_STATE: {
  __DEV__: string;

  __PROD__: string;

  __BUILD_TYPE__: string;

  __BUILD_PATH__: string;
};

interface Window {
  jtalkRNApp: boolean;
}

declare const jsBridgeV3: any;
