const STORAGE_KEY = 'completedCasesLog';

export function getCaseProgressLog() {
  if (typeof localStorage === 'undefined') {
    return {};
  }

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
  } catch (error) {
    return {};
  }
}

function saveCaseProgressLog(progressLog) {
  if (typeof localStorage === 'undefined') {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(progressLog));
}

export function isCaseCompleted(caseID) {
  return Boolean(getCaseProgressLog()[caseID]);
}

export function setCaseCompleted(caseID, completed) {
  const progressLog = getCaseProgressLog();
  progressLog[caseID] = completed;
  saveCaseProgressLog(progressLog);
  return progressLog;
}

export function toggleCaseCompleted(caseID) {
  const progressLog = getCaseProgressLog();
  progressLog[caseID] = !progressLog[caseID];
  saveCaseProgressLog(progressLog);
  return Boolean(progressLog[caseID]);
}
