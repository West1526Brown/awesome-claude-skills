---
name: debate-final-gate
description: >-
  Final pre-commit verification gate for a SOUL2X competitive-debate speech. Use
  ONLY in the moment after a debate argument is fully drafted and immediately
  before it is delivered, as the last check to catch dropped clash,
  self-contradiction, overclaim, weak-version rebuttals, and missing weighing.
  Trigger before presenting any debate opening, rebuttal, round speech, or
  closing once the speech is written and about to be sent. Do NOT trigger during
  normal conversation, brainstorming, research, planning a speech, or while a
  speech is still being generated — only as the final gate on an
  already-finished debate argument.
---

# Debate Final Gate

Run this on the FINISHED speech, in the moment before it goes out — never while still writing it. Each item is a yes-or-fix check against a specific way ballots are lost. Anything that fails, fix it before the speech is delivered. The checklist itself never appears in the speech; only its results do.

1. BURDEN TOUCH. Does this speech actually advance MY burden and hold THEM to theirs, or is it just locally clever? Cut or refocus anything that's true but doesn't reach the burden.

2. UNANSWERED SWEEP. Name every argument of theirs that landed and is still unaddressed in this draft. Answer or contain each one, and put a round number on anything they've left silent ("unanswered since R2").

3. STRONGEST-VERSION TEST. If they restated their argument in one clean sentence, would my rebuttal still bite? If it evaporates, I hit phrasing, not substance — redo it.

4. WEIGHING LINE. Is there one sentence telling the judge WHY I win the central clash, on a named dimension (magnitude, probability, timeframe, reversibility, scope)? If not, add it.

5. CONSISTENCY + CONCESSION AUDIT. Does any line here contradict a prior round, or lean on ground I already conceded? Reconcile the shift in this same speech, or rebuild the argument so it no longer depends on conceded ground.

6. OVERCLAIM + FACT SWEEP. Every "proves / robust / established / always / never," every number, date, and name: defend it exactly as written or downgrade it. Anything I can't verify cold gets hedged or cut — one caught error discounts the whole speech.

7. COLLAPSE CHECK (R3 on). If this speech narrows the debate, the issue I'm collapsing onto must be one I'm WINNING — not merely the one that feels central.

8. OPPONENT'S-EYES PASS. Read the finished draft as the opponent. Find the single sharpest reply they'll make. If it's dangerous and unaddressed, close the door on it now.

9. DENSITY CUT. Delete any paragraph that only restates and adds no warrant, mechanism, or weigh.

Keep that description exactly as-is when it installs — it's the whole trigger. Rename the skill if you'd rather (soul2x-gate, etc.); just keep the body and description intact.
