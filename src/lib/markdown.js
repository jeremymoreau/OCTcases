import { marked } from 'marked';

function isInternalLink(href = '') {
  if (!href) {
    return false;
  }

  if (
    href.startsWith('/') ||
    href.startsWith('#') ||
    href.startsWith('./') ||
    href.startsWith('../')
  ) {
    return true;
  }

  if (typeof window === 'undefined') {
    return false;
  }

  return href.startsWith(window.location.origin);
}

function createRenderer() {
  const renderer = new marked.Renderer();
  const originalLinkRenderer = renderer.link;

  renderer.link = (href, title, text) => {
    const html = originalLinkRenderer.call(renderer, href, title, text);
    const anchorAttributes = isInternalLink(href)
      ? '<a target="_self" rel="noopener" '
      : '<a target="_blank" rel="noopener noreferrer" ';

    return html.replace(/^<a /, anchorAttributes);
  };

  return renderer;
}

export function renderMarkdown(markdown = '', { breaks = false } = {}) {
  return marked.parse(markdown || '', {
    breaks,
    renderer: createRenderer(),
  });
}
