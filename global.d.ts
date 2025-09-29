// global.d.ts  (create this at project root if not exists)
export {};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}
