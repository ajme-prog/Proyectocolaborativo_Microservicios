#!/bin/env zsh

for s in ./src/**/*.js(.ND)
  sed -i 's/import\s*{\([^}]\+\)}\s*from\s*"\(\.\.[^"]\+\)"/const {\1} = require("\2")/g' "$s"
