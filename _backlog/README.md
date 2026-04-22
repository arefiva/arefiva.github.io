# Blog Post Backlog

This folder contains the internal backlog of blog post ideas derived from existing articles on the blog. Posts are organized by tier (prerequisite level) with dependency mappings that indicate which posts should be read or written first.

## Organization

Posts are stored as individual markdown files. Each file contains:
- **Metadata** (frontmatter): Status, tier, dependencies, type
- **Overview**: What this post covers
- **Key topics**: Specific areas to explore
- **Notes**: Links to related posts, current status, writing guidance

## Tier System

### Tier 1: Foundational
Posts that establish core concepts and mental models. Readers should engage with these first.

### Tier 2: Core Implementation
Posts that provide practical guidance on implementing the approaches. Depend on Tier 1 concepts.

### Tier 3: Supporting & Advanced
Posts that explore nuances, advanced patterns, or specific techniques. Can be read independently but benefit from Tier 1/2 understanding.

## Quick Navigation

| ID | Title | Tier | Status | Dependencies |
|---|---|---|---|---|
| `blog-spec-first` | Specification-First Development: The Mental Shift | 1 | Pending | — |
| `blog-tdd-intro` | Test-Driven Development for Teams | 1 | Pending | — |
| `blog-acceptance-criteria` | Acceptance Criteria That Actually Work | 1 | Pending | — |
| `blog-cog-debt` | Cognitive Debt vs. Technical Debt | 1 | Pending | — |
| `blog-aes-guide` | Autonomous Execution Specifications (AES): From Concept to Structure | 2 | Pending | `blog-spec-first`, `blog-acceptance-criteria` |
| `blog-patterns` | Patterns and Conventions: Why They Matter | 2 | Pending | `blog-spec-first` |
| `blog-code-review` | Code Review in an Agentic Workflow | 2 | Pending | `blog-spec-first`, `blog-tdd-intro` |
| `blog-arch-review` | The Architecture Review Cycle | 3 | Pending | `blog-aes-guide` |
| `blog-collaboration` | Human-Agent Collaboration: Getting the Best of Both | 3 | Pending | `blog-spec-first` |
| `blog-scaffolding` | Scaffolding and Boilerplate: What Agents Do Well | 3 | Pending | `blog-spec-first` |

## Reference to Original Post

All posts derive from: **["Red, Green, Refactor With an AI in the Loop"](../_posts/2026-04-15-red-green-refactor-with-an-ai-in-the-loop.md)**

This original post provides the foundational framework. Individual backlog posts expand on concepts mentioned in passing or explored only briefly.

---

## Writing Guidelines

When writing a post from this backlog:

1. **Cross-reference the original post** at the beginning and in relevant sections
2. **Link to prerequisite posts** (list in the file's dependencies section)
3. **Include worked examples** — aim for at least one small, realistic scenario
4. **Tag with `agentic-development`** to group thematically
5. **Use consistent tone** with the original post (thoughtful, practical, grounded in experience)

## Status Tracking

Update the status field in each post's frontmatter:
- `pending` — Not yet written
- `draft` — In progress or draft stage
- `published` — Live on the blog
- `blocked` — Waiting on something (note reason)

