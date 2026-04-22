# Skill Registry

**Delegator use only.** Any agent that launches sub-agents reads this registry to resolve compact rules, then injects them directly into sub-agent prompts. Sub-agents do NOT read this registry or individual SKILL.md files.

See `_shared/skill-resolver.md` for the full resolution protocol.

## User Skills

| Trigger                         | Skill          | Path                                                              |
| ------------------------------- | -------------- | ----------------------------------------------------------------- |
| Go tests, Bubbletea TUI testing | go-testing     | `C:/Users/almag/.codeium/windsurf/skills/go-testing/SKILL.md`     |
| Creating new AI skills          | skill-creator  | `C:/Users/almag/.codeium/windsurf/skills/skill-creator/SKILL.md`  |
| PR creation workflow            | branch-pr      | `C:/Users/almag/.codeium/windsurf/skills/branch-pr/SKILL.md`      |
| Issue creation workflow         | issue-creation | `C:/Users/almag/.codeium/windsurf/skills/issue-creation/SKILL.md` |
| Judgment day dual review        | judgment-day   | `C:/Users/almag/.codeium/windsurf/skills/judgment-day/SKILL.md`   |

## Compact Rules

### go-testing

- Use `teatest` for Bubbletea TUI testing
- Test model updates, not just final output
- Use `tea.Program` with custom input/output for integration tests
- Table-driven tests for multiple input scenarios
- Assert on `model.View()` output for UI state

### skill-creator

- Skills are in `skills/{name}/SKILL.md`
- Frontmatter required: `name`, `description`
- Description must include "Trigger: {when to use}"
- Keep skills focused on ONE problem
- Include examples for non-obvious patterns

### branch-pr

- ALWAYS create issue FIRST before PR
- Branch naming: `{type}/{issue-number}-{short-desc}`
- PR description must reference issue with "Closes #N"
- Include test evidence in PR body

### issue-creation

- Use templates from `.github/ISSUE_TEMPLATE/`
- Title format: `[{type}] {component}: {description}`
- Labels: bug, feature, refactor, docs, test
- Include reproduction steps for bugs
- Define "done" criteria in description

### judgment-day

- Launch TWO independent judge agents
- Each judge receives ONLY the target files + context
- Judges vote: APPROVE / REQUEST_CHANGES / NEEDS_DISCUSSION
- Fix conflicts, then re-judge if disagreed
- Escalate to human after 2 iterations

## Project Conventions

| File      | Path                                                                    | Notes                                         |
| --------- | ----------------------------------------------------------------------- | --------------------------------------------- |
| AGENTS.md | `d:\Desarrollo Web\proyectos_code_libre\casa_alquiler_cubano\AGENTS.md` | Index — references CubaProp project structure |
