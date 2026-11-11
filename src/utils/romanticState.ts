/**
 * Pure state and progression utilities for Mili's surprise website.
 * Free of DOM dependencies to enable fast, deterministic unit testing.
 */

export function advanceStoryScene(currentId: number, totalScenes: number): number {
  if (totalScenes <= 0) return 1;
  if (currentId >= totalScenes) return 1; // loop back or stay
  return currentId + 1;
}

export function prevStoryScene(currentId: number, totalScenes: number): number {
  if (totalScenes <= 0) return 1;
  if (currentId <= 1) return totalScenes;
  return currentId - 1;
}

export function canFlipNext(currentPage: number, totalPages: number): boolean {
  return currentPage < totalPages;
}

export function canFlipPrev(currentPage: number): boolean {
  return currentPage > 1;
}

export function nextBookPage(currentPage: number, totalPages: number): number {
  if (canFlipNext(currentPage, totalPages)) {
    return currentPage + 1;
  }
  return currentPage;
}

export function prevBookPage(currentPage: number): number {
  if (canFlipPrev(currentPage)) {
    return currentPage - 1;
  }
  return currentPage;
}

/**
 * Pick a different random message avoiding immediate consecutive duplicates
 */
export function pickNextRandomMessage<T extends { id: string }>(items: T[], currentId?: string): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from empty array");
  }
  if (items.length === 1) {
    return items[0];
  }
  const pool = currentId ? items.filter(item => item.id !== currentId) : items;
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

/**
 * Toggle care item completed state
 */
export function toggleCareCompletion(completedIds: string[], id: string): string[] {
  if (completedIds.includes(id)) {
    return completedIds.filter(item => item !== id);
  }
  return [...completedIds, id];
}

/**
 * Calculate progress percentage
 */
export function calculateCareProgress(completedCount: number, totalCount: number): number {
  if (totalCount <= 0) return 0;
  const percentage = Math.round((completedCount / totalCount) * 100);
  return Math.min(100, Math.max(0, percentage));
}
