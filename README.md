# Primitives

If the decision is not in the token, every app will invent it.

Components expose named variants. They read semantic tokens. A later generator may emit only the layout contract in this repo. Hand-built screens and generated screens call the same components.

This is a clean-room proof for [syedarshad.in](https://syedarshad.in).

## In the box

Button, Filter, ChartFrame, DataTable, StreamRow, and EmptyState. Color, space, and type tokens. `parseLayout` and `renderLayout`.

## A consumer cannot

Pass `className`, `style`, or a color. Pass a node type the contract does not name. Put a hex value anywhere but the token source.

## Catalog

```
pnpm install
pnpm storybook
```

MIT License
