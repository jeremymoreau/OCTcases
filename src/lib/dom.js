export function bindObfuscatedMailLinks(rootElement = document) {
  if (!rootElement || !rootElement.querySelectorAll) {
    return;
  }

  const obfuscatedLinks = rootElement.querySelectorAll('.obfs-m');
  obfuscatedLinks.forEach((obfuscatedLink) => {
    if (obfuscatedLink.dataset.bound === 'true') {
      return;
    }

    obfuscatedLink.dataset.bound = 'true';
    obfuscatedLink.addEventListener('click', () => {
      const part1 = obfuscatedLink.dataset.part1 || '';
      const part2 = obfuscatedLink.dataset.part2 || '';
      const part3 = obfuscatedLink.dataset.part3 || '';
      const emailAddress = `${part1}@${part2}.${part3}`;

      obfuscatedLink.href = `mailto:${emailAddress}`;
      obfuscatedLink.target = '_self';
      obfuscatedLink.textContent = emailAddress;
    });
  });
}
