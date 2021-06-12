#!/bin/env zsh

sed -i 's/import\s*{\([^}]\+\)}\s*from\s*"\(\.\.[^"]\+\)"/const {\1} = require("\2")/g' "$1"
