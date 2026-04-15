---
name: communication-style-creator
description: "Create a reusable communication style skill tailored to how you want to write. Interview-based setup that generates either a blog skill or LinkedIn skill. Use when you want to establish your communication guidelines. Triggers on: create communication skill, set up my writing style, build my blog skill, build my linkedin skill, communication style setup."
user-invocable: true
---

# Communication Style Creator

Interview-based skill that captures your unique communication preferences and generates a reusable skill—either for blog posts or LinkedIn content—that you can use repeatedly to write in your established style.

---

## What This Does

This is a **skill-generating skill**. Here's the workflow:

1. **Interview** — You answer ~12 questions about your communication preferences (tone, formality, personal touches, structure, etc.)
2. **Analyze** — System analyzes HOW you answered (not just WHAT you answered) to extract natural writing patterns
3. **Generate** — Based on both your answers AND your writing patterns, system creates an example
4. **Verify** — You review the example and provide specific feedback if needed
5. **Confirm** — Once example matches your style, system creates your skill
6. **Ready** — Your generated skill is immediately available for future use

**Critical:** The way you answer questions reveals your authentic style—sentence patterns, vocabulary choices, emphasis methods, etc. The system uses these linguistic markers alongside your stated preferences.

---

## The Job

### Step 1: Welcome & Choice

```
Which skill would you like to create?
  A. Blog skill (for writing blog posts in your style)
  B. LinkedIn skill (for writing LinkedIn posts in your style)
```

Ask for a **skill name** to make it unique and memorable (e.g., `casual-tech-blog`, `executive-linkedin`).

---

### Step 2: Interview Questions

Ask these questions **one at a time** to build a complete style profile:

#### Tone & Voice (Questions 1-3)
1. **Formality Level**
   - A. Very formal (professional, corporate)
   - B. Professional (polished but approachable)
   - C. Conversational (friendly, natural)
   - D. Casual (relaxed, informal)

2. **Primary Tone/Emotion**
   - A. Inspiring & motivational
   - B. Educational & explanatory
   - C. Playful & humorous
   - D. Serious & thought-provoking
   - E. Encouraging & supportive
   - F. Mix of multiple

3. **Contractions & Casual Grammar**
   - A. Always use contractions (don't, won't, it's)
   - B. Use them sparingly
   - C. Avoid them entirely

#### Structure & Pacing (Questions 4-6)
4. **Sentence Style**
   - A. Short, punchy sentences (avg 10-15 words)
   - B. Mixed length for rhythm
   - C. Longer, flowing sentences (avg 20+ words)

5. **Content Organization**
   - A. Heavy use of bullet points and lists
   - B. Mix of paragraphs and lists
   - C. Mostly flowing prose

6. **Content Length Preference**
   - A. Concise & quick (350-500 words)
   - B. Medium depth (700-1000 words)
   - C. Detailed & thorough (1500+ words)

#### Personal Touch (Questions 7-9)
7. **Personal Stories & Anecdotes**
   - A. Yes, include them frequently
   - B. Include occasionally for emphasis
   - C. Rarely or never

8. **Humor & Personality** (OPEN-ENDED)
   - "Describe your style of humor and personality in your writing. What doesn't work for you?"
   - *Listen for: authentic voice patterns, vocabulary choices, what they emphasize*

9. **Vulnerability & Authenticity**
   - A. Open & vulnerable (sharing struggles, failures)
   - B. Balanced (some personal insight, mostly professional)
   - C. Professional & formal

#### Technical & Content (Questions 10-12)
10. **Use of Examples & Analogies**
    - A. Always include examples/analogies
    - B. Sometimes, when they add value
    - C. Rarely, keep it abstract

11. **Technical Language Level**
    - A. Beginner-friendly (explain jargon, assume less knowledge)
    - B. Mixed (assume medium knowledge)
    - C. Advanced (assume high familiarity with terms)

12. **Your Writing Philosophy** (OPEN-ENDED)
    - "Tell me about what matters to you in writing. What values does your writing reflect? Any patterns or preferences you notice about how you naturally communicate?"
    - *Listen for: core values, natural patterns, repeated themes, word choices, elaboration style*

---

### Step 2.5: Analyze Response Patterns

**CRITICAL STEP:** Before generating an example, analyze HOW the user answered, not just WHAT they answered.

**Extract linguistic patterns from open-ended responses (Q8 and Q12):**

- **Sentence Rhythm:** Average length? Flow? Do they use short punchy statements or longer flowing ones?
- **Vocabulary Level:** Simple vs. complex? Technical vs. accessible? Do they show off knowledge or keep it grounded?
- **Punctuation & Grammar:** Perfect or authentic? Do they prioritize correctness or personality?
- **Emphasis Patterns:** How do they emphasize points? Repetition? Elaboration? Examples? Bold statements?
- **Connective Patterns:** How do ideas link? Linear progression? Circular? Layered?
- **Personal Markers:** Use of "I"? Direct or indirect? Humble tone? Self-important? Vulnerable?
- **Elaboration Style:** Do they explain briefly or deeply? Add nuance or keep it simple?
- **Rhetorical Patterns:** Any patterns they use naturally? Avoid?

**Example of pattern analysis:**
```
User said: "my humor is very subtle, i am not self-important, i do not like 
to pretend i know more about a subject than i do. I have a lot of opinions 
but i am never married to an idea or concept..."

Analysis:
- Uses longer sentences strung together with commas
- Natural repetition for emphasis ("i am not", "i do not like", "i am never")
- Direct, humble statements
- Values authenticity (minor grammar variations kept in, showing authenticity prioritized)
- Elaborates through listing related concepts
- Personal pronouns used directly ("i am", "my", "i do")
```

**Incorporate findings into style prompt:**
Use the extracted patterns PLUS the multiple-choice answers to create a richer style prompt for example generation. This makes the generated example much more likely to match the user's actual voice.

---

### Step 3: Generate Example

Based on BOTH the user's answers AND analyzed response patterns, generate a **short example** (200-300 words) demonstrating their style.

**Approach:**
1. Synthesize their preferences as a style prompt
2. **Include linguistic patterns from response analysis** 
3. Use Claude to generate a sample piece (either a short blog intro or LinkedIn post) following that comprehensive style profile
4. Show it to the user

**Enhanced style synthesis (example):**
```
Style Profile:
- Formality: Professional but conversational
- Tone: Educational and explanatory
- Sentences: Mixed length, leaning toward longer/flowing (from response analysis)
- Emphasis: Uses repetition naturally, elaborates through listing (from response analysis)
- Content: Flowing prose
- Personal: Rarely uses anecdotes, but humble tone throughout
- Examples: Sometimes, when they add value
- Technical: Advanced, assume high reader familiarity
- Authenticity: Values real voice over perfect grammar
- Response patterns show: Direct statements, humble approach, thoughtful elaboration
```

---

### Step 4: Verify

Ask the user with better structure:
```
Does this example match how you want to communicate?
  A. Yes, this is exactly my style!
  B. Close, but needs adjustment
  C. Not quite, let me refine my answers

If B, ask: "What specifically didn't match? (Select all that apply)
  □ Sentence style/rhythm
  □ Tone of voice  
  □ How ideas are organized
  □ Level of elaboration
  □ Use of examples
  □ Personality/humor level
  □ Something else (describe)
```

**If B or C:** Ask which specific elements need adjustment. Re-collect answers for those areas and regenerate, using updated response pattern analysis. (Limit to 1-2 refinement cycles to keep flow fast.)

### Step 5: Generate & Save Skill

Once verified, create the output skill file with an enhanced section documenting natural patterns:

**For Blog Skill:**
- File location: `.github/skills/blog-style-[skill-name]/SKILL.md`
- Include the style profile (from Q&A)
- **NEW:** Include "Analysis of Your Natural Writing Patterns" section showing what was extracted from responses
- Include the verified example
- Set up for users to invoke when writing blog posts

**For LinkedIn Skill:**
- File location: `.github/skills/linkedin-style-[skill-name]/SKILL.md`
- Include the style profile (from Q&A)
- **NEW:** Include "Analysis of Your Natural Writing Patterns" section showing what was extracted from responses
- Include the verified example
- Set up for users to invoke when writing LinkedIn posts

**New Section in Generated Skill:**
```markdown
### Analysis of Your Natural Writing Patterns

From analyzing how you answered these questions, we identified:

**Sentence & Flow Patterns:**
- [What was observed about sentence rhythm]
- [Elaboration style]
- [Emphasis patterns]

**Vocabulary & Tone:**
- [Word choice level]
- [Authenticity markers]
- [Natural patterns]

**Communication Values (from your own words):**
- [Key things you emphasized]
- [What matters to you]
- [Natural patterns you exhibited]

This analysis, combined with your stated preferences, created your profile.
```

**For Blog Skill:**
- File location: `.github/skills/blog-style-[skill-name]/SKILL.md`
- Include the style profile in the skill instructions
- Set up for users to invoke when writing blog posts

**For LinkedIn Skill:**
- File location: `.github/skills/linkedin-style-[skill-name]/SKILL.md`
- Include the style profile in the skill instructions
- Set up for users to invoke when writing LinkedIn posts

Use the **blog-style-template** and **linkedin-style-template** (described below) as the basis.

---

### Step 6: Confirmation

Provide output:
```
✅ Skill created successfully!

📁 Location: .github/skills/blog-style-[skill-name]/
📝 Your communication style has been saved.

🚀 Next steps:
- You can now use this skill to write blog posts in your established style
- To refine the style, edit the skill file and update the "Style Profile" section
- Share this skill with your team if they also want to write in this style
```

---

## Generated Skill Templates

### blog-style-[name]/SKILL.md

```markdown
---
name: blog-style-[skill-name]
description: "Write blog posts in your established communication style. This skill embeds your writing preferences for tone, formality, structure, and personality. Use when drafting, editing, or improving blog content. Triggers on: write my blog post, draft blog post, help me blog, improve this blog post."
user-invocable: true
---

# Your Blog Writing Style

Write blog posts that match your unique communication style, consistently reflecting your voice across all content.

---

## Your Communication Style Profile

**[Insert all collected style preferences here — formality, tone, structure, personal touches, technical level, etc.]**

**Example of your style:**
[Insert generated example]

---

## How to Use This Skill

When you want to write a blog post:
1. Describe the topic or main idea you want to cover
2. Provide any key points or structure you prefer
3. The skill will help you draft or refine content in your established style

---

## Your Style Guidelines

[Detailed breakdown of collected preferences, formatted as clear guidelines]
```

### linkedin-style-[name]/SKILL.md

```markdown
---
name: linkedin-style-[skill-name]
description: "Write LinkedIn posts in your established communication style. This skill embeds your writing preferences for tone, formality, engagement, and personality. Use when drafting LinkedIn content. Triggers on: write my linkedin post, draft linkedin post, help me with linkedin, linkedin content."
user-invocable: true
---

# Your LinkedIn Writing Style

Write LinkedIn posts that match your unique communication style, consistently reflecting your professional voice.

---

## Your Communication Style Profile

**[Insert all collected style preferences here — formality, tone, engagement level, personal touches, technical level, etc.]**

**Example of your style:**
[Insert generated example]

---

## How to Use This Skill

When you want to write a LinkedIn post:
1. Describe the topic, insight, or announcement you want to share
2. Mention any key points or calls-to-action
3. The skill will help you draft or refine content in your established style

---

## Your Style Guidelines

[Detailed breakdown of collected preferences, formatted as clear guidelines]
```

---

## Implementation Notes

- Use the `ask_user` tool with multiple-choice answers for all interview questions
- Collect all answers in memory/state during the interview
- Use Claude (or available LLM) to generate examples based on style synthesis
- Use file creation tools to generate the output skill files
- Provide clear confirmation and next steps when complete
- If refinement is needed, loop back to specific questions without restarting the interview
