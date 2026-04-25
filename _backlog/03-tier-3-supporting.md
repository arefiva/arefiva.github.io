# Tier 3: Supporting & Advanced Posts

These posts explore nuances, supporting concepts, and advanced techniques. Most can be read independently but benefit from Tier 1/2 foundation.

---

## 1. Human-Agent Collaboration: Getting the Best of Both

**ID:** `blog-collaboration`  
**Status:** Pending  
**Tier:** 3 (Supporting & Advanced)  
**Dependencies:**  
- Requires: `blog-spec-first`  
**Post Type:** Conceptual + Case Study  
**Referenced in original post:** Section "Combining the Approaches", "Connection Through Understanding"  
**LinkedIn post:** `li-collaboration` (`communication/LinkedIn/_backlog/li-collaboration.md`)

### Overview

Explicit framework for the human-agent collaboration model: what humans should focus on, what agents should handle, feedback loops, and how to build effective working relationships with agent output. Addresses team dynamics and shifting mindsets.

### Key Topics

- **Division of Labor**: What work is best done by humans vs. agents
- **Where Humans Add Value**: Specification, architecture, judgment, understanding
- **Where Agents Add Value**: Implementation, boilerplate, scaling, consistency
- **Feedback Loops**: How findings loop back into specifications; how to structure them
- **Building Trust in Agent Output**: How to move from skepticism to confidence
- **Team Dynamics**: How teams shift from "me and the code" to "me, the agent, and the code"
- **Upskilling for the Model**: What skills become more valuable; what skills shift
- **The Failure Mode**: When humans over-direct agents or under-review output
- **The Success Mode**: When humans do their best work (thinking, deciding) and agents do theirs (building)
- **Case Study**: A team or project that made this shift well (what worked, what was hard)

### Notes

- This is philosophy + practical guidance
- Tie to the original post's framing: "throughput without cognitive debt"
- Address the emotional/cultural shift: this requires trusting machines more than many engineers naturally do
- Make clear: this is still collaborative, not delegated
- Include a section on what goes wrong and how to recover

### Related Posts

Building on:
- `blog-spec-first` (specs are the contract between human and agent)

Related to:
- `blog-cog-debt` (how collaboration prevents cognitive debt)

---

## 2. Scaffolding and Boilerplate: What Agents Do Well

**ID:** `blog-scaffolding`  
**Status:** Pending  
**Tier:** 3 (Supporting & Advanced)  
**Dependencies:**  
- Requires: `blog-spec-first`  
**Post Type:** Practical How-To  
**Referenced in original post:** "agent's ability to handle scaffolding and boilerplate quickly"  
**LinkedIn post:** `li-scaffolding` (`communication/LinkedIn/_backlog/li-scaffolding.md`)

### Overview

Why handling mechanical work is actually important, not just nice. This post explores what agents excel at (repetitive structure generation), why it matters (frees humans for judgment), and how to structure work so agents can take on scaffolding tasks.

### Key Topics

- **What Counts as Scaffolding**: Configuration, boilerplate, repeated patterns, test fixtures
- **Why Scaffolding Matters**: It's 30-50% of development time and blocks thinking
- **The Human Cost of Manual Scaffolding**: Tedium, copy-paste errors, inconsistency
- **Agents and Consistency**: How agents generate boilerplate that matches patterns perfectly
- **The Psychology**: Humans freed from scaffolding can focus on harder problems
- **Structural Patterns Agents Exploit**: Database models, API endpoints, test fixtures, serializers
- **Defining Scaffolding in AES**: How to encode "generate boilerplate following pattern X"
- **Examples Across Domains**: Web APIs, data pipelines, test suites, configuration files
- **Quality of Agent-Generated Scaffolding**: When it's indistinguishable from human-written, when it needs polish
- **Thinking About Efficiency**: The ROI of investing in automation for boilerplate

### Notes

- This might seem minor, but it's a significant time sink in practice
- Make the connection: developers freed from typing boilerplate can think about architecture
- Include metrics if available: time saved, error reduction, consistency gains
- This post can be more light-hearted; it's about quality of life too
- Emphasize: this is where agentic development's throughput advantage really shows

### Related Posts

Independent but connects to:
- `blog-spec-first` (specs enable smart scaffolding)

---

## Tier 3 Summary

These posts explore the human and organizational dimensions of agentic development:
1. **How to collaborate effectively** (`blog-collaboration`)
2. **Where throughput comes from** (`blog-scaffolding`)

They provide breadth and nuance to the core practices from Tier 2.

---

## Cross-Tier Notes

### Optional Read Orders

**For a practitioner implementing this for the first time:**
- Tier 1 (all four)
- `blog-aes-guide` (essential)
- `blog-patterns` (essential)
- `blog-code-review` (essential)
- Then revisit Tier 3 as relevant

**For a team evaluating agentic development:**
- `blog-spec-first`
- `blog-cog-debt`
- `blog-aes-guide`
- `blog-collaboration`
- Then deeper dives as interest drives

**For understanding the full cycle:**
- Tier 1 (foundational why)
- Tier 2 (the playbook)
- `blog-arch-review` (how it loops)
- `blog-code-review` (where humans stay engaged)

---

## Contributing a Post

When you're ready to write a post from this backlog:

1. Update the **Status** field to `draft` in the file
2. Move the post to `_posts/` with the date (following Jekyll convention)
3. Use the `agentic-development` category and appropriate tags
4. Update the post's frontmatter to mark it as `published`
5. Update this backlog README to reflect the status change
6. Once live, update the cross-reference links across posts as relevant

