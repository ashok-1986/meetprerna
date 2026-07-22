/// <reference types="next" />
/// <reference types="next/image-types/global" />

// Plausible analytics
interface Window {
  plausible?: (event: string, options?: { props?: Record<string, unknown> }) => void;
}
