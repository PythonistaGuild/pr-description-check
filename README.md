# Pythonista PR Description Check Action

Action which checks whether a specific string is contained within a PR description.  
This is useful for checking whether certain conditions have been met, e.g. signing an agreement.

## To Use:

**Create a workflow:**

```yaml
name: validate-description
on:
  pull_request:
    types:
      - opened
      - edited

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - name: PR Description Check
        uses: pythonistaguild/pr-description-check@v1.0
        with:
          # Check whether the author has enabled this checkbox
          content: "[x] Python is my favorite programming language!"
```
