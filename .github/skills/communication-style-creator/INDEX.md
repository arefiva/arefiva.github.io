# Communication Style Creator - Skill Package

## 📚 Files in This Directory

### User-Facing Documentation

1. **README.md** ← Start here!
   - Overview of how the skill works
   - How to use it
   - FAQ and next steps
   - **Read this first if you're new to the skill**

### Implementation & Reference

2. **SKILL.md**
   - The skill definition itself
   - Describes the workflow, questions, and expectations
   - How the skill generates output
   - Templates for generated skills

3. **IMPLEMENTATION.md**
   - Detailed technical documentation
   - Interview flow with exact questions
   - Response synthesis for style profiles
   - Example generation approach
   - File creation logic
   - **Use this when building the skill in code**

### Templates for Generated Skills

4. **blog-style-template.md**
   - Template structure for blog writing skills
   - Shows placeholder sections that get filled with user data
   - Used by the skill when generating blog output

5. **linkedin-style-template.md**
   - Template structure for LinkedIn writing skills
   - Shows placeholder sections that get filled with user data
   - Used by the skill when generating LinkedIn output

---

## 🚀 Quick Start

1. **To understand the skill:** Read `README.md`
2. **To implement it:** Read `SKILL.md` then `IMPLEMENTATION.md`
3. **To see output examples:** Check the templates

---

## 📋 What This Skill Does

**Creates personalized communication skills through an interview process:**

```
Interview Questions
    ↓
Collect Preferences
    ↓
Generate Example
    ↓
User Verification
    ↓
Generate Skill File
    ↓
Ready to Use!
```

---

## 🎯 Interview Topics Covered

The skill asks about:

- **Tone & Voice** (3 questions)
  - Formality level
  - Primary tone/emotion
  - Contraction usage

- **Structure & Pacing** (3 questions)
  - Sentence style
  - Content organization
  - Content length preference

- **Personal Touch** (3 questions)
  - Personal stories/anecdotes
  - Humor & personality
  - Vulnerability level

- **Technical & Content** (3 questions)
  - Use of examples
  - Technical language level
  - Other preferences (open-ended)

**Total:** ~12-14 focused questions

---

## 📁 Output Structure

When a user completes the interview, they get:

```
.github/skills/
├── blog-style-[their-name]/
│   └── SKILL.md          (Generated skill)
└── linkedin-style-[their-name]/
    └── SKILL.md          (Generated skill)
```

Each generated skill:
- Contains their style profile
- Includes a verified example
- Is immediately usable
- Can be shared with team members

---

## 🔄 Workflow Overview

### For Users

1. Run the communication style creator skill
2. Choose blog or LinkedIn
3. Answer interview questions
4. Review generated example
5. Refine if needed
6. Get your new skill ready to use

### For Developers

1. Implement the interview flow using `ask_user` tool
2. Collect and organize responses
3. Generate example using LLM
4. Get user verification
5. Substitute responses into templates
6. Create and save skill files

---

## ✅ Current Status

- ✅ SKILL.md created with full workflow documentation
- ✅ README.md with user guide
- ✅ IMPLEMENTATION.md with technical details
- ✅ blog-style-template.md template created
- ✅ linkedin-style-template.md template created
- ✅ This INDEX.md for navigation

### Ready for Next Steps

- The skill structure is defined and documented
- Templates are in place
- Interview flow is specified
- Example generation approach is documented
- File creation logic is outlined

### To Implement as Live Skill

The actual implementation as a GitHub Copilot skill would involve:
1. Building the interview logic (ask_user tool calls)
2. Integrating LLM example generation (Claude API)
3. Template substitution system
4. File creation and directory management
5. Error handling and validation

---

## 📞 Questions?

Each file has comments and documentation. Start with README.md for user questions, or IMPLEMENTATION.md for technical questions.

---

## 🎓 How This Fits Together

```
User runs skill
    ↓
Reads README.md (if new)
    ↓
Answers questions (from SKILL.md)
    ↓
Gets example (generated via IMPLEMENTATION.md logic)
    ↓
Verifies style matches (feedback loop in IMPLEMENTATION.md)
    ↓
Receives skill file (created from templates)
    ↓
Uses new skill to write content
```

All files work together to provide a complete workflow.
