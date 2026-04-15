# Communication Style Creator - Implementation Guide

## Overview

This guide explains how the **Communication Style Creator** skill is designed to work. It documents:
1. The interview flow and questions
2. How to collect and organize user responses
3. How to generate examples
4. How to create and save the output skill files

## Interview Flow

The skill follows this sequence:

### Phase 1: Skill Type & Name Selection

**Question 1:**
```
Which type of communication skill would you like to create?

A. Blog skill (for writing blog posts in your style)
B. LinkedIn skill (for writing LinkedIn posts in your style)
```

**Question 2:**
```
Give your skill a memorable name (e.g., 'casual-tech-blog', 'executive-linkedin').
This helps you identify and invoke it later.

What would you like to name this skill?
[User provides name — validate: alphanumeric, hyphens allowed]
```

**Store:**
- `skill_type` = "blog" or "linkedin"
- `skill_name` = [user-provided name]

---

### Phase 2: Tone & Voice Questions

**Question 3: Formality Level**
```
How formal should your writing be?

A. Very formal (professional, corporate tone)
B. Professional (polished but approachable)
C. Conversational (friendly, natural)
D. Casual (relaxed, informal)
```

**Store:** `formality` = [A/B/C/D]

---

**Question 4: Primary Tone/Emotion**
```
What's your primary tone or emotion when you write?

A. Inspiring & motivational
B. Educational & explanatory
C. Playful & humorous
D. Serious & thought-provoking
E. Encouraging & supportive
F. Mix of multiple
```

**Store:** `tone` = [A/B/C/D/E/F]

---

**Question 5: Contractions**
```
How should contractions and casual grammar be handled?

A. Always use them (don't, won't, it's, etc.)
B. Use them sparingly
C. Avoid them entirely
```

**Store:** `contractions` = [A/B/C]

---

### Phase 3: Structure & Pacing Questions

**Question 6: Sentence Style**
```
What's your preferred sentence style?

A. Short, punchy sentences (avg 10-15 words)
B. Mixed length for natural rhythm
C. Longer, flowing sentences (avg 20+ words)
```

**Store:** `sentence_style` = [A/B/C]

---

**Question 7: Content Organization**
```
How should content be organized?

A. Heavy use of bullet points and lists
B. Mix of paragraphs and lists
C. Mostly flowing prose
```

**Store:** `organization` = [A/B/C]

---

**Question 8: Content Length**
```
What's your preferred content length?

A. Concise & quick (350-500 words for blog, tweet-length for LinkedIn)
B. Medium depth (700-1000 words for blog, 2-3 paragraphs for LinkedIn)
C. Detailed & thorough (1500+ words for blog, long-form LinkedIn)
```

**Store:** `length_preference` = [A/B/C]

---

### Phase 4: Personal Touch Questions

**Question 9: Personal Stories & Anecdotes**
```
Should your writing include personal stories or anecdotes?

A. Yes, include them frequently
B. Include occasionally for emphasis
C. Rarely or never
```

**Store:** `personal_stories` = [A/B/C]

---

**Question 10: Humor & Personality**
```
How much humor and personality should shine through?

A. Include humor throughout
B. Subtle humor, mostly serious
C. Professional, minimal personality
```

**Store:** `humor` = [A/B/C]

---

**Question 11: Vulnerability & Authenticity**
```
What level of vulnerability and authenticity do you prefer?

A. Open & vulnerable (sharing struggles, failures, lessons)
B. Balanced (some personal insight, mostly professional)
C. Professional & formal (minimal personal revelation)
```

**Store:** `vulnerability` = [A/B/C]

---

### Phase 5: Technical & Content Questions

**Question 12: Examples & Analogies**
```
Should your writing include examples and analogies?

A. Always include them
B. Sometimes, when they add value
C. Rarely, keep it abstract
```

**Store:** `examples` = [A/B/C]

---

**Question 13: Technical Language Level**
```
How technical should the language be?

A. Beginner-friendly (explain jargon, assume less knowledge)
B. Mixed (assume medium knowledge, explain when needed)
C. Advanced (assume high familiarity with terms)
```

**Store:** `technical_level` = [A/B/C]

---

**Question 14: Anything Else? (Open-ended)**
```
Any other style preferences, quirks, or things you always want/want to avoid?

Examples: "Love metaphors", "Avoid excessive formatting", "Always include a call-to-action"

[User provides open text — no character limit]
```

**Store:** `other_preferences` = [user text]

---

## Response Pattern Analysis

**CRITICAL STEP:** Before generating the example, analyze linguistic patterns from the user's open-ended responses (Questions 11 and 12).

### Extract These Patterns:

**From Questions 11 & 12 responses, analyze:**

1. **Sentence Rhythm & Structure**
   - Average sentence length (count words in sample sentences)
   - Do they use short punchy statements or longer flowing ones?
   - Comma usage: strings ideas together or separate them?
   - Fragment usage: acceptable or structured?

2. **Vocabulary & Word Choice**
   - Simple vs. complex? Technical jargon or accessible?
   - Repetition: do they repeat key words for emphasis or vary?
   - Elaboration: explain thoroughly or keep concise?

3. **Grammar & Authenticity Markers**
   - Prioritize correctness or personality?
   - Any grammar variations (typos, informal contractions, stream-of-consciousness)?
   - Presence of these suggests: authenticity valued over perfection

4. **Emphasis & Elaboration Patterns**
   - How do they emphasize points? (repetition, examples, bold statements)
   - Do they elaborate through: listing, narrative, examples, or reasoning?
   - Connective words reveal logic: "because", "however", "for example", "therefore"

5. **Personal Markers & Tone**
   - First-person usage ("I believe", "I think") vs. objective ("it seems", "one might")
   - Humility indicators ("I'm not sure", "I could be wrong") vs. confidence
   - Direct vs. indirect communication

6. **Natural Rhetorical Patterns**
   - Any patterns they use repeatedly?
   - Patterns they explicitly avoid?
   - Emotional openness or professional distance?

### Example Pattern Analysis:

```
User Q11 Response: "my humor is very subtle, i am not self-important, 
i do not like to pretend i know more about a subject than i do. i have 
a lot of opinions but i am never married to an idea or concept..."

Extracted Patterns:
- Sentence rhythm: Uses longer sentences connected with commas (not short/punchy)
- Grammar: Lowercase "i" (authenticity > perfection), varied capitalization
- Emphasis: Uses repetition naturally ("i am not", "i do not", "i am never")
- Elaboration: Lists related ideas to show nuance (opinions → not married to ideas)
- Personal markers: Heavy first-person, direct, humble tone
- Values shown: Authenticity, intellectual humility, avoiding pretense
- Rhetoric: Short declarative statements strung together

→ This profile suggests: longer sentences, humble tone, natural repetition 
  for emphasis, values authenticity over polish
```

### Store Pattern Analysis:

```javascript
const responsePatterns = {
  sentenceRhythm: "longer flowing sentences connected with commas",
  vocabularyLevel: "accessible, direct",
  grammaticalStyle: "authentic (minor variations acceptable)",
  emphasisMethod: "natural repetition and listing",
  elaborationStyle: "thorough with multiple perspectives",
  personalMarkers: "heavy first-person, humble, direct",
  rhetoricalPatterns: ["declarative statements", "emphasis through repetition"],
  authenticityPriority: true  // grammar variations present
};
```

---

## Response Synthesis

After collecting all responses AND analyzing patterns, create an **enhanced style profile**:

```javascript
const styleProfile = {
  skillType: skill_type,
  skillName: skill_name,
  // Multiple-choice responses
  formality: formality,        // A/B/C/D mapped to text
  tone: tone,                  // A/B/C/D/E/F mapped to text
  contractions: contractions,  // A/B/C mapped to text
  sentenceStyle: sentence_style,
  organization: organization,
  lengthPreference: length_preference,
  personalStories: personal_stories,
  humor: humor,
  vulnerability: vulnerability,
  examples: examples,
  technicalLevel: technical_level,
  otherPreferences: other_preferences,
  // NEW: Response pattern analysis
  responsePatterns: responsePatterns,  // from pattern analysis above
  timestamp: new Date().toISOString()
};

// Human-readable summary
const profileSummary = `
**Style Profile Summary**

Formality: ${formality_text}
Tone: ${tone_text}
Contractions: ${contractions_text}

Sentence Style: ${sentence_style_text}
Organization: ${organization_text}
Length: ${length_text}

Personal Touch:
  - Stories: ${personal_stories_text}
  - Humor: ${humor_text}
  - Vulnerability: ${vulnerability_text}

Technical Style:
  - Examples: ${examples_text}
  - Technical Level: ${technical_level_text}

Other: ${other_preferences || "None"}

**Natural Writing Patterns (analyzed from their responses):**

Sentence Rhythm: ${responsePatterns.sentenceRhythm}
Vocabulary Level: ${responsePatterns.vocabularyLevel}
Grammar Style: ${responsePatterns.grammaticalStyle}
Emphasis Method: ${responsePatterns.emphasisMethod}
Elaboration Style: ${responsePatterns.elaborationStyle}
Personal Tone: ${responsePatterns.personalMarkers}
Key Patterns: ${responsePatterns.rhetoricalPatterns.join(", ")}
Authenticity Priority: ${responsePatterns.authenticityPriority ? "Yes (minor grammar variations acceptable)" : "No (maintain polish)"}
`;
```

---

## Example Generation

### Step 1: Create Enhanced Prompt for LLM

```
You are a skilled writer who captures authentic communication styles. 
Generate a [blog post intro / LinkedIn post] example that demonstrates 
a specific communication style.

## Stated Style Profile:
[profileSummary from above]

## Natural Writing Patterns (analyzed from user responses):
[responsePatterns section from above]

## CRITICAL INSTRUCTIONS:
- Use the natural patterns as your primary guide—these reflect how the user 
  actually communicates when they don't think about it
- Combine stated preferences WITH natural patterns
- If patterns and preferences seem to conflict, lean toward the patterns 
  (they reveal authentic voice more than multiple-choice answers)
- Write 200-300 words
- Match the sentence rhythm patterns observed
- Use vocabulary at the level they naturally use
- If they prioritize authenticity, don't over-polish (let natural variations show)
- Start with an opening that draws the reader in
- End with a clear transition or hook
- Make it feel like their authentic voice, not a persona

## Topic for [Blog/LinkedIn]: [generic topic]

Generate the example now:
- End with a clear transition or hook
- Make it authentic—don't overdo any element

## Topic for Blog: [generic topic like "Learning a new skill" or "Professional growth"]
## Topic for LinkedIn: [generic topic like "Sharing an insight" or "Announcing something positive"]

Generate the example now:
```

### Step 2: Call LLM (Claude)

Use the Claude API with the above prompt to generate a 200-300 word example.

### Step 3: Display to User

```
Here's an example of what your writing style looks like:

---
[Generated example text]
---

Does this match how you want to communicate?

A. Yes, this is exactly my style!
B. Close, but I'd like to adjust a few things
C. Not quite, let me refine my answers
```

---

## Refinement Loop

If user selects **B or C:**

**Ask:**
```
Which parts would you like to refine?
[Show options of main categories they can re-answer:]

A. Tone & voice (formality, tone, contractions)
B. Structure & pacing (sentences, organization, length)
C. Personal touch (stories, humor, vulnerability)
D. Technical style (examples, language level)
E. Other preferences
```

For selected categories, **re-ask the relevant questions** and regenerate the example.

**Limit:** 1-2 refinement cycles to keep the flow fast.

---

## Skill File Generation

Once user confirms (or after refinement loop):

### Step 1: Generate Output Skill Directory

```
For skill_type = "blog":
  directory = `.github/skills/blog-style-${skill_name}/`
  
For skill_type = "linkedin":
  directory = `.github/skills/linkedin-style-${skill_name}/`
```

Create the directory if it doesn't exist.

### Step 2: Create SKILL.md

Based on either `blog-style-template.md` or `linkedin-style-template.md` (in this skill's directory), generate the output skill:

**Template substitutions:**
- `[skill-name]` → user's skill_name
- `[Collected answer — e.g., ...]` → user's actual responses
- `[200-300 word example...]` → generated example from verification step

**Result:**
```
.github/skills/blog-style-${skill_name}/SKILL.md
or
.github/skills/linkedin-style-${skill_name}/SKILL.md
```

### Step 3: Commit or Display Path

Option A: Automatically create the file
```
✅ Skill created successfully!

📁 Location: .github/skills/blog-style-${skill_name}/SKILL.md
```

Option B: Show user the content and let them save
```
Your skill file is ready. Here's what will be saved:

---
[Full SKILL.md content]
---

Ready to save this? (File will be created at `.github/skills/blog-style-${skill_name}/SKILL.md`)
```

---

## Confirmation & Next Steps

```
✅ Your ${skill_type} communication skill has been created!

📁 Location: .github/skills/${skill_type}-style-${skill_name}/SKILL.md
📝 Style Profile: Saved and ready to use

🚀 Next Steps:
1. Your skill is immediately available in GitHub Copilot
2. Invoke it with: /blog-style-${skill_name} [topic]
   or: /linkedin-style-${skill_name} [topic]
3. To refine your style later, edit the SKILL.md or re-run this creator
4. Share with your team by committing to version control

Need help? See the README at .github/skills/communication-style-creator/README.md
```

---

## Technical Implementation Checklist

- [ ] Interview flow with ask_user tool (12-14 questions)
- [ ] Response collection and validation
- [ ] Style profile synthesis
- [ ] Profile summary generation
- [ ] LLM call for example generation
- [ ] Example verification loop
- [ ] Template substitution for output skill
- [ ] Directory creation and file writing
- [ ] User confirmation and next steps
- [ ] Error handling (invalid inputs, template issues)

---

## Files in This Skill Directory

- `SKILL.md` — Main skill definition with full workflow documentation
- `README.md` — User-facing guide
- `blog-style-template.md` — Template for blog skill generation
- `linkedin-style-template.md` — Template for LinkedIn skill generation
- `IMPLEMENTATION.md` — This file; technical documentation

## How to Use This Guide

When implementing the Communication Style Creator skill as a real GitHub Copilot skill:

1. Follow the interview flow structure
2. Use the response synthesis to organize user input
3. Call Claude with the example generation prompt
4. Use the templates to generate output skills
5. Follow the confirmation flow

The skill itself orchestrates all of this through the user interface.
