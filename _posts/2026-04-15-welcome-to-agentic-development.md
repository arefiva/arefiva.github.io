---
layout: post
title: "Welcome to Agentic Development"
date: 2026-04-15 08:00:00 +0000
categories: [agentic-development]
tags: [intro, agents, AI]
---

Welcome to the **Agentic Development** section of this blog. This is where I explore building software systems that use AI agents to reason about problems, make decisions, and take action with significant autonomy. These systems represent a meaningful shift in how we think about delegating work and structuring software itself, going well beyond orchestration layers or workflow runners that execute predetermined sequences.

## What is Agentic Development?

Agentic development is the practice of designing and building software where AI agents operate as active participants in accomplishing tasks, reasoning through goals rather than following fixed scripts. What distinguishes this from traditional automation is the degree of reasoning involved. Traditional automation follows a predefined sequence: if condition A, then execute step B, then execute step C. Agentic systems, by contrast, receive a goal or a problem description and reason about which actions to take, in what order, based on what they observe and the feedback they receive along the way. An agent operates by perceiving its environment, reasoning about possible actions, executing them, observing the results, and adjusting its approach based on what it learns. This means the agent can:

- **Reason about goals** and decompose them into a sequence of actions rather than following a rigid predetermined path
- **Use tools** such as search, code execution, APIs, and file systems to gather information, take action, and observe the results
- **Adapt its approach** based on what it discovers at each step, adjusting its strategy or trying alternative paths when an approach does not yield the expected results
- **Collaborate** with other agents or with humans, asking for clarification when needed and incorporating feedback into its reasoning

## How an Agent Works in Practice

Consider a code review task. You provide the agent with a high-level instruction such as "Review src/auth.py for potential bugs and architectural issues" along with tools it can use: the ability to read files, run tests, execute commands, and query the codebase. The agent then reasons about how to accomplish this. It might start by reading the file to understand what the code does, then run the existing test suite to see what behaviors are currently verified, then run static analysis tools to check for obvious issues, and finally synthesize a review based on all of this information. At no point did you specify the exact sequence of steps, the order in which to run the tools, or what decision to make when one tool's output contradicts another. The agent made those decisions by reasoning about the goal and the results of each action. This is fundamentally different from a script that says "always read the file first, then always run tests, then always check style." The agent's sequence emerges from its reasoning about what information is needed to accomplish the goal.

## The Shift in How We Specify Work

There is a fundamental difference between building traditional software and building agentic systems, and it lies in how we specify what needs to be done. Traditional software development requires developers to write imperative code: this happens first, then that happens, then check this condition, and if true then do that. Every decision point, every fallback path, every sequence must be written out explicitly. The software is a series of instructions for a computer to follow. Agentic systems change this dynamic. Instead of specifying the how, you specify the what and the why. You describe the goal, the constraints, the tools available, and what success looks like. The agent then reasons about how to achieve it.

This shift reflects a genuinely different way of thinking about problem-solving. When you write imperative code, you must anticipate all possible paths through a system. When you specify a goal for an agent, you articulate what you want to happen and trust the agent's reasoning to find a path. This requires a different discipline in how we think about software design:

- **Goals and constraints** must be clear enough that an autonomous reasoner can understand what success looks like without needing to ask a follow-up question
- **The tools and capabilities** available to the agent must be well-designed so that the agent can effectively gather information and take meaningful action
- **Feedback mechanisms** must be explicit so that the agent can recognize when it has gone off track and correct itself

These three elements form the foundation of agentic systems. When they are well-designed, an agent can accomplish complex tasks. When they are poorly specified, the agent produces technically correct output that misses the point.

## What's Next

In the posts that follow, I plan to explore specific patterns and disciplines for building agentic systems effectively. Some posts will examine agent architectures and the tradeoffs between single-agent and multi-agent systems. Others will focus on tool design: how to create tools that agents can use reliably to gather information and take action. I will also cover evaluation and testing, since traditional testing approaches do not translate directly to systems where the agent's path is not predetermined. And throughout, I will share case studies drawn from real work that show how these patterns play out in practice and where the discipline matters most.

I am still learning this space myself. The patterns are emerging, and there is much I do not yet understand about what works reliably and where the boundaries of the approach lie. I remain genuinely open to different approaches and to being wrong about what I think I know.

---

*This blog is built with [Jekyll](https://jekyllrb.com) and hosted on GitHub Pages.*
