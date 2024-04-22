/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly REST_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
