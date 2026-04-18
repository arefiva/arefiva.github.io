---
layout: post
title: "Specification-First Development: The Mental Shift"
date: 2026-04-16 08:00:00 +0000
categories: [agentic-development]
tags: [specification, agentic-development, workflow, discipline]
---

There is a specific pull toward starting with code. Requirements arrive with enough shape to begin, the architecture is familiar, and writing code gives you something concrete to hold, something that compiles or fails and tells you where you are. Specification work has none of that feedback. You are reasoning about behavior that does not exist yet, writing assertions that no system can evaluate, and the result is a document rather than a function. The cost of writing the document is visible; the cost of not writing it is not, at least not immediately.

The shift from code-first to spec-first thinking is harder than adopting a new framework or changing a testing strategy, because it requires changing what you treat as productive at the beginning of a cycle. And that change is not just procedural.

## The Code-First Reflex

When a requirement lands, the mind immediately begins organizing the implementation: the data model, the service boundary, the function signature. These are concrete and manipulable in a way that specification questions are not. Code provides feedback through tests and build output. A specification provides feedback only through the quality of the thinking that produced it, which is harder to evaluate and harder to feel progress against.

This creates a pattern where the specification phase is treated as a formality rather than as the actual work of understanding the requirement. The questions that would surface during specification, about what the edge case behavior should be, which existing patterns to follow, what the precise scope of the feature is, still have to be answered. They surface later, in the middle of implementation, where answering them requires switching out of implementation mode and often discarding work that was built on the wrong assumption.

The reflex toward code is not irrational. In small, well-understood, low-stakes features, it is often the right call. The problem is that the features where it fails are not reliably distinguishable in advance from the features where it succeeds, which shifts the expected value calculation toward specification even for features that feel straightforward.

## Specification as Thinking

Writing a requirement down with enough specificity to be verified changes what you know about it. A requirement held as a mental model can contain contradictions and ambiguities that are invisible because the mind fills in the gaps automatically. Writing the same requirement as acceptance criteria forces those gaps into view. You discover that two criteria conflict, or that a behavior you assumed was obvious turns out to be a design decision that was never made, or that the feature as imagined touches a domain boundary that was not part of the original discussion.

None of these discoveries feel productive at the moment they surface. They represent work that did not seem to exist until the specification tried to surface it. But they are progress, because finding them at specification time costs far less than finding them after the implementation is already built around an assumption that turns out to be wrong.

### The Constraint-Based Requirement

A requirement stated as "should handle large inputs gracefully" can sit in the mind as a complete idea, because graceful is a concept everyone understands. Writing down what gracefully means in this context, whether it is a timeout with a 400 response, a queued job, or a streaming response with early flush, requires making a decision that felt already-made. The specification does not just record the decision. It reveals that the decision was never made, and forces it to happen before any code depends on it.

The [Red, Green, Refactor With an AI in the Loop](/agentic-development/2026/04/15/red-green-refactor-with-an-ai-in-the-loop.html) post describes this in terms of the red phase in TDD: writing a failing test is itself a form of specification, and the discipline it enforces is not about tests but about the thinking that tests require before implementation begins. Specification-first development extends that discipline upstream, into the requirement itself, before the tests exist.

## The Tempting Shortcut

The failure mode in agentic development has a recognizable shape. You describe a feature in broad strokes, confident you know what you mean, and the agent produces something that satisfies the description without quite fitting the codebase: the wrong abstraction, a pattern that diverges from what the rest of the system does, or edge cases that were obvious in retrospect but were never specified and therefore never handled. The output is not wrong by any objective measure, but it requires correction cycles that would have been specification cycles if the thinking had happened earlier.

The parallel in TDD is the same one experienced practitioners recognize: writing code first and retrofitting tests to match produces a test suite that is green but is measuring the implementation rather than verifying the requirement. The gap between those two things is where bugs live, and where shared understanding starts to erode.

What makes the shortcut attractive is that it sometimes works well, particularly in well-bounded features in familiar domains. The problem is that it tends to work reliably in exactly the situations where the full specification cycle would have been quick anyway, and fails most visibly in the situations where that specification work would have been most valuable.

## The Same Feature, Two Paths

Consider a straightforward feature: a search endpoint that returns paginated results filtered by status and date range. Both paths begin with the same description.

On the shortcut path, the agent reads the codebase, generates an endpoint, writes tests against the implementation, and delivers a diff that appears complete. On review, you notice the pagination implementation uses offset-based pagination while the rest of the API uses cursor-based pagination, because the requirement did not specify. The date range filter does not cover boundary conditions because none were in scope per anything written. The status filter accepts values the domain model does not support because no constraint was specified. Each issue is individually correctable. Together, they require a correction cycle that would not have been necessary if the specification had answered these questions before any code existed.

On the spec-first path, writing the acceptance criteria surfaces all of those questions before implementation begins. What pagination scheme should this endpoint follow? What is the behavior when the date range start falls after the end? Which status values are valid, and what response should an invalid value produce? By the time the specification is complete, every question that would otherwise surface in a correction cycle has been answered, and the implementation that follows fits cleanly not because the agent is more capable, but because it was built against a complete requirement rather than an underspecified one.

The total time is not necessarily shorter. The difference is in when the work happens and what the output looks like when the cycle ends.

## Sustaining the Discipline in a Team

The mental shift to spec-first thinking is harder to maintain in a team than in isolation, because the pressures that generate the code-first reflex are amplified by collaboration. Schedule pressure, visible progress requirements, and the tendency to treat specification work as less tangible than implementation all compress the phases where no code is being written.

A few structural patterns tend to hold the discipline in place. Treating the specification as the actual deliverable of the planning phase, rather than a prerequisite to the deliverable, changes how it is reviewed and how seriously ambiguities in it are taken. Requiring acceptance criteria to be written as verifiable assertions rather than descriptive statements, the distinction between "should handle errors gracefully" and "returns a 400 with a structured error body when the status value is not in the allowed set," makes vagueness visible in a way that descriptive criteria do not. Reviewing the implementation against the specification during code review, rather than reviewing the implementation against itself, keeps the connection between what was intended and what was built from eroding over time.

These are not rules that produce spec-first culture automatically. They are supports that make the discipline easier to maintain than to abandon.

## Where the Investment Shows

The benefits of specification-first development do not appear at the moment the specification is written. They appear in the implementation phase, which tends to be shorter because the hard questions were answered before any code depended on the answers. They appear in code review, which surfaces real issues rather than resolving ambiguities that were never clarified. And they appear when a feature needs to change, because the team can read the specification and understand not just what the code does but why it was built that way.

Cognitive debt, which the [Red, Green, Refactor](/agentic-development/2026/04/15/red-green-refactor-with-an-ai-in-the-loop.html) post describes as the erosion of shared understanding that accumulates when output is accepted without genuine comprehension, does not accumulate in the same way in codebases where specifications were clear. The reasoning behind each feature is preserved in the document that existed before any code was written, and that document is what makes the subsequent implementation readable rather than opaque.

Where this becomes concrete: the features that required the most correction after implementation are almost always the ones where the thinking happened during coding rather than before it, and the teams that can modify their own code with confidence are almost always the ones where clarity about what was built, and why, was established before a line of it existed. Once the discipline of spec-first thinking is in place, the next question becomes execution: how an agent works through a structured backlog of stories without losing track of intent or silently building on broken foundations. The [ARC: The Agentic Release Cycle](/agentic-development/2026/04/17/arc-the-agentic-release-cycle.html) post explores that machinery in detail.
