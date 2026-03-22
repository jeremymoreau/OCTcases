export const DESKTOP_MIN_WIDTH = 1100;

export function shouldUseDesktopUi() {
  if (typeof window === 'undefined') {
    return false;
  }

  const wideEnough = window.matchMedia(
    `(min-width: ${DESKTOP_MIN_WIDTH}px)`
  ).matches;
  const canHover = window.matchMedia('(hover: hover)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  return wideEnough && (canHover || finePointer);
}

export function getInitialUiMode() {
  if (typeof window !== 'undefined' && window.__OCTCASES_UI__) {
    return window.__OCTCASES_UI__;
  }

  return shouldUseDesktopUi() ? 'desktop' : 'mobile';
}
