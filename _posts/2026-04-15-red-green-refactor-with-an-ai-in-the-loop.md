---
layout: post
title: "Red, Green, Refactor With an AI in the Loop"
date: 2026-04-15 09:00:00 +0000
categories: [agentic-development]
tags: [TDD, agentic-development, workflow, specification]
---

Test-Driven Development rests on a deceptively simple mantra: Red goes to Green goes to Refactor. Write a failing test, make it pass, then clean it up. Repeat. What makes TDD powerful is not the tests themselves, but the discipline the cycle enforces. The red phase forces you to understand what you are building before you build it, because you cannot write a failing test for something you have not thought through. That clarity shapes how quickly and smoothly the green and refactor phases unfold. The green phase follows: write the minimum code to make the test pass, because the test is the specification. Then refactor, using a passing suite as a safety net to clean up the implementation while locking behavior in place. Do this across a career, and you end up with a codebase that is both well-tested and well-understood, because every piece was thought through before it existed.

I have been building software with an agentic workflow for a while now, and I keep noticing something significant: the workflow follows the same cycle, just with different tools and a different executor.

## The Agentic Cycle

The core of this approach is a new kind of specification, one designed from the ground up to drive autonomous execution rather than to communicate requirements to a human reader, and that distinction shapes everything about how it is written. The rigor it demands is borrowed from TDD: before a single line of code is written, the specification must answer the same questions a practitioner asks when writing a test, such as what specific behavior must happen, what edge cases matter, what state changes are observable, and what verification would prove this is complete.

When starting a feature, you move through a structured conversation in plan mode, describing the feature, the user stories that compose it, and the acceptance criteria that would verify each story is done. This conversation forces you to articulate not just what to build, but what done looks like. This is the red phase: defining the specification before any code exists, with the same discipline as writing a failing test. Once complete, the specification is converted into a structured JSON format the agent directly consumes: each story decomposed to touch a small, coherent slice of the codebase, carrying specific implementation guidance about which files and patterns to follow, and acceptance criteria expressed as verifiable assertions rather than descriptions of desired outcomes. The rigor came first, during the red phase, which is what makes the downstream execution reliable.

An autonomous agent then executes the green phase automatically, story by story. For each one, it reads the codebase to understand conventions, generates code that fits the established architecture, runs the build and test suite, and marks the story as passed only when acceptance criteria are satisfied. Once all stories are implemented, an automated code review runs across the entire branch, identifying logic errors, missing edge cases, and architectural mismatches. Issues discovered here feed back into the cycle as new stories, which the agent executes until both acceptance criteria and review findings are addressed.

The refactor phase remains entirely human. You open the diff, read the commits in the context of the specification you wrote, and look for implementation choices that are technically correct but architecturally wrong for your codebase. You refactor what needs it and stay genuinely in touch with the codebase, not as a rubber stamp but as an informed collaborator who understands the requirement and can evaluate whether the execution matches it.

## The Red Phase Remains Central

In traditional TDD, what distinguishes a productive red phase from a rushed one is the time spent interrogating the requirement before any code exists. Writing a PRD is the same exercise: answering hard questions about what the user story actually is, what acceptance criteria would verify it is done, and which patterns the codebase already has that should be followed. If you skip that thinking and hand a vague brief to an agent, you get vague code, just as a vague test produces vague software. The difference from a conventional PRD is not in the questions asked but in the precision required to answer them: a specification read by humans can imply intent and trust interpretation, but one executed by an agent cannot, because there is no one on the other side to fill in the gaps.

The red phase is also the intellectually richest part of the agentic cycle. The agent handles the repetitive mechanics of implementation, but the thinking about what to build, how it fits, and what the edges are remains with you, encoded in a specification that represents the real work of the development cycle.

## Connection Through Understanding

The obvious benefit of agentic development is throughput. Less obvious, and what took me longer to appreciate, is that the cycle keeps you genuinely in the codebase. When you review the agent's output, you are not approving a pull request you half-skimmed, but reading code that implements a spec you wrote. You know what it was supposed to do and understand the acceptance criteria it passed, so when something looks off, you recognize it immediately, not because you wrote the code, but because you wrote the test. This is exactly how TDD works: the PRD serves as the test, writing it is the act of understanding, and human review becomes possible and valuable because of the clarity that the PRD phase forces.

## Combining the Approaches

The two approaches strengthen each other, and the red phase is where the combination matters most. When writing a PRD, you can apply the same rigor a TDD practitioner would bring to writing tests, framing acceptance criteria as specific, testable behaviors. What does the function return when given an empty list? What state changes when the user clicks the button? What error message appears when input is invalid? These questions distinguish a thorough PRD from a vague one, and they are precisely the questions that TDD practitioners are trained to ask.

In this combination, the red phase becomes a form of collaborative test-writing, where the agent executes those implicit tests during the green phase. You get the throughput benefits of agentic development and the agent's ability to handle scaffolding and boilerplate quickly, while maintaining the upfront thinking that prevents vague code. The human writes the test-like specification in structured form, the agent implements against it, and the human reviews the result with the spec in hand, knowing exactly what was supposed to happen.

## Avoiding Cognitive Debt

There is a well-articulated concern about agentic development that deserves attention: the risk of cognitive debt. When an agent generates code, there is a real danger of cognitive surrender, where you glance at the output, see that it works, and move on without building genuine understanding of what the system actually does. Over time, technical understanding degrades. The team knows the code runs, but not why it was designed that way. This is cognitive debt, and it is distinct from technical debt because it lives in people, not in code. Once it accumulates, small changes start breaking things in unexpected places, and the team realizes they are afraid to modify their own system.

The agentic cycle is explicitly designed to prevent this, and the PRD phase is central to why: it is where you articulate what to build, why, what the constraints are, and what done looks like. When the PRD is clear and thorough, the subsequent implementation becomes comprehensible because you already understand what it was supposed to achieve. The mandatory human review reinforces this: you do not glance at code and approve it, but read the commits in the context of acceptance criteria you defined. When something looks off, you recognize it because the mismatch between what you specified and what was implemented is now visible. This is how shared understanding persists and how cognitive debt is kept at bay.

## The Shape of the Work

There is a tempting shortcut in agentic development: tell an autonomous agent what you want in broad strokes and let it figure out the details. Sometimes this works. More often, you get code that technically compiles but does not quite fit, with the wrong abstraction or a pattern that clashes with the rest of the codebase. And often, you lose track of why certain decisions were made in the first place. The same failure mode exists in TDD when you skip the red phase and write code first, then retrofit tests to match. The tests pass, but they are testing the wrong thing.

The discipline is the same in both cases. Slow down at the specification phase, because the more clearly you can express what you need in a test or in acceptance criteria, the better the execution phase goes, whether the executor is you, an automated test runner, or an autonomous agent. Treat understanding as something you deliberately build, not something that just happens, and write down the why when decisions are made so that shared understanding persists. The agentic cycle has not replaced TDD's core insight but given it a new set of tools to run on, and when combined deliberately, especially in how the red phase is structured, the two approaches reinforce each other in ways that neither achieves alone.
