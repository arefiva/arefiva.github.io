---
layout: post
title: "Reading the METR Productivity Study"
date: 2026-04-23 08:00:00 +0000
categories: [agentic-development]
tags: [ai-tools, productivity, research]
---

The METR paper published in July 2025 has been making rounds, and the version of it that travels through comment sections and social media is fairly consistent: AI slows experienced developers down. Sixteen developers. Two hundred and forty-six tasks. Tasks took 19% longer when AI tools were allowed. The numbers are real. The interpretation that tends to follow them is not.

What the study actually measured is considerably more specific, and the authors are careful to say so throughout the paper. The developers in this study are not a representative cross-section of software engineers. They are active, long-term contributors to large, mature open-source repositories, with an average of five years of experience on the specific codebases they worked on during the experiment. The repositories themselves averaged over a million lines of code, ten years of history, and the kind of accumulated conventions and unwritten rules that exist in systems built over a long time by many different people. These are not greenfield projects where an AI can scaffold structure from scratch. These are deeply evolved systems where the relevant context is distributed across years of decisions, and where the developers carry knowledge that is genuinely difficult to express in a prompt.

The participants also had moderate AI experience, not deep fluency. Nearly all of them had used web-based LLMs before, but only 44% had used Cursor, which was the primary tool in AI-allowed conditions. Developers received basic Cursor training before the experiment, covering how to prompt, accept, and revert changes in agent mode. That is enough to be functional, but there is a meaningful gap between being functional with a tool and having built genuine fluency with it for a specific kind of work.

## What the learning curve data hints at

The paper includes a figure that plots estimated speedup against buckets of total Cursor experience, combining prior experience with time accumulated during the study itself. Across the first ten, thirty, and fifty hours of use, the slowdown persists. Past fifty hours, the data suggested positive speedup, around 25%. The authors are explicit that this analysis is underpowered and cannot support strong conclusions. A footnote added after publication complicates the picture further: a second developer clarified that they had in fact accumulated more than 100 hours of Cursor experience before the study began, which they had underreported. That developer showed slowdown on AI-allowed issues, and including them in the over-50-hours bucket moves the point estimate from roughly 25% speedup to roughly 0%.

So the signal is weak, the sample is small, and the honest read is that there is not enough data here to draw conclusions either way about what happens past a certain threshold of tool experience. The direction is interesting, but the paper itself does not lean on it.

What the figure does point at, even tentatively, is a question worth holding: how much of the observed slowdown is a function of this specific setting, and how much might be a function of where these developers were on the learning curve for this particular way of working?

The analogy I keep returning to is a craftsperson who has spent years developing deep intuition with one set of tools, who is then handed a more capable instrument and expected to immediately produce better results. An experienced carpenter who has built real fluency with hand tools, who knows exactly how much pressure to apply, how each saw behaves through different grains, how to set up and move through a job efficiently, is not going to be more productive with a miter saw on the first morning. The miter saw is objectively more capable for many of the same tasks. But the knowledge of how to use it efficiently, how to set angles quickly, how to avoid the failure modes specific to that tool, how to integrate it into an existing workflow, that knowledge is not free. It builds through accumulated use.

The knowledge of how to work effectively with AI assistants on complex, highly contextual codebases follows a similar pattern. Knowing how to give useful context, how to break down a task so an agent can contribute meaningfully, how to recognize quickly when generated output is drifting in the wrong direction, how to prompt for the kind of work that has high accumulated context behind it, none of that is obvious on day one. It develops with practice on real problems. The thirty-minute onboarding session the study provided covered the mechanics of Cursor. It did not cover the rest.

## What the authors themselves say

The paper includes a section explicitly listing what its results do not demonstrate, which is worth reading alongside the headline number. The authors state directly: "The slowdown we observe does not imply that current AI tools do not often improve developer's productivity." They specifically note that high developer familiarity with repositories, and the size and maturity of those repositories, both contribute to the slowdown they observed, and that these factors do not apply in many software development settings. Their own interpretation is that results are consistent with smaller projects or development in less familiar codebases seeing substantial speedup. They also note that developers with significantly more AI tool experience may see different results, and that future models may change the picture in this exact setting.

The study is a careful piece of work. It acknowledges its own scope, quantifies the factors that likely contributed to the observed result, and actively warns against overgeneralizing. The combination they measured is specific: experienced maintainers deeply familiar with large, mature repositories, using AI tools at the early-2025 frontier, with moderate experience in those particular tools. That combination is, notably, also the one where the AI has the least relative advantage, because the developer is already operating near the ceiling of their domain knowledge and the AI lacks access to the contextual understanding that took years to accumulate.

The study ran from February to June 2025 on Claude 3.5 and 3.7 Sonnet. The step-change in model capability that developers actually started noticing in their day-to-day work came later that year, when Sonnet 4.5 and later Opus 4.5 were released. The models cited as the reason AI doesn't work are no longer the current baseline. The paper is being used to argue against tools that, in their current form, are fundamentally different from what was measured.

The 19% headline carries further than the paper does. The authors' own framing is considerably more conditional, and reading through their factor analysis and explicit caveats makes that clear.
