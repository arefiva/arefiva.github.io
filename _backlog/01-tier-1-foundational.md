# Tier 1: Foundational Posts

These posts establish core concepts and mental models. They have no dependencies and form the foundation for all downstream posts.

---

## 1. Specification-First Development: The Mental Shift

**ID:** `blog-spec-first`  
**Status:** Published  
**Tier:** 1 (Foundational)  
**Dependencies:** None  
**Post Type:** Conceptual + Case Study  
**Referenced in original post:** Section "The Red Phase Remains Central", "Combining the Approaches"  
**LinkedIn post:** `li-spec-first` (`communication/LinkedIn/_backlog/li-spec-first.md`)

### Overview

A dedicated post on why shifting from code-first to spec-first thinking is harder than it looks, and why it matters. This explores the discipline required to slow down at specification time and what benefits emerge from that investment.

### Key Topics

- **The Code-First Reflex**: Why developers naturally want to start coding, and what that costs
- **The Cognitive Load of Specification**: Why writing specs feels slower, even though it saves time overall
- **Specification as Thinking**: How writing things down changes what you think
- **The Tempting Shortcut**: Why "just tell an agent what you want" fails, and its parallel in TDD (skipping the red phase)
- **Building and Sustaining Discipline**: Practical ways to enforce spec-first discipline in a team
- **When Spec-First Wins**: Real examples where upfront clarity prevented downstream problems

### Notes

- This is prerequisite mental framing for all other posts
- Tie heavily to the original post's framing: "before a single line of code is written"
- Include a case study showing both paths (spec-first vs. shortcut) on the same feature
- This post should feel like persuasion, not prescription—help readers *want* to do this

### Related Posts

Feeds into:
- `blog-aes-guide` (how to actually write specs)
- `blog-patterns` (specs require understanding existing patterns)
- `blog-code-review` (specs enable meaningful review)
- `blog-collaboration` (specs are the contract between human and agent)
- `blog-scaffolding` (specs let agents handle repetitive work)

---

## 2. Test-Driven Development for Teams

**ID:** `blog-tdd-intro`  
**Status:** Pending  
**Tier:** 1 (Foundational)  
**Dependencies:** None  
**Post Type:** Conceptual + Practical How-To  
**Referenced in original post:** Opening section, "Combining the Approaches"  
**LinkedIn post:** `li-tdd-intro` (`communication/LinkedIn/_backlog/li-tdd-intro.md`)

### Overview

A comprehensive introduction to TDD for teams new to the concept or skeptical about its value. This post explains the Red-Green-Refactor cycle, demystifies TDD, addresses common misconceptions, and makes clear when TDD is (and isn't) the right approach.

### Key Topics

- **The Red-Green-Refactor Cycle Explained**: Step-by-step walkthrough with concrete example
- **Why TDD Forces Better Design**: How writing tests first changes architecture decisions
- **The Discipline of the Red Phase**: Why forcing yourself to fail first matters
- **Common TDD Misconceptions**: 100% coverage, tests as documentation, slowness, testing implementation details
- **When NOT to Use TDD**: Edge cases where traditional testing is better
- **Starting a TDD Practice**: Practical barriers and how to overcome them
- **The Staying Power of TDD**: Why teams that adopt it rarely abandon it

### Notes

- Assume reader has heard of TDD but may not have practiced it deeply
- Use simple examples (not finance domain) to keep focus on the pattern, not the problem
- Make the connection explicit: the agentic cycle does the same thing, just with a different executor
- Address the fear: "TDD will slow me down" (it won't, once practiced)

### Related Posts

Referenced by:
- `blog-code-review` (how agentic review parallels code review in TDD)

---

## 3. Acceptance Criteria That Actually Work

**ID:** `blog-acceptance-criteria`  
**Status:** Published  
**Tier:** 1 (Foundational)  
**Dependencies:** None  
**Post Type:** Practical How-To  
**Referenced in original post:** Section "Writing the Specification", the JSON example with specific assertions  
**LinkedIn post:** `li-acceptance-criteria` (`communication/LinkedIn/_backlog/li-acceptance-criteria.md`)

### Overview

Deep dive into writing acceptance criteria that are testable, specific, and verifiable—applicable both to human reviewers and automated agents. This post is about moving from vague descriptions to assertions.

### Key Topics

- **Criteria as Assertions, Not Stories**: "should be fast" vs. "returns in <100ms"
- **The Specificity Spectrum**: Examples ranging from useless to actionable
- **Edge Cases and Boundary Conditions**: How good criteria expose edge cases before coding
- **Criteria Written for Agents**: What specificity level agents require vs. what humans can interpolate
- **The Executable Specification**: How acceptance criteria become your test suite
- **Anti-Patterns**: Acceptance criteria that sound good but fail verification
- **From Criteria to Code**: How developers actually implement against specific criteria

### Notes

- Use the JSON AES example from the original post as a reference
- Provide 3-5 worked examples showing before/after (bad criteria → good criteria)
- This is a practical skill-building post, not philosophy
- Consider showing SQL examples or test-like structures

### Related Posts

Required by:
- `blog-aes-guide` (AES is made of good acceptance criteria)

---

## 4. Cognitive Debt vs. Technical Debt: Why the Distinction Matters

**ID:** `blog-cog-debt`  
**Status:** Pending  
**Tier:** 1 (Foundational)  
**Dependencies:** None  
**Post Type:** Conceptual + Case Study  
**Referenced in original post:** Section "Avoiding Cognitive Debt"  
**LinkedIn post:** `li-cog-debt` (`communication/LinkedIn/_backlog/li-cog-debt.md`)

### Overview

Full exploration of cognitive debt as distinct from technical debt, why it's a greater threat in agentic workflows, and practical strategies for preventing it. This is the original post's core contribution around risk management.

### Key Topics

- **Defining Cognitive Debt**: The erosion of shared understanding that lives in people, not code
- **Why It's Different from Technical Debt**: Technical debt is visible and measurable; cognitive debt is silent
- **How Cognitive Debt Forms**: The "black box" acceptance of agent output, skipped thinking, documentation erosion
- **Symptoms of Cognitive Debt**: Teams that can't modify their own code with confidence, architectural decisions that feel arbitrary
- **The Cost Over Time**: Compounding effects on velocity, risk of major rewrites, junior engineer onboarding
- **Technical Debt vs. Cognitive Debt**: A team with high technical debt but clear understanding can still move; a team with cognitive debt is stuck
- **Prevention Strategies**: The spec-first approach as explicit cognitive debt prevention
- **Measuring Cognitive Debt**: What signals to watch for in code reviews and team dynamics

### Notes

- This post articulates the central risk of agentic development
- Make the stakes clear: this is about team capability and longevity
- Provide a case study: what happens when cognitive debt accumulates in a real project
- Frame the AES/spec-first approach as the explicit countermeasure
- Distinguish from "just write good documentation" (insufficient)

### Related Posts

Connects to:
- `blog-code-review` (mandatory human review prevents cognitive debt)
- `blog-collaboration` (staying connected prevents cognitive debt)

---

## Tier 1 Summary

These four posts establish why the mental shift to spec-first thinking is essential:
1. **Why it matters** (`blog-spec-first`)
2. **Where it comes from** (`blog-tdd-intro`)
3. **How to do it well** (`blog-acceptance-criteria`)
4. **What happens if you don't** (`blog-cog-debt`)

All downstream posts build on these foundations.
