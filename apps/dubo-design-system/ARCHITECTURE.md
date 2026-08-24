# Design system architecture

Executable tokens, generated CSS and shared React primitives live in `packages/design-system`.
Documentation, stories and demo composition live in this app. Product data, permissions, routing
and business workflows are intentionally outside this repository.

The app imports the package source during local development and consumes its generated CSS. Build
the package before building the documentation app or Storybook; the root scripts do this
automatically.
