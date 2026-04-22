---
layout: post
title: "Red, Green, Refactor With an AI in the Loop"
date: 2026-04-15 09:00:00 +0000
categories: [agentic-development]
tags: [TDD, agentic-development, workflow, specification]
---

Test-Driven Development (TDD) rests on a deceptively simple mantra: Red goes to Green goes to Refactor. Write a failing test, make it pass, then clean it up. Repeat.

What makes TDD powerful is not the tests themselves, but the discipline the cycle enforces. The red phase forces you to understand what you are building before you build it, because you cannot write a failing test for something you have not thought through. That clarity shapes how quickly and smoothly the green and refactor phases unfold. The green phase follows: write the minimum code to make the test pass, because the test is the specification. Then refactor, using a passing suite as a safety net to clean up the implementation while locking behavior in place. Do this across a career, and you end up with a codebase that is both well-tested and well-understood, because every piece was thought through before it existed.

I have been building software with [an agentic workflow](/agentic-development/) for a while now, and I notice the workflow follows the same cycle as TDD, just with different tools and a different executor.

## The Agentic Cycle

The core of this approach is a specification that takes the familiar structure of a Product Requirements Document (PRD) and adapts it for a fundamentally different audience: an autonomous agent rather than a human reader. That shift in audience shapes everything about how the specification is written, because a human reader can interpret ambiguous requirements, ask follow-up questions, and fill in gaps from context, while an agent cannot. The rigor it demands is borrowed from TDD: before a single line of code is written, the specification must answer the same questions a practitioner asks when writing a test, such as what specific behavior must happen, what edge cases matter, what state changes are observable, and what verification would prove this is complete.

### Writing the Specification

When starting a feature, you move through a structured conversation with the agent in plan mode (a read-only reasoning stage where it can read the codebase and think through a solution without writing code yet), describing the feature, the user stories that compose it, and the acceptance criteria that would verify each story is done. This conversation forces you to articulate not just what to build, but what done looks like. This is the red phase: defining the specification before any code exists, with the same discipline as writing a failing test.

Once complete, the specification is captured in what I call an **Autonomous Execution Specification (AES)**, a structured machine-consumable document that descends from the conventional PRD but is designed for a different audience and a different executor. Each story is decomposed to touch a small, coherent slice of the codebase, carrying specific implementation guidance about which files and patterns to follow, and acceptance criteria expressed as verifiable assertions rather than vague descriptions. A single story might look like this:

```json
{
  "id": "US-012",
  "title": "Position Aggregation by Book",
  "description": "As the risk engine, I need to aggregate open positions by book so that downstream P&L calculations receive pre-netted exposures.",
  "priority": 2,
  "complexity": "standard",
  "riskLevel": "low",
  "preferredModel": "claude-sonnet-4.6",
  "dependsOn": ["US-010"],
  "notes": "Ensure the method integrates with the existing position lifecycle tracking to avoid cache invalidation issues.",
  "implementationNotes": [
    "Add an aggregate_by_book method to PositionService in src/risk/position_service.py",
    "Group positions by book_id and sum net_quantity",
    "Follow the existing pattern in aggregate_by_counterparty to maintain consistency",
    "Positions with zero net_quantity must be excluded from the result to prevent noise in downstream calculations",
    "Handle the edge case where positions have offsetting legs within the same book"
  ],
  "acceptanceCriteria": [
    "Unit test verifies aggregate_by_book returns a dict keyed by book_id with summed net_quantity",
    "Unit test covers edge case: positions with zero net_quantity are excluded from the result",
    "Unit test covers edge case: multiple books with offsetting legs are aggregated correctly",
    "Unit test covers edge case: empty input returns an empty dict",
    "ruff check passes with no errors",
    "pytest passes with no failures"
  ],
  "passes": false
}
```

Each field serves a specific purpose. The `implementationNotes` array breaks down the technical approach into discrete aspects—which files to touch, which patterns to follow, key design decisions, and gotchas to avoid—rather than as a single narrative. The `acceptanceCriteria` array frames each verifiable assertion, with build and test commands at the end to gate completion. An optional `notes` field provides additional context or warnings for the implementing agent without mixing that guidance into the structured arrays. The rigor came first, during the red phase, which is what makes the downstream execution reliable.

### Autonomous Execution

An autonomous agent then executes the green phase automatically, story by story. For each one, it reads the codebase to understand conventions, generates code that fits the established architecture, runs the build and test suite, and marks the story as passed only when acceptance criteria are satisfied. Once all stories are implemented, an automated code review runs across the entire branch, identifying logic errors, missing edge cases, and architectural mismatches. Issues discovered here feed back into the cycle as new stories, which the agent executes until both acceptance criteria and review findings are addressed.

### Human Review

The refactor phase remains entirely human. You open the diff, read the commits in the context of the specification you wrote, and look for implementation choices that are technically correct but architecturally wrong for your codebase. You refactor what needs it and stay genuinely in touch with the codebase, not as a rubber stamp but as an informed collaborator who understands the requirement and can evaluate whether the execution matches it.

## The Red Phase Remains Central

In traditional TDD, what distinguishes a productive red phase from a rushed one is the time spent interrogating the requirement before any code exists. Writing my AES is the same exercise: answering hard questions about what the user story actually is, what acceptance criteria would verify it is done, and which patterns the codebase already has that should be followed. If you skip that thinking and hand a vague brief to an agent, you get vague code, just as a vague test produces vague software.

The difference from a conventional PRD is not in the questions asked but in the precision required to answer them: a specification read by humans can imply intent and trust interpretation, but one executed by an agent cannot, because there is no one on the other side to fill in the gaps. The thinking that goes into a well-formed AES is where the real intellectual work of the cycle lives, and it is deliberately kept with the human.

## Connection Through Understanding

The obvious benefit of agentic development is throughput. As I explored in the [Welcome to Agentic Development](/agentic-development/2026/04/15/welcome-to-agentic-development.html) post, an agent can reason about a goal and execute a sequence of actions without needing explicit procedural instructions for each step.

Less obvious, and what took me longer to appreciate, is that the cycle keeps you genuinely in the codebase. When you review the agent's output, you are not approving a pull request you half-skimmed, but reading code that implements a specification you worked through in detail before a single function existed. You know what each story was supposed to do, which edge cases were in scope, and what acceptance criteria the implementation was measured against, so when something looks off, you recognize it immediately. The review is not a formality but an informed evaluation, and that is only possible because you still carry the reasoning behind the spec. This is the same dynamic that gives TDD its staying power: the act of writing tests forces understanding before implementation, and that understanding is what makes every subsequent review meaningful rather than cursory.

## Combining the Approaches

The two approaches strengthen each other precisely because they enforce the same discipline at specification time. When writing an AES, you apply the same rigor a TDD practitioner brings to writing tests, framing acceptance criteria as specific, testable behaviors. What does the function return when given empty input? What happens when an edge case occurs? How should the system behave when constraints conflict? These questions distinguish a thorough AES from a vague one, and they are exactly the questions that make tests meaningful rather than ornamental.

You get the throughput benefits of agentic development and the agent's ability to handle scaffolding and boilerplate quickly, while maintaining the upfront thinking that prevents vague code. The human writes the specification in structured form, the agent implements against it, and the human reviews the result with the spec in hand, knowing exactly what was supposed to happen.

## Avoiding Cognitive Debt

### The Risk

Agentic development carries a specific risk worth naming directly: cognitive debt. The failure mode is subtle, because it does not show up in the build or the tests. An agent generates code, the acceptance criteria pass, and the temptation is to skim the diff and move on, treating the output as a black box rather than as a system you genuinely understand. Over time, technical understanding quietly erodes. The team knows the code runs, but not why it was designed that way, and not what breaks when requirements shift. What makes this distinct from technical debt is where it lives: technical debt sits in the code, where it is at least visible and can be measured, but cognitive debt sits in people, in the team's shared understanding of the system, and once it accumulates, the team gradually loses the ability to modify their own codebase with confidence.

### The Prevention

The agentic cycle is explicitly designed to prevent this. The AES phase is where the genuine intellectual work happens: articulating what to build, why, what the constraints are, and what done looks like. The agent handles the mechanical repetition of implementation, but the thinking about how a feature fits into the existing architecture, what the edge cases are, and which patterns belong remains entirely with you, recorded in the specification before a line of code is written.

When the AES is clear and thorough, the subsequent implementation becomes comprehensible because you already understand what it was supposed to achieve. The mandatory human review reinforces this: you do not glance at code and approve it, but read the commits in the context of acceptance criteria you defined. When something looks off, you recognize it because the mismatch between what you specified and what was implemented is now visible. This is how shared understanding persists and how cognitive debt is kept at bay.

## The Shape of the Work

### The Shortcut

There is a tempting shortcut in agentic development: tell an autonomous agent what you want in broad strokes and let it figure out the details. Sometimes this works. More often, you get code that technically compiles but does not quite fit, with the wrong abstraction or a pattern that clashes with the rest of the codebase. And often, you lose track of why certain decisions were made in the first place. The same failure mode exists in TDD when you skip the red phase and write code first, then retrofit tests to match. The tests pass, but they are testing the wrong thing.

### The Discipline

The discipline is the same in both cases. How clearly the specification phase is articulated determines how cleanly the execution phase runs, whether the executor is you, an automated test runner, or an autonomous agent. Shared understanding persists where the reasoning was made explicit before implementation, and where the why behind decisions was recorded rather than left to be inferred from the code later. The agentic cycle has not replaced TDD's core insight but given it a new set of tools to run on, and when combined deliberately, especially in how the red phase is structured, the two approaches reinforce each other in ways that neither achieves alone.

The specification is where you articulate what done looks like, not in broad strokes but with enough specificity that someone, or something, could verify it without asking a follow-up question. Frame acceptance criteria as assertions, not descriptions. When the agent delivers, review the result against what you specified, not just against whether it compiles and the tests pass. The difference between getting throughput without cognitive debt and getting technically correct code that misses the mark often comes down to that one phase: how clearly the requirement was thought through before a line existed.

The [Specification-First Development: The Mental Shift](/agentic-development/2026/04/16/specification-first-development-the-mental-shift.html) post explores this transition in deeper detail, examining both the psychological resistance to shifting from code-first thinking and the structural patterns that help teams maintain specification discipline at scale.
