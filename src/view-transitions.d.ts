/**
 * View Transitions API type declarations.
 *
 * TypeScript DOM lib may not include startViewTransition.
 * This augments the Document interface for the ink-spread theme toggle.
 */
export {};

declare global {
  interface ViewTransition {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
    skipTransition(): void;
  }

  interface Document {
    startViewTransition?(callback: () => void | Promise<void>): ViewTransition;
  }
}
