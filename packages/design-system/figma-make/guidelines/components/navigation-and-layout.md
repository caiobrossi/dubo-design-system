# Navigation and layout components

## Navigation hierarchy

1. Use `SideNavigation` for persistent app-level destinations.
2. Use `NavigationMenu` only when a horizontal/navigation-menu pattern is appropriate.
3. Use `Tabs` for sections within the current destination.
4. Use `SegmentControl` for a local view or mode switch, not global navigation.
5. Use `Breadcrumb` when the user needs hierarchical location context.

Do not use cards or buttons as improvised navigation when a navigation component exists.

## Page structure

- Start every operational page with `PageHeader`.
- Use `PageLayout` for the major grid.
- Use `LayoutCard` or `Card` only when content needs a real grouped surface.
- Avoid cards inside cards.
- Keep primary actions stable and predictable across responsive widths.
- Use `Pagination` for long datasets rather than rendering unbounded lists.
