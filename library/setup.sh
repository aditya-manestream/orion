#!/usr/bin/env bash
# Manestream Build Library: one-time setup for Claude Code.
# Copied from the library's "Set up once" block (checked 2 Oct 2026).
# Nothing here runs automatically. Read it, then run the part you want:
#   bash library/setup.sh global     # once per machine
#   bash library/setup.sh project    # inside a client repo (Orion)
#   bash library/setup.sh update     # monthly refresh
# Skills install globally into ~/.claude/skills

set -euo pipefail

global() {
  # Taste, review and originality
  npx skills add Leonxlnx/taste-skill --skill design-taste-frontend --skill image-to-code --skill redesign-existing-projects -g -a claude-code -y
  npx skills add emilkowalski/skills -g -a claude-code -y
  npx skills add MengTo/Skills --skill no-ai-design-slop --skill audit-reference-originality --skill video-to-superprompt --skill stitched-full-page-capture -g -a claude-code -y
  npx skills add vercel-labs/agent-skills --skill web-design-guidelines -g -a claude-code -y
  npx skills add addyosmani/web-quality-skills -g -a claude-code -y

  # Copy
  npx skills add hardikpandya/stop-slop -g -a claude-code -y
  npx skills add blader/humanizer -g -a claude-code -y
  npx skills add coreyhaines31/marketingskills --skill copywriting --skill cro -g -a claude-code -y

  # Motion
  npx skills add greensock/gsap-skills -g -a claude-code -y
  npx motion-ai

  # Browser QA and performance
  npm install -g @playwright/cli@latest && playwright-cli install --skills
  # Google collects usage statistics by default; --no-usage-statistics opts out.
  claude mcp add chrome-devtools --scope user -- npx chrome-devtools-mcp@latest --no-usage-statistics
}

project() {
  # Run inside each client repo
  npx impeccable install              # then /impeccable init inside Claude Code
  # Orion has no shadcn yet. Only run these if you decide to adopt it:
  # npx shadcn@latest init
  # npx shadcn@latest mcp init --client claude
  # Once a DESIGN.md exists:
  # npx @google/design.md lint DESIGN.md
}

update() {
  npx skills update -g
}

case "${1:-}" in
  global)  global ;;
  project) project ;;
  update)  update ;;
  *) echo "Usage: bash library/setup.sh [global|project|update]"; exit 1 ;;
esac
