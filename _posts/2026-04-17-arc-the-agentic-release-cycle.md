---
layout: post
title: "ARC: The Agentic Release Cycle"
date: 2026-04-17 07:00:00 +0000
categories: [agentic-development]
tags: [agentic-development, arc, automation, workflow, TDD]
---

The [Red, Green, Refactor With an AI in the Loop](/agentic-development/2026/04/15/red-green-refactor-with-an-ai-in-the-loop.html) post described a development cycle where a human writes a specification in my format, which I call [Autonomous Execution Specification (AES)](/agentic-development/2026/04/15/red-green-refactor-with-an-ai-in-the-loop.html), an agent implements against it, and a human reviews the result. What that post did not describe in detail is what "autonomous execution" actually looks like in practice, and specifically how you get an AI agent to work through a structured backlog of stories without losing track of intent, accumulating context noise, or silently failing on a story and then building the next one on top of a broken foundation.

That is what my structured cycle, which I call ARC (Agentic Release Cycle), is for.

## The Problems With Unstructured Agent Usage

Using an AI coding agent without structure introduces a set of failure modes that compound quietly rather than loudly. Context rot is one of the more insidious ones: as a conversation with an agent grows longer, earlier parts of the context get compressed or pushed beyond the effective attention window, and the agent begins to forget decisions it made earlier in the session, repeat work, or contradict architectural choices it already committed to. The degradation is a fundamental characteristic of how large language models process long contexts, and it is worth designing around deliberately rather than hoping it will not matter.

### Beyond context rot

An agent working through a multi-story feature without orchestration has no persistent memory of intent across sessions. It knows what files it can see and what you told it in the current prompt, but not what the overall feature was supposed to achieve, which stories were already done, or what architectural constraints were established in earlier sessions. The result is an agent that is technically capable of implementing each story in isolation but has no way to ensure the stories cohere.

### Quality enforcement
Quality enforcement is a third gap. Without something checking the result of each story before the next begins, a failed or partial implementation becomes the foundation for subsequent work, and the errors compound until the feature fails at integration time rather than at the story level where they are cheap to fix.

ARC addresses all of these systematically.

## The Loop

The core of ARC is a structured execution loop that runs locally on the developer's machine, reading from an AES. Each iteration of the loop follows the same sequence: read the AES, identify the highest-priority story whose dependencies have all passed, select the appropriate AI model for that story's complexity and risk level, construct a prompt with full project context injected directly, invoke the Copilot CLI agent, check the result against the story's [acceptance criteria](/agentic-development/2026/04/18/acceptance-criteria-that-actually-work.html), and either mark the story as passed or retry. Once all stories pass, ARC runs an automated code review against the feature branch, then plans and executes a second-pass fix loop to address whatever the review surfaced.

The key word in that sequence is "inject." Rather than letting the agent read files from disk to orient itself, ARC injects the full project operating manual, a `COPILOT.md` file containing the stack, conventions, build instructions, and constraints, and the entire AES directly into every session prompt. The agent always has the complete picture of what the feature is supposed to do, which stories are already done, and what the current story requires, without needing to infer any of it from file reads that might be stale or incomplete. This context injection directly addresses the problem of [agentic development](/agentic-development/) losing track of architectural intent across sessions.

## Context as a First-Class Problem

The context injection is only part of the solution. Before the first story runs, ARC auto-generates two additional files that persist across sessions. The first is `FEATURE_CONTEXT.md`, an at-a-glance map of the entire feature that clusters related stories by keyword, identifies which data model fields are introduced, flags which modules are touched by multiple stories, and lists any explicit constraints from the AES. This gives the agent a structural overview of the feature without reading through every story description in sequence.

The second is `DECISIONS.md`, a decision log with one row per story. As each story is implemented, the agent fills in the architectural decision and its rationale. ARC merges new rows with existing ones on each run, so the decision log accumulates across sessions. An agent in session eight has access to the decisions made in sessions one through seven, not because the full conversation history is still in context, but because the decisions were maintained as a persistent structured record.

### Context Window Management

Context window utilization is also tracked explicitly. When cumulative token usage across a run exceeds eighty percent of the model's context limit, ARC starts a fresh session. The fresh session receives the same injected context as every prior session, so no intent is lost, but the conversation history that has accumulated up to that point is dropped, preventing the gradual degradation that happens when an agent's context fills with its own prior work. The boundary event is logged to a structured progress file, so it is visible in the metrics rather than something that happens invisibly.

## Model Selection as a Quality Signal

One detail I find practically significant is how ARC routes stories to models. The AES carries two fields per story: `complexity` (low, medium, high) and `riskLevel` (low, medium, high, critical). ARC uses these to automatically select a model, routing high-risk or high-complexity stories to a more capable model and trivial stories to a faster and cheaper one. The cost difference is real and accumulates over a large feature, but model selection also functions as a signal embedded in the specification: when you mark a story as high complexity or critical risk during the AES authoring phase, you are making a deliberate judgment that this story requires more careful reasoning, and ARC enforces that judgment at execution time without any additional configuration.

## Completing the Cycle

The connection back to the TDD cycle is explicit in how ARC frames its own operation. The [Red, Green, Refactor](/agentic-development/2026/04/15/red-green-refactor-with-an-ai-in-the-loop.html) phase naming carries through: the Red phase is writing the AES, defining stories, [acceptance criteria](/agentic-development/2026/04/18/acceptance-criteria-that-actually-work.html), implementation notes, complexity, and risk before a line of code exists. The Green phase is ARC running the loop, implementing each story against the specification. The Refactor phase is the automated code review followed by the fix loop, and then human review of the final diff. All three phases run in sequence without manual handoff once the AES is written.

What this means in practice is that the discipline invested in the Red phase, the same discipline that the [Specification-First Development](/agentic-development/2026/04/16/specification-first-development-the-mental-shift.html) post explores in detail and that the [Red, Green, Refactor With an AI in the Loop](/agentic-development/2026/04/15/red-green-refactor-with-an-ai-in-the-loop.html) post argues is the central intellectual work of [agentic development](/agentic-development/), is what determines whether ARC can execute well. A vague AES produces a vague feature because ARC has nothing precise to enforce against. A precise AES with specific [acceptance criteria](/agentic-development/2026/04/18/acceptance-criteria-that-actually-work.html), clear implementation guidance, and thoughtful risk and complexity annotations gives ARC the structure it needs to route correctly, inject meaningfully, and verify cleanly.

The automated Refactor phase adds something that pure TDD does not have by default: the code review runs after all stories pass but before the human reviews the branch, surfacing logic errors, missing edge cases, and architectural mismatches as new stories rather than as comments for the developer to act on manually. The review findings become the next wave of Red-phase specification, and ARC executes them the same way it executed the original feature.

Where this becomes tangible: the combination of structured context injection, persistent decision logging, context window management, and quality gates between stories means the final diff the human reviews was produced by an agent that always knew what it was supposed to build, always had the same project context in every session, and always had its output verified before the next story began. The quality of that verification depends entirely on the [acceptance criteria](/agentic-development/2026/04/18/acceptance-criteria-that-actually-work.html) in the AES, which is why the discipline of writing criteria that are specific enough to verify without interpretation matters as much as the execution machinery itself.
