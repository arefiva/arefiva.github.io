# Tier 2: Core Implementation Posts

These posts provide practical guidance on implementing the agentic workflow approach. All depend on foundational concepts from Tier 1.

---

## 1. Autonomous Execution Specifications (AES): From Concept to Structure

**ID:** `blog-aes-guide`  
**Status:** Pending  
**Tier:** 2 (Core Implementation)  
**Dependencies:**  
- Requires: `blog-spec-first`
- Requires: `blog-acceptance-criteria`  
**Post Type:** Practical How-To + Conceptual  
**Referenced in original post:** Section "Writing the Specification", JSON example  
**LinkedIn post:** `li-aes-guide` (`communication/LinkedIn/_backlog/li-aes-guide.md`)

### Overview

Dedicated practical guide on how to write an effective AES. Readers familiar with the *why* (Tier 1) now learn the *how*: structure, fields, patterns, examples, and common pitfalls. This is the playbook for turning a vague feature request into an executable specification.

### Key Topics

- **AES vs. Traditional PRD**: What changes and why (audience shift to agents)
- **The Anatomy of an AES**: Required fields, optional fields, what each means
- **User Stories in AES Format**: Breaking down features into small, coherent stories
- **Acceptance Criteria Precision**: Applying the specificity lessons from Tier 1
- **Implementation Notes**: How much guidance to give agents without over-constraining
- **Dependencies and Ordering**: Why story sequence matters, how to encode it
- **Complexity and Risk Assessment**: Fields for prioritization and allocation
- **AES Across Feature Types**: Examples for different kinds of work (data pipeline, API endpoint, UI component)
- **Common Pitfalls**: Under-specifying, over-specifying, ambiguous acceptance criteria
- **Template and Checklist**: A concrete AES template readers can use immediately

### Notes

- Include the JSON example from the original post, but expand with full explanations
- Provide 3-4 worked examples of complete user stories (start to finish)
- Show both good and bad AES examples side-by-side
- Make this immediately actionable—readers should be able to write an AES after this
- Include a section: "If you skip this step, here's what happens" (tie to cognitive debt)

### Related Posts

Building on:
- `blog-spec-first` (why you need to do this)
- `blog-acceptance-criteria` (how to write the criteria part)

Feeds into:
- `blog-arch-review` (how reviewed findings become new stories in the AES)

---

## 2. Patterns and Conventions: Why They Matter in an Agentic Workflow

**ID:** `blog-patterns`  
**Status:** Pending  
**Tier:** 2 (Core Implementation)  
**Dependencies:**  
- Requires: `blog-spec-first`  
**Post Type:** Practical How-To + Case Study  
**Referenced in original post:** Mentioned in passing: "Follow the existing pattern"  
**LinkedIn post:** `li-patterns` (`communication/LinkedIn/_backlog/li-patterns.md`)

### Overview

Explores why consistent patterns in a codebase are essential for agentic development. Agents follow patterns; humans review against them. This post covers identifying patterns, documenting them, enforcing them, and using them to communicate with agents.

### Key Topics

- **Why Patterns Matter More for Agents**: Agents search for precedent; clear patterns reduce ambiguity
- **Pattern Discovery**: How to identify existing patterns in your codebase
- **Documenting Patterns**: Making implicit patterns explicit (style guide, architectural decisions, code examples)
- **Pattern Coherence as a Signal**: When patterns clash, something is architecturally wrong
- **Implementation Patterns**: Repeated solutions to the same problem (e.g., error handling, logging, configuration)
- **Architectural Patterns**: Larger structural patterns (layered architecture, service boundaries)
- **Naming Conventions**: Consistent naming enables agents to predict structure
- **Pattern Conflicts**: When you inherit code with inconsistent patterns; how to harmonize
- **Agents and Pattern Adherence**: How to encode pattern expectations in AES implementation notes
- **Using Pattern Documentation in AES**: Specific guidance like "Follow the pattern established in X module"

### Notes

- Use examples from real systems (finance domain seems to be the user's context)
- Show a codebase "before and after" clarifying patterns
- Make the connection: unclear patterns force agents into bad guesses, require expensive review feedback
- Include a section on maintaining pattern coherence when teams grow
- Provide a concrete template/checklist for documenting patterns

### Related Posts

Referenced by:
- Implicit dependency: better specs require understanding existing patterns

---

## 3. Code Review in an Agentic Workflow: Moving Beyond the Checkbox

**ID:** `blog-code-review`  
**Status:** Pending  
**Tier:** 2 (Core Implementation)  
**Dependencies:**  
- Requires: `blog-spec-first`
- Requires: `blog-tdd-intro`  
**Post Type:** Practical How-To + Case Study  
**Referenced in original post:** Section "Human Review", "The refactor phase remains entirely human"  
**LinkedIn post:** `li-code-review` (`communication/LinkedIn/_backlog/li-code-review.md`)

### Overview

How code review fundamentally changes when an agent does the implementation. This post clarifies the reviewer's role: not checking if it compiles (agent handles that), but evaluating architectural fit, design choices, and alignment with intent. Includes concrete review patterns and decision trees.

### Key Topics

- **The Reviewer's New Role**: What the agent already verified vs. what only humans can catch
- **What NOT to Review**: Compilation, obvious test passing, basic style (agent verified)
- **What TO Review**: Architecture alignment, design choices, whether implementation matches intent
- **The Specification as a Review Guide**: Using the AES to evaluate correctness
- **Architecture Alignment**: Does this fit the existing system design?
- **Code Quality Beyond Tests**: Readability, maintainability, patterns followed
- **Spotting Mismatches**: How to recognize when agent output is correct but architecturally wrong
- **The Refactor Question**: When to refactor agent output vs. when to accept it
- **Feedback Loop**: How findings feed back into new stories or updated specs
- **Review Checklist for Agentic Code**: Concrete questions to ask for each piece of code
- **Time Investment**: This review is deeper but focused; realistic time expectations

### Notes

- Tie back to cognitive debt: meaningful review keeps you in the codebase and preserves understanding
- Provide real examples of agent output with review commentary
- Show the decision tree: "Is this correct but wrong for our system?"
- Distinguish: review of agent output is different from traditional code review
- Make clear: this isn't about trust; it's about alignment

### Related Posts

Building on:
- `blog-tdd-intro` (review parallels code review in TDD workflows)
- `blog-spec-first` (specs enable meaningful review)

Related to:
- `blog-cog-debt` (mandatory review prevents cognitive debt)

---

## 4. The Architecture Review Cycle: Finding and Fixing Mismatches

**ID:** `blog-arch-review`  
**Status:** Pending  
**Tier:** 2→3 (Core Impl → Advanced)  
**Dependencies:**  
- Requires: `blog-aes-guide`  
**Post Type:** Practical How-To + Case Study  
**Referenced in original post:** "automated code review runs across the entire branch, identifying... architectural mismatches"  
**LinkedIn post:** `li-arch-review` (`communication/LinkedIn/_backlog/li-arch-review.md`)

### Overview

Deep dive into the architecture review phase and how it feeds back into the cycle as new stories. This post clarifies what triggers an architectural mismatch finding, how to distinguish legitimate variation from architectural problems, and how to close the loop.

### Key Topics

- **What Counts as an Architectural Mismatch**: Vs. valid alternative implementations
- **Automated Architecture Analysis**: Tools and patterns for automated review
- **Distinguishing Real Issues from False Positives**: When agent output is correct even if unexpected
- **Feedback Loop Mechanics**: How findings become new stories, re-enter the cycle
- **Priority and Severity**: Which findings require immediate fixes vs. which can be future work
- **Maintaining Architectural Coherence**: How reviews enforce consistency over time
- **Handling Legitimate Variation**: When code can be architecturally correct in multiple ways
- **Review Cycle Efficiency**: Minimizing feedback loops while catching real problems
- **Documentation and Learning**: Using findings to clarify patterns and architecture

### Notes

- This is somewhat advanced; readers should understand AES and code review first
- The bridge to Tier 3, but belongs in Tier 2 given its role in the full cycle
- Could include references to specific tools or frameworks

### Related Posts

Building on:
- `blog-aes-guide` (structured specs make arch review meaningful)
- `blog-code-review` (review pattern foundation)

---

## Tier 2 Summary

These posts translate Tier 1 concepts into concrete practices:
1. **How to write executable specs** (`blog-aes-guide`)
2. **How to maintain codebase coherence** (`blog-patterns`)
3. **How to review agent output meaningfully** (`blog-code-review`)
4. **How to handle architectural findings** (`blog-arch-review`)

Together, they form the practical playbook for an agentic workflow.
