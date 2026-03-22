const jsonCache = new Map();

async function fetchJson(path) {
  if (!jsonCache.has(path)) {
    jsonCache.set(
      path,
      fetch(path).then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
      })
    );
  }

  return jsonCache.get(path);
}

export function getCaseIndex() {
  return fetchJson('/assets/index/case_index.json');
}

export function getArticleIndex() {
  return fetchJson('/assets/index/article_index.json');
}

export function getAtlasIndex() {
  return fetchJson('/assets/index/atlas_index.json');
}

export function getCase(caseID) {
  return fetchJson(`/content/cases/${caseID}.json`);
}

export function getArticle(slug) {
  return fetchJson(`/content/articles/${slug}.json`);
}

export function getAtlasEntry(slug) {
  return fetchJson(`/content/atlas/${slug}.json`);
}

export function getPage(slug) {
  return fetchJson(`/content/pages/${slug}.json`);
}

export function getAboutPage() {
  return fetchJson('/content/other/about-us/about-us.json');
}
