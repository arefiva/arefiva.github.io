---
layout: post
title: "Acceptance Criteria That Actually Work"
date: 2026-04-18 08:00:00 +0000
categories: [agentic-development]
tags: [specification, acceptance-criteria, agentic-development, workflow]
---

The quality of specification determines the quality of execution. This idea appears in the [Red, Green, Refactor](/agentic-development/2026/04/15/red-green-refactor-with-an-ai-in-the-loop.html) post, which framed it as the red phase of test-driven development (TDD) applied to agentic development. The [Specification-First Development](/agentic-development/2026/04/16/specification-first-development-the-mental-shift.html) post explored why that shift is harder than it sounds and what it takes to sustain it. And the [mARCH: The Agentic Release Cycle Harness](/agentic-development/2026/04/17/march-the-agentic-release-cycle-harness.html) post showed what happens when a well-formed specification reaches an execution loop that can verify each story against its criteria before moving to the next.

What none of those posts did is examine the criteria themselves. What makes an acceptance criterion actually verifiable? Where is the line between a criterion that drives correct implementation and one that looks specific enough but still leaves the hard questions unanswered? That is what this post is about.

## Assertions, Not Descriptions

The most common failure in acceptance criteria is that they describe behavior rather than assert it. A description tells you what the feature should do in general terms. An assertion tells you what a specific input produces as a specific output, under specific conditions, with a specific observable result.

Consider the difference:

**Description:** "The endpoint should return paginated results efficiently."

**Assertion:** "GET /api/trades?page_size=20&cursor=abc123 returns at most 20 results, a next_cursor value when more results exist, and no next_cursor when the final page is reached."

The description appears complete at first glance. Efficiently names a broad concept without resolving the decisions underneath it. But it defers every decision that matters: what pagination scheme, what happens at the boundary, what the response shape looks like. Those decisions will still need to be made. The question is whether they get made during specification, when the cost of a wrong answer is a revised document, or during implementation, when the cost is rework.

The assertion leaves less room for interpretation. It specifies cursor-based pagination, a concrete page size, the presence and absence of the next_cursor field, and the boundary behavior at the last page. An agent implementing against this criterion has enough information to produce the right implementation on the first pass, not because the agent is more capable, but because the criterion removed the ambiguity the agent would otherwise have to guess about.

## The Specificity Spectrum

Not all criteria need the same level of detail. The appropriate specificity depends on how much interpretation the criterion leaves open and how costly a wrong interpretation would be.

### Too vague to verify

"The system should handle errors gracefully."

This reads as an aspiration. Gracefully means different things to different people, and there is no way to verify whether the implementation satisfies it without first defining what gracefully means in this specific context. A criterion at this level does not constrain the implementation at all.

### Directionally useful but still ambiguous

"Invalid requests should return a 400 status code with an error message."

This is closer. The status code is specific and verifiable. But what constitutes an invalid request? What structure does the error message take? Is it a plain string, a structured JSON body, or an error code from a predefined set? Each of those choices produces a different implementation, and the criterion does not specify which one.

### Verifiable and complete

"A POST to /api/trades with a missing required field (instrument_id, quantity, or side) returns HTTP 400 with a JSON body containing an errors array, where each entry has a field name and a message string. The response includes one entry per missing field."

This criterion can be implemented and verified without asking a follow-up question. It specifies the trigger condition (missing required fields), the response shape (JSON with errors array), the structure of each error entry (field and message), and the multiplicity behavior (one entry per missing field). An implementation that satisfies this criterion either matches or it does not.

### The practical question

In practice, the useful level of specificity is usually the point where the person or agent implementing the criterion does not need to make a design decision that was not explicitly made in the specification. If the criterion requires the implementer to choose between two reasonable approaches, it is underspecified. This does not mean every criterion needs to be a paragraph. It means every criterion needs to close the decisions that matter for that particular behavior.

## Edge Cases Surface at Specification Time

One of the less obvious benefits of writing specific acceptance criteria is that they force edge cases into view before any code exists. A vague criterion hides its edge cases because the language is broad enough to encompass them without addressing them. A specific criterion either covers the edge case explicitly or makes the gap visible by its absence.

Consider a date range filter. A vague criterion might say "supports filtering by date range." Writing specific criteria for this feature surfaces questions that would otherwise appear during implementation or, worse, in production:

- What happens when the start date is after the end date? Is that a 400, or does the system swap them silently?
- Are the boundaries inclusive or exclusive? Does a trade executed at exactly the start timestamp appear in the results?
- What date format is accepted? What happens when the format is wrong?
- What happens when only one boundary is provided? Is that a valid partial range or a missing parameter error?

Each of these questions represents a design decision. Writing the criterion forces the decision to be made explicitly, by whoever understands the domain well enough to make it. When that decision is deferred to implementation, whoever is writing the code, human or agent, makes the choice based on whatever seems reasonable, and "reasonable" may not match what the rest of the system does.

## Writing Criteria for Agents

Human developers reading acceptance criteria can interpolate. They recognize patterns from the codebase, infer unstated constraints from convention, and ask a colleague when something is ambiguous. An agent, at least in its current form, does not do those things reliably. It reads the criterion literally and implements what it says, which means the criterion needs to say what it means with less margin for interpretation.

The adjustment is narrower than it might seem: close the gaps that a human reader would fill automatically by interpolating from context.

### What agents need explicitly stated

**Existing patterns to follow.** A human developer working in a codebase notices that all endpoints use a specific error response format and follows the same pattern. An agent might or might not discover that pattern depending on which files it reads. Stating "follow the error response pattern established in src/api/errors.py" removes the guesswork.

**Boundary behavior.** Humans often have reasonable intuitions about what should happen at boundaries. Agents do not have intuitions. If the criterion says "returns paginated results," the agent needs to know what happens when there are zero results, what happens at the last page, and whether an empty page is a valid response.

**Negative cases.** What the system should not do is as important as what it should do. "The endpoint must not return soft-deleted records in the result set" is the kind of constraint a human developer might infer from domain context but an agent will not apply unless told.

### What stays the same

The fundamental skill is the same regardless of who reads the criteria. A well-written criterion for an agent is also a well-written criterion for a human. The distinction comes down to tolerance: an agent has zero tolerance for ambiguity where a human has some, so criteria written for agents tend to be more precise, and that precision benefits everyone.

## From Criteria to Tests

Acceptance criteria that are specific enough to verify are, in a meaningful sense, already tests. The translation from a criterion to a test case tends to be mechanical rather than creative, which is part of what makes the approach work.

Take the error response criterion from earlier:

> A POST to /api/trades with a missing required field (instrument_id, quantity, or side) returns HTTP 400 with a JSON body containing an errors array, where each entry has a field name and a message string. The response includes one entry per missing field.

The test cases emerge directly:

- POST with all required fields missing: expect 400, errors array with three entries
- POST with one field missing: expect 400, errors array with one entry matching the missing field
- POST with all fields present: expect success, no errors array
- POST with an extra unknown field: expect success (the criterion says nothing about rejecting unknown fields, so the test verifies the system tolerates them)

The fourth test reveals something interesting: a gap in the criterion. Should unknown fields be silently ignored or rejected? If the answer matters, the criterion should be updated. If it does not matter, the test documents the behavior that was chosen.

This is the feedback loop that makes acceptance criteria powerful. Writing criteria surfaces design decisions. Translating criteria to tests surfaces gaps in those decisions. Both happen before implementation, when the cost of a revision is a line in a document rather than a refactored function.

## Anti-Patterns

There are a few patterns that consistently produce criteria which look specific but fail during implementation.

### The implementation prescription

"Use a recursive CTE to aggregate positions by book hierarchy."

This is an implementation instruction. It tells the implementer how to build something without specifying what the correct behavior is. If the recursive CTE produces the wrong result, this criterion still passes. Acceptance criteria describe observable outcomes, not internal mechanisms.

Implementation guidance belongs in the implementation notes field of the specification, not in the acceptance criteria. The distinction matters because acceptance criteria are what get verified. If the criterion is "use a CTE," the verification checks whether a CTE was used, not whether the aggregation is correct.

### The untestable quality

"The UI should feel responsive."

There is no test for feel, which makes this not a criterion but a goal that belongs in the feature description rather than the acceptance criteria. A testable version might be "page load completes within 200ms at the 95th percentile" or "the search input debounces at 300ms and shows a loading indicator within 100ms of the query firing." Both can be measured and verified.

### The hidden dependency

"The report generates correctly."

Correctly according to what? This criterion assumes the reviewer already knows what correct means, which may be true today but tends not to hold when someone new joins the team or when the feature changes six months from now. Criteria that work well over time are self-contained: they carry enough context that someone unfamiliar with the feature can determine whether the implementation satisfies them.

### The scope creep criterion

"All edge cases are handled."

This is unfalsifiable. You cannot verify that all edge cases are handled, because you cannot enumerate all edge cases. Good criteria enumerate the specific edge cases that are in scope, which makes the boundary of the feature explicit and reviewable.

## Where This Lands

The practice of writing acceptance criteria well is the most concrete expression of the broader discipline of [specification-first development](/agentic-development/2026/04/16/specification-first-development-the-mental-shift.html), the place where abstract intent becomes verifiable behavior. When the criteria are specific enough to implement without interpretation and complete enough to test without guessing, the execution phase, whether performed by a human or an agent, tends to become a matter of translation rather than invention. The thinking that mattered most already happened, and it was captured in a form that persists after the implementation is done and remains useful when the feature eventually needs to change.
