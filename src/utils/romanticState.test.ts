import test from 'node:test';
import assert from 'node:assert/strict';
import {
  advanceStoryScene,
  prevStoryScene,
  canFlipNext,
  canFlipPrev,
  nextBookPage,
  prevBookPage,
  pickNextRandomMessage,
  toggleCareCompletion,
  calculateCareProgress
} from './romanticState.ts';

test('advanceStoryScene loops correctly through scenes', () => {
  assert.equal(advanceStoryScene(1, 6), 2);
  assert.equal(advanceStoryScene(5, 6), 6);
  assert.equal(advanceStoryScene(6, 6), 1);
});

test('prevStoryScene steps backward and wraps around', () => {
  assert.equal(prevStoryScene(3, 6), 2);
  assert.equal(prevStoryScene(1, 6), 6);
});

test('book page navigation respects boundaries', () => {
  assert.equal(canFlipPrev(1), false);
  assert.equal(canFlipPrev(2), true);
  assert.equal(canFlipNext(5, 5), false);
  assert.equal(canFlipNext(4, 5), true);

  assert.equal(nextBookPage(1, 5), 2);
  assert.equal(nextBookPage(5, 5), 5); // cannot exceed max
  assert.equal(prevBookPage(3), 2);
  assert.equal(prevBookPage(1), 1); // cannot go below 1
});

test('pickNextRandomMessage avoids immediate duplicates', () => {
  const items = [
    { id: 'a', text: 'Msg A' },
    { id: 'b', text: 'Msg B' },
    { id: 'c', text: 'Msg C' }
  ];

  for (let i = 0; i < 20; i++) {
    const picked = pickNextRandomMessage(items, 'a');
    assert.notEqual(picked.id, 'a');
  }
});

test('toggleCareCompletion adds and removes IDs', () => {
  let completed: string[] = [];
  completed = toggleCareCompletion(completed, 'water');
  assert.deepEqual(completed, ['water']);

  completed = toggleCareCompletion(completed, 'rest');
  assert.deepEqual(completed, ['water', 'rest']);

  completed = toggleCareCompletion(completed, 'water');
  assert.deepEqual(completed, ['rest']);
});

test('calculateCareProgress returns accurate bounded percentage', () => {
  assert.equal(calculateCareProgress(0, 5), 0);
  assert.equal(calculateCareProgress(2, 5), 40);
  assert.equal(calculateCareProgress(5, 5), 100);
  assert.equal(calculateCareProgress(6, 5), 100);
});
