# PythonistaGuild PR Description Check Action

A small action to check whether specific strings are contained in the body/description of a PR.


Useful for checking whether certain conditions have been agreed to E.g. with [x] or []

## To Use:

**Make a workflow:**

```yaml
name: pr-description-check
on:
  pull_request:
    types:
      - opened
      - edited

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: checkout repository
        uses: actions/checkout@v4
      - name: PR Description Check
        uses: pythonistaguild/pr-description-check@v1.0
        with:
          content: "string to check exists"
```
