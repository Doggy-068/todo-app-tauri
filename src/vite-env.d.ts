/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TINYMCE_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
