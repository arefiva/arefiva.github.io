# Communication Style Creator Skill

## Overview

The **Communication Style Creator** is a GitHub Copilot skill that helps you create personalized communication skills. Through an interactive interview, it captures your unique writing preferences and generates a reusable skill—either for **blog posts** or **LinkedIn content**—that you can use repeatedly to write in your established style.

## How It Works

### 1. Start the Skill
Invoke the communication style creator skill in GitHub Copilot:
```
/communication-style-creator
```

Or trigger it with a command like:
- "create communication skill"
- "set up my writing style"  
- "build my blog skill"
- "build my linkedin skill"

### 2. Choose Your Skill Type
You'll be asked which type of skill to create:
- **Blog Skill** — For writing blog posts consistently in your style
- **LinkedIn Skill** — For writing LinkedIn posts consistently in your style

Provide a memorable name (e.g., `casual-tech-blog`, `executive-linkedin`).

### 3. Interview Questions
The skill asks ~12 questions about your communication preferences:

**Tone & Voice:**
- Formality level (formal, professional, conversational, casual)
- Primary tone (inspiring, educational, playful, serious, encouraging)
- Contraction usage (always, sparingly, never)

**Structure & Pacing:**
- Sentence style (short & punchy, mixed, flowing)
- Content organization (lists, mixed, prose)
- Content length preference (concise, medium, detailed)

**Personal Touch:**
- Personal stories/anecdotes (frequent, occasional, rarely)
- Humor & personality (included, subtle, professional)
- Vulnerability level (open, balanced, formal)

**Technical & Content:**
- Use of examples (always, sometimes, rarely)
- Technical language level (beginner, mixed, advanced)
- Any other style preferences (open text)

### 4. Example Verification
The skill generates a **200-300 word example** showing your style in action. You verify:
- ✅ "Yes, this is exactly my style!"
- 🔄 "Close, but I'd like to adjust a few things"
- ❌ "Not quite, let me refine my answers"

If needed, you can refine specific answers and regenerate the example.

### 5. Skill Generation
Once verified, the skill creates a new skill file in your `.github/skills/` directory:

```
.github/skills/
├── blog-style-[your-name]/
│   └── SKILL.md
└── linkedin-style-[your-name]/
    └── SKILL.md
```

Your new skill is immediately available for use.

## What Your Generated Skill Contains

Each generated skill includes:

1. **Skill Metadata** — Name, description, triggers
2. **Your Style Profile** — All your collected preferences in one place
3. **Example Text** — A sample showing your style
4. **Usage Instructions** — How to use the skill for writing
5. **Style Guidelines** — Detailed breakdown of your preferences

## Using Your Generated Skill

Once created, you can invoke your new blog or LinkedIn skill:

```
/blog-style-casual-tech-blog
"Help me write a blog post about AI in development"
```

Or:
```
/linkedin-style-executive-linkedin
"Draft a LinkedIn post about our company's new initiative"
```

The generated skill uses your saved style profile to consistently apply your communication preferences.

## Customization & Refinement

Your generated skill is a regular `.md` file in `.github/skills/`. You can:

1. **Edit directly** — Open the file and adjust style guidelines
2. **Update preferences** — Change any part of your style profile
3. **Share with team** — Commit it to version control so teammates can use your style

To refine your style, re-run the communication style creator and choose the same skill type and name to regenerate or update.

## Technical Details

### File Structure
```
.github/skills/communication-style-creator/
└── SKILL.md            # This skill's definition

.github/skills/blog-style-[name]/
└── SKILL.md            # Generated blog writing skill

.github/skills/linkedin-style-[name]/
└── SKILL.md            # Generated LinkedIn writing skill
```

### Style Profile Storage
Your communication style is stored as part of the generated skill's metadata and instructions. No separate database or config is needed—everything is self-contained in the `.md` file.

### LLM Integration
The skill uses Claude (or the configured LLM) to:
- Generate example text based on your style preferences
- Provide verification that the example matches your expectations

## FAQ

**Q: Can I create multiple styles?**
A: Yes! Create as many skills as you want (e.g., `casual-blog`, `formal-blog`, `linkedin-executive`, `linkedin-casual`).

**Q: What if I want to change my style later?**
A: Run the skill again with the same name/type to update it, or edit the `.md` file directly.

**Q: How does this work with my actual writing?**
A: Your generated skill acts as a guide. When you use it with a topic or draft, it applies your style preferences to new content.

**Q: Can I share my style skill with others?**
A: Absolutely! Commit the generated skill to your repo, and teammates can use it too.

**Q: What if the generated example doesn't feel right?**
A: You can refine by re-answering the questions that matter most to you. The skill will regenerate with updates.

## Next Steps

1. Run the communication style creator skill
2. Answer the interview questions honestly
3. Review and verify the generated example
4. Your new skill is ready to use!
5. Commit it to version control to share with your team

---

For questions or improvements to the communication style creator, see the skill file at `.github/skills/communication-style-creator/SKILL.md`.
