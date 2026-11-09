import assert from 'node:assert/strict';
import test from 'node:test';
import { sortMembers } from '../app/lab/members.ts';

const member = (name, korean, program, period) => ({ name, korean, program, period });
const names = members => members.map(m => m.name);

test('current members: program first, then oldest entry term, then Korean name', () => {
  const input = [
    member('Choi', '최재우', 'MS', '2026-1 ~'),
    member('Intern', '강민수', 'Internship', '2023-1 ~'),
    member('Lee', '이채원', 'MS', '2026-1 ~'),
    member('Integrated', '박선현', 'MS/PhD integrated', '2025-1 ~'),
    member('Nam', '남관호', 'MS', '2026-1 ~'),
    member('Earlier MS', '신창혁', 'MS', '2025-2 ~'),
    member('Doctoral', '김민수', 'PhD', '2024-2 ~'),
  ];
  const original = [...input];
  assert.deepEqual(names(sortMembers(input, 'current')), ['Doctoral', 'Integrated', 'Earlier MS', 'Nam', 'Lee', 'Choi', 'Intern']);
  assert.deepEqual(input, original);
});

test('alumni: program first, then latest completion term (not entry), then Korean name', () => {
  const input = [
    member('Ahn', '안상준', 'Internship', '2026-1'),
    member('Older graduate', '강민수', 'MS', '2025-1 ~ 2025-2'),
    member('Byeon', '변건호', 'Internship', '2026-1'),
    member('Newer graduate', '최민수', 'MS', '2023-1 ~ 2026-1'),
    member('Doctoral', '홍길동', 'PhD', '~ 2022-1'),
    member('Older intern', '김민수', 'Internship', '2025-2'),
  ];
  assert.deepEqual(names(sortMembers(input, 'alumni')), ['Doctoral', 'Newer graduate', 'Older graduate', 'Byeon', 'Ahn', 'Older intern']);
});

test('same surname uses given name; missing Korean names use English after Korean names', () => {
  const input = [
    member('Zoe', undefined, 'MS', '~ 2026-1'),
    member('Kim Haneul', '김하늘', 'MS', '~ 2026-1'),
    member('Alice', undefined, 'MS', '~ 2026-1'),
    member('Kim Gaeul', '김가을', 'MS', '~ 2026-1'),
  ];
  assert.deepEqual(names(sortMembers(input, 'alumni')), ['Kim Gaeul', 'Kim Haneul', 'Alice', 'Zoe']);
});
