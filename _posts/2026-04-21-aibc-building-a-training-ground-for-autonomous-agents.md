---
layout: post
title: "AIBC: Building a Training Ground for Autonomous Agents"
date: 2026-04-21 06:00:00 +0000
categories: [agentic-development]
tags: [agentic-development, benchmarking, agents, skills, self-improvement]
---

The posts in this series have explored how to work effectively with an autonomous agent: writing specifications with enough precision that the agent has something real to execute against, structuring the execution loop so context does not rot across sessions, and crafting acceptance criteria that are verifiable rather than aspirational. Underneath all of that sits a question that those posts leave largely unanswered: how do you know if the agent is actually getting better over time?

Throughput is one answer, but it is incomplete. An agent that delivers more code per session is not necessarily delivering better code, and an agent that passes all its [acceptance criteria](/agentic-development/2026/04/18/acceptance-criteria-that-actually-work.html) is not necessarily finding the most efficient path through them. I have been thinking about this for a while, and found myself drawn toward the framing that reinforcement learning uses to approach the same question: give the agent an environment, a reward signal, and enough repeated episodes to learn from, and the policy improves. I've created something I call AI Boot Camp (AIBC), and it is built on that premise: give an agent a fixed set of real-world engineering challenges, measure how it performs across multiple dimensions of quality and efficiency, and make the results repeatable enough to be useful for comparison.

## Borrowing from Reinforcement Learning

Reinforcement learning (RL) offers a clean framework for thinking about iterative improvement. An agent interacts with an environment, receives a reward signal after each episode, and updates its policy based on what worked and what did not. In AIBC, the mapping is reasonably direct. The environment is the set of fixed challenges, each defined by my framework called [Autonomous Execution Specification (AES)](/agentic-development/2026/04/15/red-green-refactor-with-an-ai-in-the-loop.html) and isolated Testcontainer infrastructure. The agent is my structured release cycle, which I call [ARC (Agentic Release Cycle)](/agentic-development/2026/04/17/arc-the-agentic-release-cycle.html), together with the underlying language model it orchestrates. Each episode is a single challenge run: ARC starts with the challenge specification, acts through a sequence of tool calls and code writes, and terminates when all [acceptance tests](/agentic-development/2026/04/18/acceptance-criteria-that-actually-work.html) pass or the run ends. The reward signal is the composite score computed across the six dimensions. The policy, in the RL sense, is ARC's orchestration logic: how it routes stories, constructs prompts, manages context, and decides when to reuse an existing skill versus derive a solution from scratch.

The hermetic infrastructure is what makes this viable as a training loop. A reward signal is only useful if the same behavior produces the same score across runs, which requires the environment to behave consistently. Without reproducibility, you cannot tell whether a score changed because the policy improved or because the environment shifted under it.

## The AES as a Challenge Specification

Readers of this series will recognise the format at the center of AIBC. Each challenge is defined by the AES, the same structured machine-consumable document that the [Red, Green, Refactor](/agentic-development/2026/04/15/red-green-refactor-with-an-ai-in-the-loop.html) post introduced as the Red phase of agentic development. The agent reads the AES, understands what must be implemented, what infrastructure is available, and what the [acceptance criteria](/agentic-development/2026/04/18/acceptance-criteria-that-actually-work.html) are, then executes autonomously.

In AIBC, the AES serves as a fixed contract rather than a starting point for conversation about what to build. The challenge ships with a pre-defined AES at the repository root, the acceptance tests are already written, and the agent is evaluated on how well it satisfies them. There is no authoring phase, no refinement, no back and forth. The agent gets the spec and executes.

This mirrors the [Specification-First Development](/agentic-development/2026/04/16/specification-first-development-the-mental-shift.html) approach where a complete specification exists before execution begins, except in AIBC the specification is fixed before the agent even starts, and the agent cannot change it.

## Real Infrastructure, Hermetic Runs

Each challenge spins up isolated Testcontainers: a PostgreSQL instance pre-seeded with domain data, a REST API exposing that data over HTTP, and a NATS stream for event-driven workflows. The agent must interact with all three to satisfy the acceptance criteria. When the run completes, the containers are torn down. The next run starts from a clean state.

The infrastructure matters because it makes the challenge real rather than synthetic. An agent implementing a feature against a live database behaves differently than one generating code that is never exercised against actual services. The failure modes that appear when a query hits a seeded database with real data or when a NATS consumer misses an event are exactly the kinds of failures that matter in real-world development. A benchmark that does not surface those is not measuring what it claims to measure.

The Testcontainer approach also keeps runs hermetic. All services are deterministic and defined by the challenge spec. Scores are not contaminated by state left over from a previous run, and challenges can be reproduced exactly on any machine, which is a necessary condition for results to be comparable across agents or across time.

## What Gets Measured: The Reward Signal

In RL terms, the composite score is the reward signal. A single pass/fail metric would carry very little information about which behaviors to reinforce and which to discourage. The six dimensions decompose the reward into interpretable components, so that a run with a poor score is analyzable: was it token-heavy, thrashing through redundant tool calls, or failing tests on the first attempt? Each dimension answers a different question about why the episode went the way it did.

AIBC scores agents across six dimensions.

**Token efficiency** measures the total tokens consumed across all LLM calls. The working assumption is that fewer tokens, all else equal, indicates a more purposeful agent that is reading what it needs rather than generating its way toward clarity.

**Code conciseness** measures lines of production code written. This is a proxy for unnecessary complexity rather than a precise quality signal on its own, because line count varies by language and challenge shape. But across challenges, a consistent pattern of writing more code than the acceptance criteria require tends to correlate with an agent that reached for a brute-force solution rather than understanding what the problem actually needed.

**Skill usage** measures how effectively the agent discovers and applies existing skills rather than solving problems it already knows how to solve. This is a proxy for memory across challenges: did the agent learn anything from the last run? The metric is scored based on whether a relevant skill was available and whether the agent found and applied it, or whether it instead re-derived a solution from scratch.

**MCP server usage** measures the quality and relevance of calls to Model Context Protocol (MCP) servers, particularly the documentation server, context7. An agent that reads documentation before writing code for an unfamiliar library is more likely to produce a correct implementation on the first attempt than one that guesses. The scoring here is heuristic, tracking whether calls were relevant to the problem at hand rather than counting raw call volume.

**Tool usage** measures the ratio of meaningful tool calls to total tool calls. Thrashing, where the agent calls the same tool repeatedly without incorporating what it learned, is penalised. So is redundancy: reading a file three times when once was enough. The practical scoring rule treats a repeated unchanged read or a retry of a failed call with identical parameters as noise rather than signal.

**Test pass rate** measures the percentage of acceptance tests that pass on the agent's first submission. Not after correction cycles, not after the agent notices a failure and retries. The first attempt.

These six dimensions produce a composite score as a weighted sum, with weights configurable per challenge to reflect what that particular challenge is testing most directly.

## The Skill Loop: Exploration and Exploitation

The most interesting part of AIBC, at least to me, is the mechanism for self-improvement, and it maps directly onto a familiar RL tension: exploration versus exploitation.

An agent working through AIBC is expected to do more than complete each challenge. It is expected to build reusable skills as it works, capturing repeatable workflows, whether that is seeding a database, spinning up a Testcontainer, publishing a NATS event, or following a particular API pattern, into skill files that future runs can discover and apply.

The loop works like this: at the start of each challenge, the agent searches for skills matching the technology stack. If a relevant skill exists, it installs and uses it. If no skill exists and the agent solves a non-trivial problem, it creates the skill. Skills are committed to the repository under `.github/skills/`, which means every subsequent run benefits from what was discovered earlier. Reusing an existing skill is exploitation: applying a known solution to a known class of problem. Creating a new skill is exploration: deriving a solution that does not yet exist and recording it for future use. The skill usage score rewards the agent for knowing when to exploit and penalises it for unnecessary exploration, re-solving problems it already knows how to solve.

The skill creation is scored via the skill usage metric: an agent that creates a useful skill earns credit for every future run that benefits from it. This creates an incentive structure that extends beyond any single challenge, which is an unusual property for a benchmark to have.

It also introduces a distinction worth being explicit about. There are two modes in which AIBC can be used. The first is a frozen benchmark mode, where the skill repository is pinned to a fixed state before each run. Scores produced in this mode are directly comparable across agents and across time, because every agent starts from the same knowledge base. The second is a cumulative training mode, where skills accumulate across runs and later agents benefit from earlier ones. This mode does not produce comparable scores, but it does produce something more interesting: a trajectory. The question it answers is not "how does agent A compare to agent B against a fixed standard," but "how does agent A improve as it accumulates experience?" Both modes are useful, and they are asking different questions.

Skills in AIBC are managed through the `npx skills` CLI, which provides commands to search for existing skills, install them from other repositories, scaffold new ones, and keep them up to date. The agent is expected to use this tooling rather than managing skill files directly, because the tooling is part of the ecosystem the benchmark is measuring competence in.

## What the Scoring Optimises For

The composite score is designed to reward a specific kind of agent intelligence, one that the [Acceptance Criteria That Actually Work](/agentic-development/2026/04/18/acceptance-criteria-that-actually-work.html) post gestures toward when it observes that a well-specified criterion removes ambiguity the agent would otherwise have to guess about.

An agent that finds the right skill, reads the relevant documentation from context7 before writing code, writes a concise and correct implementation, and passes all tests on the first attempt will always outscore an agent that produces the same passing tests through extended iteration, redundant tool calls, and a much larger code footprint. The first agent demonstrated comprehension of the problem before acting. The second demonstrated persistence after acting.

The same gating principle showed up in work I did during my master thesis designing a model that explored how Gated Linear Units (GLU) could act as selective mechanisms within it[^1]. The gate evaluates each input: if it contributes positively to the optimization goal, it flows through largely unchanged; if it contributes negatively, the gate suppresses it. The composite scoring system in AIBC operates on the same intuition. Behaviors that contribute positively to the score are reinforced as the policy is updated across runs; behaviors that contribute negatively are suppressed. The gating principle, that a well-designed selective mechanism discriminates between useful and harmful inputs before they compound, captures something important about why decomposed scoring produces a clearer improvement signal than a single pass/fail metric.

When working on actual codebases, the first kind of agent is cheaper, faster, and less likely to introduce noise. A benchmark that does not distinguish between them is not measuring what matters.

## Where This Sits in the Larger Picture

AIBC is, in one sense, the natural complement to [ARC](/agentic-development/2026/04/17/arc-the-agentic-release-cycle.html). ARC is a developer-side workflow tool: a developer writes an AES, invokes ARC locally, and ARC orchestrates the agent through each story, manages context, enforces quality gates between stories, and hands a finished branch back for human review. AIBC is the evaluation counterpart: fixed challenges, scoring dimensions, skill accumulation, and a leaderboard that makes improvement visible over time.

The relationship between them runs in both directions. AIBC is designed to exercise ARC under controlled, repeatable conditions, producing scores that reveal where ARC's orchestration is working well and where it is not. But the feedback loop extends beyond tuning prompts and building skills. The benchmark is also a testing ground for ARC as a piece of software. If the scores consistently show thrashing in a specific kind of challenge, that may point to a missing feature in how ARC constructs its prompts or manages context window boundaries. If the first-attempt test pass rate is low across a class of challenges, it may reveal a bug in how ARC verifies acceptance criteria before marking a story as passed. Skills and MCP server usage are part of what AIBC measures, but they sit alongside ARC's own orchestration logic as targets for improvement. A run that goes poorly is as likely to surface a gap in ARC itself as a gap in the agent's behavior.

I am still in the early stages of building this, and there is a great deal I expect to revise once the first challenges are actually running. The scoring weights feel reasonable in theory but will almost certainly need adjustment once the composite scores are producing results that conflict with what the individual dimension scores suggest. The infrastructure approach using Testcontainers makes the runs hermetic in a way I find genuinely useful, but it introduces setup complexity that I do not yet fully understand the limits of. And the skill loop depends on the agent creating skills that are actually general enough to benefit future runs, which is a non-trivial constraint that the first few runs will test quickly.

What I expect to learn, and what I will write about as this develops, is whether the benchmark is measuring the right things and whether the improvement signal it produces is strong enough to drive meaningful iteration on both the agent's behavior and ARC's own implementation.

[^1]: J. F. Jønler, F. Brunø Lottrup, B. Berg, D. Zhang and K. Chen, "Probabilistic Forecasts of Global Horizontal Irradiance for Solar Systems," in IEEE Sensors Letters, vol. 7, no. 1, pp. 1-4, Jan. 2023, Art no. 7000104, doi: 10.1109/LSENS.2022.3228783. [Full paper available on IEEE Xplore](https://ieeexplore.ieee.org/document/9983507).
