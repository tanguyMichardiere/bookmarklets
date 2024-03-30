#!/usr/bin/env sh
pnpm exec npm-check-updates -x @types/node -u
pnpm install
pnpm update
