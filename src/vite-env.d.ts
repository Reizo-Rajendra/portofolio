// Global type declarations for Svelte 5 + Vite project

/// <reference types="vite/client" />

// Environment variables type safety
interface ImportMetaEnv {
  readonly VITE_RESEND_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
