import { renderMarkdown } from './markdown';

export function stripMarkdown(markdown = '') {
  if (typeof document === 'undefined') {
    return markdown.replace(/[#*_`>\-\n]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  const container = document.createElement('div');
  container.innerHTML = renderMarkdown(markdown);
  return (container.textContent || '').replace(/\s+/g, ' ').trim();
}

export function truncateText(text = '', maxLength = 180) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}...`;
}

export function toTitleCase(value = '') {
  return value.replace(/\b\w/g, (character) => character.toUpperCase());
}

export function formatCaseLabel(caseID = '') {
  const prefix = caseID.replace(/[0-9]/g, '');
  const number = Number(caseID.match(/\d+/)?.[0] || 0);
  return `${toTitleCase(prefix.replace(/-/g, ' '))} ${number}`;
}
