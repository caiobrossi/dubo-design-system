export interface ComponentTokenDocRow {
  token: string;
  value: string;
  usage: string;
}

export interface ComponentTokenDocEntry {
  title?: string;
  inheritsFrom?: string[];
  tokens: ComponentTokenDocRow[];
}

const row = (token: string, value: string, usage: string): ComponentTokenDocRow => ({
  token,
  value,
  usage,
});

const compose = (
  ...groups: ReadonlyArray<ReadonlyArray<ComponentTokenDocRow>>
): ComponentTokenDocRow[] => groups.flatMap((group) => [...group]);

export const sharedComponentTokenGroups = {
  motion: [
    row("--transition-fast", "200ms", "Fast state transition (shared)"),
    row("--transition-easing", "cubic-bezier(...)", "Standard easing (shared)"),
  ],
  motionSurfaceEnter: [
    row("--motion-dropdown-enter-duration", "300ms", "Dropdown/popover enter duration (shared)"),
    row(
      "--motion-dropdown-enter-easing",
      "cubic-bezier(0.16, 1, 0.3, 1)",
      "Dropdown/popover enter easing (shared)"
    ),
    row("--motion-dropdown-enter-scale-from", "0.95", "Dropdown/popover initial scale (shared)"),
  ],
  motionTooltip: [
    row("--motion-tooltip-enter-duration", "200ms", "Tooltip enter duration (shared)"),
    row(
      "--motion-tooltip-enter-easing",
      "cubic-bezier(0.16, 1, 0.3, 1)",
      "Tooltip enter easing (shared)"
    ),
    row("--motion-tooltip-exit-duration", "150ms", "Tooltip exit duration (shared)"),
    row(
      "--motion-tooltip-exit-easing",
      "cubic-bezier(0.4, 0, 1, 1)",
      "Tooltip exit easing (shared)"
    ),
    row("--motion-tooltip-enter-x-from", "-4px", "Tooltip initial horizontal offset (shared)"),
  ],
  motionOverlay: [
    row("--motion-overlay-enter-duration", "300ms", "Overlay enter duration (shared)"),
    row("--motion-overlay-enter-easing", "ease-out", "Overlay enter easing (shared)"),
    row("--motion-overlay-exit-duration", "150ms", "Overlay exit duration (shared)"),
    row("--motion-overlay-exit-easing", "ease-in", "Overlay exit easing (shared)"),
    row("--motion-modal-enter-duration", "500ms", "Modal panel enter duration (shared)"),
    row(
      "--motion-modal-enter-easing",
      "cubic-bezier(0.16, 1, 0.3, 1)",
      "Modal panel enter easing (shared)"
    ),
    row("--motion-modal-enter-scale-from", "0.92", "Modal panel initial scale (shared)"),
    row("--motion-modal-enter-y-from", "20px", "Modal panel initial Y offset (shared)"),
  ],
  motionEaseOut: [
    row("--transition-fast", "200ms", "Fast state transition (shared)"),
    row("--transition-easing-out", "ease-out", "Ease-out transition for subtle motion (shared)"),
  ],
  focus: [row("--focus-ring", "brand-500", "Focus ring color (shared)")],
  focusWithOffset: [
    row("--focus-ring", "brand-500", "Focus ring color (shared)"),
    row("--focus-ring-offset", "2px", "Focus ring offset (shared)"),
  ],
  disabled: [row("--disabled-opacity", "0.40", "Disabled state opacity (shared)")],
  surface: [
    row("--color-bg-surface", "slate-0 / graphite-800", "Surface background (shared)"),
    row("--color-border", "slate-200 / graphite-700", "Surface border (shared)"),
  ],
  surfaceText: [
    row("--color-text-primary", "slate-900 / graphite-50", "Primary text color (shared)"),
    row("--color-text-secondary", "slate-600 / graphite-300", "Secondary text color (shared)"),
    row("--color-text-muted", "slate-400 / graphite-500", "Muted text/icon color (shared)"),
  ],
  elevatedSurface: [
    row("--surface-elevated-bg", "slate-0 / graphite-800", "Elevated background recipe (shared)"),
    row("--surface-elevated-border", "slate-200 / graphite-700", "Elevated border recipe (shared)"),
    row("--shadow-md", "0 4px 12px ...", "Elevated shadow (shared)"),
  ],
  glassSurface: [
    row("--glass-bg-light", "oklch(1 0 0 / 0.72)", "Frosted surface background (shared)"),
    row("--glass-border-light", "oklch(1 0 0 / 0.30)", "Frosted surface border (shared)"),
    row("--glass-blur-md", "blur(16px)", "Frosted backdrop blur (shared)"),
    row("--glass-saturate", "saturate(180%)", "Frosted backdrop saturate (shared)"),
    row("--shadow-lg", "0 8px 24px ...", "Large overlay shadow (shared)"),
    row("--shadow-xl", "0 7px 10px ..., 0 40px 80px ...", "Strong frosted overlay shadow (shared)"),
  ],
  overlayGlassSurface: [
    row(
      "--overlay-glass-bg",
      "Derived from --color-bg-surface + transparency",
      "Dropdown/popover frosted glass background"
    ),
    row(
      "--overlay-glass-border",
      "Derived from --color-border-strong",
      "Dropdown/popover frosted glass border"
    ),
    row("--overlay-glass-border-width", "0.5px", "Dropdown/popover border width"),
    row("--overlay-glass-width-wide", "320px", "Wider popover width option"),
    row("--overlay-glass-blur", "Uses --glass-blur-md", "Dropdown/popover backdrop blur"),
    row("--overlay-glass-saturate", "Uses --glass-saturate", "Dropdown/popover backdrop saturate"),
    row("--overlay-glass-radius", "Uses --radius-scale-2xl", "Dropdown/popover panel radius"),
    row("--overlay-glass-shadow", "Uses --shadow-lg", "Dropdown/popover shadow"),
  ],
  overlaySurface: [
    row("--color-bg-surface", "slate-0 / graphite-800", "Overlay surface background (shared)"),
    row("--color-border", "slate-200 / graphite-700", "Overlay border (shared)"),
    row("--shadow-lg", "0 8px 24px ...", "Overlay shadow (shared)"),
  ],
  invertedSurface: [
    row("--color-bg-inverted", "slate-900 / graphite-50", "Inverted background (shared)"),
    row("--color-text-inverted", "slate-0 / graphite-950", "Inverted text color (shared)"),
  ],
  controlHeights: [
    row("--height-control-sm", "32px", "Small control height (shared)"),
    row("--height-control-md", "40px", "Default control height (shared)"),
    row("--height-control-lg", "40px", "Large control height (shared)"),
  ],
  controlPill: [row("--radius-control-pill", "9999px", "Pill control radius (shared)")],
  controlSoft: [row("--radius-control-soft", "12px", "Soft control radius (shared)")],
  controlIconScale: [
    row("--icon-size-sm", "12px", "Small icon size (shared)"),
    row("--icon-size-md", "16px", "Default icon size (shared)"),
    row("--icon-size-lg", "20px", "Large icon size (shared)"),
  ],
  bodyRoles: [
    row("--type-body-sm-*", "12px / 1.5", "Small body typography role (shared)"),
    row("--type-body-md-*", "14px / 1.5", "Medium body typography role (shared)"),
    row("--type-body-lg-*", "16px / 1.5", "Large body typography role (shared)"),
  ],
  labelRoles: [
    row(
      "--type-body-md-* + --font-weight-400",
      "14px / 400 / 1.5",
      "Small label typography role (shared)"
    ),
    row(
      "--type-body-md-* + --font-weight-400",
      "14px / 400 / 1.5",
      "Default label typography role (shared)"
    ),
  ],
  headingRoles: [
    row(
      "--type-heading-4-* + --font-weight-400",
      "16px / 400 / 1.25 / 0em",
      "Small heading typography role (shared)"
    ),
    row(
      "--type-heading-3-* + --font-weight-400",
      "18px / 400 / 1.333333 / 0em",
      "Medium heading typography role (shared)"
    ),
    row(
      "--type-heading-2-* + --font-weight-300",
      "20px / 300 / 1.25 / 0em",
      "Large heading typography role (shared)"
    ),
  ],
  fieldTextRoles: [
    row(
      "--type-body-md-* + --font-weight-400",
      "14px / 400 / 1.5",
      "Field label typography role (shared)"
    ),
    row(
      "--type-body-sm-* + --font-weight-400",
      "12px / 400 / 1.5",
      "Helper/description typography role (shared)"
    ),
  ],
  fieldBase: [
    row("--color-bg-input", "slate-100 / graphite-800", "Field background (shared)"),
    row("--color-bg-input-hover", "slate-200 / graphite-700", "Field hover background (shared)"),
    row("--color-border-input", "slate-500 / graphite-400", "Field border (shared)"),
    row(
      "--color-border-interactive",
      "slate-500 / graphite-400",
      "Darker interactive border (shared)"
    ),
    row("--color-border-focus", "brand-500", "Field focus border (shared)"),
    row("--color-text-primary", "slate-900 / graphite-50", "Field value color (shared)"),
    row("--color-text-muted", "slate-400 / graphite-500", "Placeholder/helper color (shared)"),
  ],
  fieldSelection: [
    row("--color-border-active", "brand-500", "Selected control border (shared)"),
    row("--color-bg-active", "brand-500", "Selected control fill (shared)"),
    row("--color-bg-active-hover", "brand-600", "Selected control hover fill (shared)"),
    row("--color-text-on-brand", "white", "Foreground on active brand fill (shared)"),
  ],
  interactiveSurface: [
    row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Hover surface state (shared)"),
    row("--color-pressed", "slate-900 @ 10% / graphite-50 @ 21%", "Pressed surface state (shared)"),
    row("--color-text-primary", "slate-900 / graphite-50", "Active/hover text color (shared)"),
    row("--color-text-secondary", "slate-600 / graphite-300", "Resting text color (shared)"),
  ],
  selectionPalette: [
    row("--color-brand", "brand-500", "Selected/accent color (shared)"),
    row("--color-brand-hover", "brand-600", "Accent hover color (shared)"),
    row("--color-brand-active", "brand-700", "Accent active color (shared)"),
    row("--color-brand-subtle", "brand-50", "Selected subtle background (shared)"),
    row("--color-text-on-brand", "white", "Text on brand surface (shared)"),
  ],
  statusSubtle: [
    row("--status-success-subtle-*", "success recipe", "Success subtle recipe (shared)"),
    row("--status-warning-subtle-*", "warning recipe", "Warning subtle recipe (shared)"),
    row("--status-danger-subtle-*", "danger recipe", "Danger subtle recipe (shared)"),
    row("--status-info-subtle-*", "info recipe", "Info subtle recipe (shared)"),
    row("--status-peach-subtle-*", "peach recipe", "Warm expressive secondary recipe (shared)"),
    row("--status-sky-subtle-*", "sky recipe", "Calm expressive blue recipe (shared)"),
  ],
  statusStrong: [
    row("--status-success-strong-*", "success recipe", "Success strong recipe (shared)"),
    row("--status-warning-strong-*", "warning recipe", "Warning strong recipe (shared)"),
    row("--status-danger-strong-*", "danger recipe", "Danger strong recipe (shared)"),
    row("--status-info-strong-*", "info recipe", "Info strong recipe (shared)"),
    row("--status-peach-strong-*", "peach recipe", "Warm expressive strong recipe (shared)"),
    row("--status-sky-strong-*", "sky recipe", "Calm expressive strong recipe (shared)"),
  ],
  statusExtended: [
    row("--status-success-subtle-*", "success recipe", "Success subtle recipe (shared)"),
    row("--status-warning-subtle-*", "warning recipe", "Warning subtle recipe (shared)"),
    row("--status-danger-subtle-*", "danger recipe", "Danger subtle recipe (shared)"),
    row("--status-info-subtle-*", "info recipe", "Info subtle recipe (shared)"),
    row("--status-success-strong-*", "success recipe", "Success strong recipe (shared)"),
    row("--status-warning-strong-*", "warning recipe", "Warning strong recipe (shared)"),
    row("--status-danger-strong-*", "danger recipe", "Danger strong recipe (shared)"),
    row("--status-info-strong-*", "info recipe", "Info strong recipe (shared)"),
    row("--status-peach-*", "peach recipe", "Warm expressive secondary recipe (shared)"),
    row("--status-sky-*", "sky recipe", "Calm expressive blue recipe (shared)"),
    row("--status-accent-*", "accent recipe", "Accent recipe for decorative badges (shared)"),
    row("--status-cyan-*", "cyan recipe", "Cyan recipe for decorative badges (shared)"),
    row(
      "--surface-gradient-product-*",
      "product gradient recipe",
      "Canonical Dubo expressive gradient surface (shared)"
    ),
    row(
      "--surface-gradient-sunrise-*",
      "sunrise gradient recipe",
      "Classic Dubo sunrise gradient surface (shared)"
    ),
    row(
      "--surface-gradient-warm-tint-*",
      "warm tint gradient recipe",
      "Classic warm editorial gradient surface (shared)"
    ),
  ],
  tabularText: [
    row("--color-text-primary", "slate-900 / graphite-50", "Table heading/value color (shared)"),
    row(
      "--color-text-secondary",
      "slate-600 / graphite-300",
      "Table helper/caption color (shared)"
    ),
    row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Row hover background (shared)"),
    row("--color-border", "slate-200 / graphite-700", "Grid and divider color (shared)"),
  ],
  calendarPalette: [
    row("--color-brand", "brand-500", "Selected day/focus accent (shared)"),
    row("--color-brand-hover", "brand-600", "Selected day hover color (shared)"),
    row("--color-brand-subtle", "brand-50", "Range/today subtle background (shared)"),
    row("--color-text-on-brand", "white", "Selected day text (shared)"),
    row("--color-text-primary", "slate-900 / graphite-50", "Day text color (shared)"),
    row(
      "--color-text-secondary",
      "slate-600 / graphite-300",
      "Navigation text/icon color (shared)"
    ),
    row("--color-text-muted", "slate-400 / graphite-500", "Weekday/outside day color (shared)"),
  ],
} as const satisfies Record<string, ReadonlyArray<ComponentTokenDocRow>>;

const {
  bodyRoles,
  calendarPalette,
  controlHeights,
  controlIconScale,
  controlPill,
  controlSoft,
  disabled,
  elevatedSurface,
  fieldBase,
  fieldSelection,
  focus,
  focusWithOffset,
  glassSurface,
  overlayGlassSurface,
  interactiveSurface,
  invertedSurface,
  fieldTextRoles,
  labelRoles,
  motion,
  motionOverlay,
  motionSurfaceEnter,
  motionTooltip,
  motionEaseOut,
  overlaySurface,
  selectionPalette,
  statusExtended,
  statusSubtle,
  surface,
  surfaceText,
  tabularText,
} = sharedComponentTokenGroups;

export const componentTokenDocs = {
  alert: {
    title: "Design Tokens",
    inheritsFrom: ["surface", "status", "typography", "interaction"],
    tokens: compose(
      [
        row("--radius-control-soft", "12px", "Alert container radius (shared)"),
        row("--type-body-md-* + --font-weight-600", "14px / 600 / 1.5", "Title typography role"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Description typography role"),
        row("--space-4", "16px", "Horizontal padding"),
        row("--space-3", "12px", "Vertical padding and icon gap"),
        row("--space-2", "8px", "Action button gap"),
        row("--space-1", "4px", "Gap between title and description"),
        row("--icon-size-lg", "20px", "Icon size (auto-column)"),
      ],
      surface,
      surfaceText,
      statusSubtle,
      [
        row("--color-bg-inverted", "slate-900 / graphite-50", "Invert variant background"),
        row("--color-on-dark", "slate-0", "Invert variant text"),
        row("--color-info-strong", "brand-500", "Info variant icon and text"),
      ],
      motion
    ),
  },
  "alert-dialog": {
    title: "Design Tokens",
    inheritsFrom: ["dialog", "button/destructive"],
    tokens: compose(
      overlaySurface,
      surfaceText,
      [
        row("--radius-scale-3xl", "32px", "Dialog radius"),
        row("--space-2", "8px", "Header stack gap"),
        row("--space-3", "12px", "Footer action gap"),
        row("--space-6", "24px", "Dialog outer padding"),
        row(
          "--type-heading-4-* + --font-weight-400",
          "16px / 400 / 1.25 / 0em",
          "Dialog title role"
        ),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Dialog description role"),
        row("--color-danger", "error-600", "Destructive action background via button recipe"),
        row("--color-text-on-brand", "white", "Destructive action foreground via button recipe"),
      ],
      focusWithOffset,
      motion,
      motionOverlay
    ),
  },
  avatar: {
    title: "Design Tokens",
    inheritsFrom: ["surface", "status", "typography"],
    tokens: compose(
      [
        row("--avatar-group-overlap", "-8px", "Negative overlap for avatar groups"),
        row("Primitive: avatar sizes", "24 / 32 / 40 / 48 / 56px", "Avatar size scale"),
        row("Primitive: status dot", "12px", "Online/busy badge size"),
        row("--type-body-sm-size", "12px", "Small avatar initials role"),
        row("--type-body-md-size", "14px", "Default avatar initials role"),
        row("--type-body-md-size", "14px", "Large avatar initials role"),
        row("--type-heading-3-size", "20px", "XL avatar initials role"),
        row("--type-heading-2-size", "24px", "2XL avatar initials role"),
      ],
      surface,
      [
        row("--color-brand-subtle", "brand-50", "Brand avatar background"),
        row("--color-brand", "brand-500", "Brand avatar text"),
        row("--color-bg-subtle", "slate-50 / graphite overlay", "Neutral avatar background"),
        row("--color-text-secondary", "slate-600 / graphite-300", "Neutral avatar text"),
        row("--color-success", "lime-700 / lime-300", "Online status badge"),
        row("--color-border-strong", "slate-300 / graphite-600", "Offline badge/ring"),
        row("--color-danger", "tomato-700 / tomato-300", "Busy status badge"),
      ]
    ),
  },
  badge: {
    title: "Design Tokens",
    inheritsFrom: ["status", "typography", "interaction"],
    tokens: compose(
      [
        row("Primitive: height", "20px / 24px", "Small and default badge height"),
        row(
          "Primitive: padding-x",
          "8px / 2px",
          "Inline padding, reduced when avatar/close is present"
        ),
        row("Primitive: gap-1", "4px", "Gap between icon, label, avatar, and close"),
        row("--radius-control-pill", "9999px", "Pill badge radius (shared)"),
        row("--type-body-sm-size", "12px", "Small badge typography role"),
        row("--type-body-md-size", "14px", "Default badge typography role"),
        row("--font-weight-400", "400", "Badge label weight role"),
        row("--icon-size-sm", "16px", "Small badge icon size"),
        row("--icon-size-md", "16px", "Default badge icon size"),
      ],
      statusExtended,
      focus,
      motion
    ),
  },
  button: {
    title: "Design Tokens",
    inheritsFrom: ["control", "selection", "interaction"],
    tokens: compose(
      controlHeights,
      controlPill,
      controlIconScale,
      labelRoles,
      [
        row("--space-3", "12px", "Small horizontal padding"),
        row("--space-4", "16px", "Default horizontal padding"),
        row("--space-5", "20px", "Large horizontal padding"),
        row("--color-brand-hover", "brand-600", "Primary resting background"),
        row("--color-brand", "brand-500", "Primary hover background and link color"),
        row("--color-brand-active", "brand-700", "Primary active background and link active color"),
        row("--color-text-on-brand", "white", "Primary foreground color"),
        row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Secondary resting background"),
        row(
          "--color-pressed",
          "slate-900 @ 10% / graphite-50 @ 21%",
          "Secondary, outline, and ghost active state"
        ),
        row("--color-border", "slate-200 / graphite-700", "Lighter shared border color"),
        row(
          "--color-border-interactive",
          "slate-500 / graphite-400",
          "Outline and interactive border color"
        ),
        row("--color-text-primary", "slate-900 / graphite-50", "Secondary and outline text"),
        row("--color-text-secondary", "slate-600 / graphite-300", "Ghost resting text"),
        row("--color-danger", "tomato-700", "Destructive background"),
        row(
          "--status-danger-strong-border-accent",
          "tomato-900",
          "Destructive hover and active background"
        ),
        row("--btn-primary-shadow", "brand depth recipe", "Primary resting shadow"),
        row("--btn-primary-shadow-hover", "brand glow recipe", "Primary hover shadow"),
        row("--btn-primary-scale-hover", "1.03", "Primary hover scale"),
        row("--btn-primary-scale-active", "0.97", "Primary active scale"),
        row("--btn-destructive-shadow", "danger depth recipe", "Destructive shadow"),
      ],
      focusWithOffset,
      disabled,
      motion
    ),
  },
  calendar: {
    title: "Design Tokens",
    inheritsFrom: ["surface", "selection", "status", "interaction"],
    tokens: compose(
      calendarPalette,
      surface,
      [
        row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Day hover state"),
        row("--color-pressed", "slate-900 @ 10% / graphite-50 @ 21%", "Day pressed state"),
        row("--color-success", "lime-700", "Availability indicator"),
        row("--color-warning", "orange-700", "Partial availability indicator"),
        row("--color-danger", "tomato-700", "Unavailable indicator"),
        row("--color-info-strong", "brand-600", "Info indicator"),
        row("--radius-scale-md", "8px", "Day button radius"),
        row("--radius-scale-lg", "12px", "Calendar container radius"),
        row("Primitive: day cell", "40px", "Day width and height"),
      ],
      focus,
      disabled,
      motion
    ),
  },
  card: {
    title: "Design Tokens",
    inheritsFrom: ["surface", "glass", "typography"],
    tokens: compose(
      [
        row("--surface-card-bg", "slate-0 / graphite-800", "Card surface recipe"),
        row("--surface-card-muted-bg", "slate-100 / graphite-50 @ 5%", "Muted card surface recipe"),
        row("--surface-card-border", "slate-200 / graphite-700", "Card border recipe"),
        row(
          "--surface-gradient-product-*",
          "peach → sky expressive gradient",
          "Warm branded hover/product gradient recipe"
        ),
        row(
          "--surface-gradient-sunrise-*",
          "sunrise gradient",
          "Classic welcoming gradient for onboarding/explanatory surfaces"
        ),
        row(
          "--surface-gradient-warm-tint-*",
          "warm editorial tint",
          "Classic warm hover tint for patient groups, templates, and similar cards"
        ),
        row("--radius-scale-2xl", "24px", "Card radius (shared)"),
        row("--surface-card-shadow", "none", "Card shadow disabled"),
        row("--shadow-xl", "0 7px 10px ..., 0 40px 80px ...", "Strong card/popover shadow option"),
        row(
          "--type-heading-3-* + --font-weight-400",
          "18px / 400 / 1.333333 / 0em",
          "Card title role"
        ),
        row("--type-body-md-*", "16px / 400 / 1.5", "Body content role"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Supporting metadata role"),
      ],
      surfaceText,
      glassSurface
    ),
  },
  checkbox: {
    title: "Design Tokens",
    inheritsFrom: ["form-field", "selection-control", "label"],
    tokens: compose(
      fieldTextRoles,
      fieldSelection,
      [
        row("Primitive: box size", "20px", "Checkbox square size"),
        row("Primitive: border width", "1px", "Checkbox border thickness"),
        row("--radius-scale-sm", "6px", "Checkbox corner radius"),
        row("--color-bg-surface", "slate-0 / graphite-800", "Unchecked surface"),
        row("--color-border-interactive", "slate-500 / graphite-400", "Unchecked border"),
        row("--color-danger", "tomato-700", "Invalid border and error text"),
      ],
      focusWithOffset,
      disabled,
      motion
    ),
  },
  command: {
    title: "Design Tokens",
    inheritsFrom: ["form-field", "overlay", "typography"],
    tokens: compose(
      [
        row("--height-control-md", "40px", "Search input height"),
        row("--radius-scale-3xl", "32px", "Panel radius shared with Select dropdown"),
        row("--radius-control-pill", "9999px", "Command item radius"),
        row("--space-2", "8px", "Section insets and separator spacing"),
        row("--space-3", "12px", "Search field and item horizontal padding"),
        row("--space-6", "24px", "Empty state vertical padding"),
      ],
      [
        row("--type-body-md-*", "16px / 400 / 1.5", "Input, item, and empty state role"),
        row(
          "--type-body-sm-* + --font-weight-400",
          "12px / 400 / 1.5",
          "Shortcut and group heading size"
        ),
        row("--font-weight-400", "500", "Group heading emphasis"),
        row("--icon-size-md", "16px", "Search icon size"),
      ],
      glassSurface,
      surfaceText,
      fieldBase,
      [
        row(
          "--color-hover",
          "slate-900 @ 5% / graphite-50 @ 5%",
          "Active item hover/selection state"
        ),
      ],
      disabled,
      motion
    ),
  },
  "field-trigger": {
    title: "Design Tokens",
    inheritsFrom: ["field-base", "interactive-surface", "focus"],
    tokens: compose(
      controlHeights,
      [
        row("--radius-scale-xl", "16px", "Floating trigger radius shared with floating Select"),
        row("--icon-size-md", "16px", "Trailing chevron or affordance icon size"),
      ],
      [
        row("--space-2", "8px", "Vertical padding inside the trigger shell"),
        row("--space-4", "16px", "Horizontal padding and trailing icon inset"),
        row("--space-5", "20px", "Reserved top offset when the floating label compacts"),
      ],
      [
        row("--type-body-md-*", "16px / 400 / 1.5", "Value text role"),
        row(
          "--type-body-sm-* + --font-weight-400",
          "12px / 400 / 1.5",
          "Compact floating label role"
        ),
        row("--font-weight-400", "500", "Compact label emphasis"),
      ],
      fieldBase,
      surfaceText,
      interactiveSurface,
      focusWithOffset,
      disabled,
      motion
    ),
  },
  autocomplete: {
    title: "Design Tokens",
    inheritsFrom: ["field-trigger", "overlay", "selection", "label"],
    tokens: compose(
      controlHeights,
      [
        row("--radius-control-input", "8px", "Field radius shared with Input and Select"),
        row("--radius-control-pill", "9999px", "Option row radius shared with Command"),
      ],
      [
        row(
          "--type-body-md-*",
          "16px / 400 / 1.5",
          "Input text, option labels, and empty state role"
        ),
        row(
          "--type-body-sm-* + --font-weight-400",
          "12px / 400 / 1.5",
          "Compact floating label and group heading role"
        ),
        row("--font-weight-400", "500", "Group heading emphasis"),
      ],
      [
        row("--icon-size-md", "16px", "Chevron, check, and field icon size"),
        row("--icon-size-sm", "12px", "Clear icon size"),
      ],
      [
        row("--space-1", "4px", "Inline control gap"),
        row("--space-2", "8px", "Field padding and popup inset"),
        row("--space-3", "12px", "Item horizontal padding and helper rhythm"),
        row("--space-6", "24px", "Empty state vertical padding"),
      ],
      surface,
      surfaceText,
      focusWithOffset,
      disabled,
      motion,
      glassSurface
    ),
  },
  combobox: {
    title: "Design Tokens",
    inheritsFrom: ["field-trigger", "overlay", "selection", "label"],
    tokens: compose(
      controlHeights,
      [
        row("--radius-control-input", "8px", "Trigger radius shared with Select"),
        row("--radius-control-pill", "9999px", "Option radius shared with Select"),
      ],
      [row("--type-body-md-*", "16px / 400 / 1.5", "Trigger, search, and option text role")],
      [
        row(
          "--type-body-sm-* + --font-weight-400",
          "12px / 400 / 1.5",
          "Small trigger badge and group heading role"
        ),
      ],
      [row("--font-weight-400", "500", "Group heading and compact badge emphasis")],
      [row("--icon-size-md", "16px", "Chevron/check/search icon size (shared)")],
      [row("--icon-size-sm", "12px", "Compact badge/checkmark size (shared)")],
      [row("--space-1", "4px", "Trigger gap shared with Select")],
      [row("--space-2", "8px", "Default trigger padding")],
      [row("--space-3", "12px", "Trigger/input horizontal padding")],
      [row("--space-4", "16px", "Large trigger horizontal padding")],
      [
        row("--color-brand", "brand-500", "Selected option accent"),
        row("--color-text-on-brand", "white", "Selected badge/check foreground"),
      ],
      surface,
      surfaceText,
      focusWithOffset,
      disabled,
      motion,
      glassSurface
    ),
  },
  "data-table": {
    title: "Design Tokens",
    inheritsFrom: ["table"],
    tokens: compose(
      tabularText,
      [
        row("--color-bg-subtle", "slate-50 / graphite overlay", "Row surface background"),
        row(
          "--color-bg-subtle-hover",
          "slate-100 / graphite overlay",
          "Hovered/selected row background"
        ),
      ],
      motion
    ),
  },
  "data-display": {
    title: "Design Tokens",
    inheritsFrom: ["surface", "typography"],
    tokens: compose(
      [
        row("--radius-scale-xl", "16px", "Outer container radius"),
        row("--height-control-md", "40px", "Default row height"),
        row("--height-control-lg", "40px", "Large row height"),
        row("--space-4", "16px", "Row horizontal padding and content gap"),
        row("--space-3", "12px", "Multiline top/bottom padding"),
        row("--type-body-md-*", "16px / 400 / 1.5", "Label role"),
        row("--type-body-lg-* + --font-weight-500", "16px / 500 / 1.5", "Value role"),
      ],
      surface,
      surfaceText,
      [row("--color-border", "slate-200 / graphite-700", "Wrapper border and row dividers")]
    ),
  },
  "drag-and-drop": {
    title: "Design Tokens",
    inheritsFrom: ["surface", "typography", "interaction", "motion"],
    tokens: compose(
      [
        row("--radius-scale-xl", "16px", "Item container radius"),
        row("--space-4", "16px", "Card padding"),
        row("--space-3", "12px", "Card gap and stack spacing"),
        row("--space-2", "8px", "Metadata and badge spacing"),
        row("--type-body-md-* + --font-weight-400", "14px / 400 / 1.5", "Card title role"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Card description role"),
        row("--type-body-sm-* + --font-weight-400", "12px / 400 / 1.5", "Metadata and badge role"),
      ],
      surface,
      surfaceText,
      interactiveSurface,
      controlIconScale,
      focusWithOffset,
      disabled,
      motion
    ),
  },
  "dental-selector": {
    title: "Design Tokens",
    inheritsFrom: ["field-trigger", "combobox", "overlay", "selection"],
    tokens: compose(
      controlHeights,
      [
        row("--radius-control-pill", "9999px", "Tooth buttons and option rows"),
        row("--radius-scale-3xl", "32px", "Popover panel radius"),
      ],
      [
        row("--space-1", "4px", "Tooth grid gap"),
        row("--space-2", "8px", "Popover inset and section spacing"),
        row("--space-3", "12px", "Quadrant label and row padding"),
      ],
      [
        row("--type-body-sm-*", "14px / 400 / 1.5", "Tooth value and surface label role"),
        row("--type-body-sm-* + --font-weight-400", "12px / 400 / 1.5", "Quadrant heading role"),
        row("--font-weight-400", "500", "Quadrant heading and tooth emphasis"),
      ],
      [
        row("--color-brand", "brand-500", "Selected tooth/surface accent"),
        row("--color-text-on-brand", "white", "Selected tooth foreground"),
      ],
      surface,
      surfaceText,
      focusWithOffset,
      motion,
      glassSurface
    ),
  },
  "empty-state": {
    title: "Design Tokens",
    inheritsFrom: ["typography", "action", "spacing"],
    tokens: compose(
      [
        row("--size-32", "128px", "Empty-state illustration size"),
        row("--size-25", "100px", "Legacy alias only — illustration now stays 128px"),
        row("--space-4", "16px", "Default stack gap"),
        row("--space-3", "12px", "Compact stack gap"),
        row("--type-body-lg-* + --font-weight-500", "16px / 500 / 1.5", "Title role"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Description role"),
      ],
      surfaceText
    ),
  },
  "floating-panel": {
    title: "Design Tokens",
    inheritsFrom: ["surface/elevated", "typography", "motion", "action"],
    tokens: compose(
      [
        row("--floating-panel-width", "420px", "Expanded floating panel width"),
        row("--floating-panel-minimized-width", "320px", "Minimized summary width"),
        row("--floating-panel-height-default", "520px", "Default panel height"),
        row("--floating-panel-height-tall", "640px", "Tall panel height for chat-like flows"),
        row("--surface-elevated-radius", "24px", "Expanded floating panel radius"),
        row("--radius-scale-2xl", "24px", "Minimized card radius"),
        row("--space-4", "16px", "Anchor offset, body padding, and header spacing"),
        row("--space-3", "12px", "Header/footer padding and minimized card spacing"),
        row(
          "--type-body-md-* + --font-weight-400",
          "14px / 400 / 1.5",
          "Expanded panel title role"
        ),
        row("--type-body-md-* + --font-weight-400", "14px / 400 / 1.5", "Minimized title role"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Description and supporting content"),
      ],
      elevatedSurface,
      surfaceText,
      controlSoft,
      controlIconScale,
      focusWithOffset,
      motion
    ),
  },
  "stats-bar": {
    title: "Design Tokens",
    inheritsFrom: ["surface", "typography", "status"],
    tokens: compose(
      [
        row("--radius-scale-xl", "16px", "Outer stats surface radius"),
        row("--size-12", "48px", "Default illustration container size"),
        row("--size-20", "80px", "Large illustration container size"),
        row("--space-5", "20px", "Metric cell padding"),
        row("--space-4", "16px", "Illustration-to-content gap"),
        row("--space-1", "4px", "Value-to-comparison rhythm"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Metric label role"),
        row("--font-weight-300", "300", "Metric value weight"),
        row("stats value", "60px / 300 / 1.0", "Metric value role"),
        row("--type-body-sm-* + --font-weight-400", "12px / 400 / 1.5", "Comparison role"),
      ],
      surface,
      surfaceText,
      [row("--color-border", "slate-200 / graphite-700", "Built-in metric separators")],
      [
        row("--color-success", "success-600 / success-200", "Positive comparison color"),
        row("--color-danger", "error-600 / error-200", "Negative comparison color"),
      ],
      controlIconScale,
      motion
    ),
  },
  "weekday-picker": {
    title: "Design Tokens",
    inheritsFrom: ["field", "selection", "motion"],
    tokens: compose(
      [
        row("--radius-control-pill", "9999px", "Outer weekly container radius"),
        row("--radius-scale-lg", "12px", "Selected day pill radius"),
        row("--height-control-md", "40px", "Navigation button size"),
        row("--height-control-lg", "40px", "Day button height"),
        row("--space-1", "4px", "Outer padding and pill spacing"),
        row("--space-2", "8px", "Day button horizontal padding"),
        row("--type-body-md-* + --font-weight-600", "14px / 600 / 1.5", "Day number role"),
        row("--type-body-sm-* + --font-weight-400", "12px / 400 / 1.5", "Day label role"),
        row(
          "--color-bg-subtle",
          "slate-50 / graphite overlay",
          "Outer weekly container background"
        ),
        row("--color-border", "slate-200 / graphite-700", "Outer weekly container border"),
      ],
      selectionPalette,
      surface,
      surfaceText,
      controlIconScale,
      disabled,
      motion
    ),
  },
  "date-picker": {
    title: "Design Tokens",
    inheritsFrom: ["field-trigger", "calendar", "overlay"],
    tokens: compose(
      [row("--height-control-md", "40px", "Standard trigger height")],
      [
        row("--radius-control-input", "8px", "Standard trigger radius"),
        row("--radius-scale-xl", "16px", "Floating trigger radius"),
        row("--size-14", "56px", "Floating trigger height"),
        row("--space-2", "8px", "Trigger gap and preset vertical padding"),
        row("--space-3", "12px", "Standard trigger horizontal padding"),
        row("--space-4", "16px", "Floating trigger horizontal padding"),
      ],
      bodyRoles,
      fieldTextRoles,
      fieldBase,
      calendarPalette,
      [row("--color-danger", "tomato-700", "Error border and helper text")],
      focusWithOffset,
      disabled,
      motion,
      glassSurface
    ),
  },
  "date-field": {
    title: "Design Tokens",
    inheritsFrom: ["input", "calendar", "popover"],
    tokens: compose(
      [
        row("--radius-scale-xl", "16px", "Field radius"),
        row("--size-14", "56px", "Field height"),
        row("--space-2", "8px", "Gap between text and trailing actions"),
        row("--space-3", "12px", "Field horizontal padding"),
        row("--space-5", "20px", "Floating content top inset"),
      ],
      bodyRoles,
      fieldTextRoles,
      fieldBase,
      calendarPalette,
      overlayGlassSurface,
      [row("--color-danger", "tomato-700", "Error border and helper text")],
      focusWithOffset,
      disabled,
      motion,
      motionSurfaceEnter
    ),
  },
  dialog: {
    title: "Design Tokens",
    inheritsFrom: ["overlay", "surface", "interaction", "typography"],
    tokens: compose(
      overlaySurface,
      surfaceText,
      [
        row("--radius-scale-2xl", "24px", "Dialog container radius"),
        row("--radius-control-pill", "9999px", "Close affordance radius"),
        row("--space-2", "8px", "Header and footer internal gap"),
        row("--space-4", "16px", "Header and footer padding"),
        row("--space-6", "24px", "Scrollable body padding"),
        row("--size-8", "32px", "Close affordance size"),
        row("--icon-size-md", "16px", "Close icon size"),
        row(
          "--type-heading-3-* + --font-weight-400",
          "18px / 400 / 1.333333 / 0em",
          "Dialog title typography role"
        ),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Dialog description typography role"),
        row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Close button hover state"),
        row(
          "Primitive: max-widths",
          "384 / 512 / 672 / 768px",
          "sm, default, lg, and xl size constraints"
        ),
      ],
      focusWithOffset,
      motion,
      motionOverlay
    ),
  },
  "dropdown-menu": {
    title: "Design Tokens",
    inheritsFrom: ["glass-overlay", "interactive-list"],
    tokens: compose(
      overlayGlassSurface,
      [
        row("--radius-control-pill", "9999px", "Item radius"),
        row("--height-control-sm", "32px", "Minimum item height"),
        row("--space-1", "4px", "Separator margin and indicator inset math"),
        row("--space-2", "8px", "Content padding and item gap"),
        row("--space-3", "12px", "Item and label horizontal padding"),
        row("--overlay-glass-min-width", "192px", "Default dropdown minimum width"),
        row("--overlay-glass-width-compact", "280px", "Compact month-picker width"),
        row("--overlay-glass-width-narrow", "200px", "Narrow people-picker width"),
        row("--overlay-glass-max-height-scroll", "300px", "Scrollable overlay max height"),
        row("--type-body-md-*", "16px / 400 / 1.5", "Menu item typography role"),
        row(
          "--type-body-sm-* + --font-weight-400",
          "12px / 400 / 1.5",
          "Label and shortcut typography role"
        ),
        row("--font-weight-400", "400", "Section label emphasis"),
        row("--icon-size-md", "16px", "Leading, check, and chevron icon size"),
      ],
      [
        row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Item hover state"),
        row("--color-pressed", "slate-900 @ 10% / graphite-50 @ 21%", "Item active state"),
        row("--color-brand", "brand-500", "Checkbox/radio selection accent"),
        row("--color-danger", "tomato-700", "Destructive item color"),
      ],
      surfaceText,
      focusWithOffset,
      disabled,
      motion,
      motionSurfaceEnter
    ),
  },
  "filter-chip": {
    title: "Design Tokens",
    inheritsFrom: ["toggle", "selection", "glass-overlay"],
    tokens: compose(
      controlHeights,
      controlPill,
      [
        row("--type-body-sm-*", "14px / 400 / 1.5", "Compact chip label role"),
        row("--type-body-md-*", "16px / 400 / 1.5", "Default and large chip label role"),
      ],
      [
        row("--icon-size-sm", "12px", "Small icon size"),
        row("--icon-size-md", "16px", "Default icon size"),
        row("--size-4", "16px", "Clear affordance size"),
      ],
      [
        row("--space-2", "8px", "Compact horizontal padding and icon gap"),
        row("--space-3", "12px", "Default horizontal padding"),
        row("--space-4", "16px", "Large horizontal padding"),
      ],
      surface,
      selectionPalette,
      [
        row("--color-text-secondary", "slate-600 / graphite-300", "Idle chip label"),
        row("--color-text-muted", "slate-400 / graphite-500", "Idle chip icon"),
        row("--color-border", "slate-200 / graphite-700", "Idle chip border"),
        row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Idle hover background"),
      ],
      focusWithOffset,
      disabled,
      motion,
      motionSurfaceEnter,
      glassSurface
    ),
  },
  "search-field": {
    title: "Design Tokens",
    inheritsFrom: ["input"],
    tokens: compose(
      controlHeights,
      controlPill,
      bodyRoles,
      [
        row("--space-2", "8px", "Internal horizontal padding via Input"),
        row("--icon-size-md", "16px", "Search icon size"),
        row("--icon-size-sm", "12px", "Clear action icon size"),
      ],
      fieldBase,
      focusWithOffset,
      disabled,
      motion
    ),
  },
  "phone-input-split": {
    title: "Design Tokens",
    inheritsFrom: ["input", "popover", "search-field"],
    tokens: compose(
      [row("--size-14", "56px", "Country trigger and floating phone field height")],
      [row("--radius-scale-xl", "16px", "Country segment and phone field radius")],
      [
        row("--space-1", "4px", "Internal gap between flag, chevron, and field content"),
        row("--space-2", "8px", "Field horizontal padding"),
        row("--space-3", "12px", "Country trigger horizontal padding"),
        row("--space-5", "20px", "Floating label content inset"),
      ],
      bodyRoles,
      [
        row("--icon-size-sm", "12px", "Chevron and clear action icon size"),
        row("--icon-size-md", "16px", "Search field icon size"),
      ],
      fieldBase,
      focusWithOffset,
      disabled,
      motion
    ),
  },
  "date-range-filter-chip": {
    title: "Design Tokens",
    inheritsFrom: ["filter-chip", "date-picker", "button", "separator"],
    tokens: compose(
      controlHeights,
      controlPill,
      bodyRoles,
      fieldBase,
      [
        row("--space-1", "4px", "Preset stack gap and separator offset"),
        row("--space-2", "8px", "Label-to-field gap"),
        row("--space-3", "12px", "Popover padding and field column gap"),
      ],
      focusWithOffset,
      disabled,
      motion
    ),
  },
  "hover-card": {
    title: "Design Tokens",
    inheritsFrom: ["overlay", "glass-overlay", "typography"],
    tokens: compose(
      overlaySurface,
      glassSurface,
      surfaceText,
      [
        row("--radius-scale-xl", "16px", "Hover card radius"),
        row("--space-5", "20px", "Hover card padding"),
      ],
      motion
    ),
  },
  input: {
    title: "Design Tokens",
    inheritsFrom: ["form-field", "label"],
    tokens: compose(
      controlHeights,
      [row("--radius-control-input", "8px", "Standard field radius")],
      [row("--radius-scale-xl", "16px", "Floating field radius")],
      [row("--size-14", "56px", "Floating field height")],
      [
        row("--space-1", "4px", "Gap between icons, text, and clear action"),
        row("--space-2", "8px", "Field horizontal padding"),
        row("--space-5", "20px", "Floating content top inset"),
      ],
      bodyRoles,
      [
        row("--icon-size-md", "16px", "Input icon size"),
        row("--icon-size-sm", "12px", "Clear action icon size"),
      ],
      fieldTextRoles,
      fieldBase,
      [row("--color-danger", "error-600", "Error border and helper text")],
      focusWithOffset,
      disabled,
      motion
    ),
  },
  "input-otp": {
    title: "Design Tokens",
    inheritsFrom: ["form-field"],
    tokens: compose(
      [row("--height-control-md", "40px", "Slot height and width (shared)")],
      [row("--radius-control-input", "8px", "Slot radius")],
      [
        row("--type-body-sm-*", "14px / 400 / 1.5", "Digit text role"),
        row("--font-weight-400", "500", "Digit emphasis"),
      ],
      [row("--space-2", "8px", "Gap between groups and separator")],
      [row("--icon-size-md", "16px", "Separator icon size")],
      fieldBase,
      focusWithOffset,
      disabled,
      motion
    ),
  },
  label: {
    title: "Design Tokens",
    inheritsFrom: ["label", "description"],
    tokens: compose(
      fieldTextRoles,
      [
        row("--color-danger", "error-600", "Required asterisk color"),
        row(
          "--color-text-muted",
          "slate-400 / graphite-500",
          "Optional helper and resting info color"
        ),
        row(
          "--color-text-secondary",
          "slate-600 / graphite-300",
          "Description and info-hover color"
        ),
      ],
      disabled,
      [row("--transition-fast", "200ms", "Info icon hover transition (shared)")]
    ),
  },
  "navigation-menu": {
    title: "Design Tokens",
    inheritsFrom: ["overlay", "selection", "control", "typography"],
    tokens: compose(
      overlaySurface,
      [
        row("--height-control-md", "40px", "Trigger height"),
        row("--radius-control-input", "8px", "Trigger, item, and viewport radius"),
        row("--radius-scale-xs", "4px", "Indicator corner radius"),
        row("--space-1", "4px", "Trigger list gap and chevron offset"),
        row("--space-2", "8px", "Trigger icon gap and item spacing"),
        row("--space-3", "12px", "List item padding"),
        row("--space-4", "16px", "Trigger horizontal padding"),
        row("--size-5", "20px", "Leading icon frame"),
        row("--icon-size-sm", "12px", "Trigger chevron size"),
        row("--icon-size-md", "16px", "Shared trigger/item icon size"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Trigger and item body role"),
        row("--font-weight-400", "500", "Trigger and title emphasis"),
        row("--type-body-sm-size", "12px", "Description/supporting text size"),
        row("--shadow-md", "0 4px 12px ...", "Viewport shadow (shared)"),
      ],
      selectionPalette,
      [row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Trigger and item hover state")],
      surfaceText,
      focusWithOffset,
      motion
    ),
  },
  pagination: {
    title: "Design Tokens",
    inheritsFrom: ["control", "selection"],
    tokens: compose(
      [
        row("--height-control-sm", "32px", "Compact pagination item height"),
        row("--height-control-md", "40px", "Default pagination item height"),
        row("--radius-control-input", "8px", "Pagination item radius"),
        row("--space-1", "4px", "Gap between controls and icon/label pairs"),
        row("--space-3", "12px", "Horizontal item padding"),
      ],
      [
        row(
          "--type-body-sm-* + --font-weight-400",
          "12px / 400 / 1.5",
          "Compact page number typography role"
        ),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Default page number typography role"),
        row("--font-weight-400", "500", "Active and navigational label emphasis"),
        row("--icon-size-md", "16px", "Chevron icon size"),
        row("Primitive: icon button offset", "10px", "Extra inset for previous/next chevrons"),
      ],
      selectionPalette,
      [
        row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Hovered item background"),
        row("--color-text-primary", "slate-900 / graphite-50", "Default page number color"),
        row("--color-text-muted", "slate-400 / graphite-500", "Ellipsis color"),
      ],
      focusWithOffset,
      disabled,
      motion
    ),
  },
  popover: {
    title: "Design Tokens",
    inheritsFrom: ["glass-overlay"],
    tokens: compose(
      overlayGlassSurface,
      [
        row("--overlay-glass-width-default", "280px", "Default popover width"),
        row("--space-4", "16px", "Popover padding"),
        row("--space-3", "12px", "Arrow width"),
        row("--color-text-primary", "slate-900 / graphite-50", "Content text color (shared)"),
      ],
      motion,
      motionSurfaceEnter
    ),
  },
  progress: {
    title: "Design Tokens",
    inheritsFrom: ["status", "control"],
    tokens: compose(
      [
        row("--color-brand", "brand-500", "Default progress fill"),
        row("--color-success", "lime-700", "Success fill"),
        row("--color-warning", "orange-700", "Warning fill"),
        row("--color-danger", "tomato-700", "Danger fill"),
        row("--color-bg-subtle", "slate-50 / graphite overlay", "Track background"),
        row("--radius-control-pill", "9999px", "Track radius (shared)"),
        row("--type-body-md-* + --font-weight-400", "14px / 400 / 1.5", "Label typography role"),
        row(
          "--type-body-sm-* + --font-weight-400",
          "12px / 400 / 1.5",
          "Percentage typography role"
        ),
      ],
      motion
    ),
  },
  "radio-group": {
    title: "Design Tokens",
    inheritsFrom: ["selection-control", "label"],
    tokens: compose(
      fieldTextRoles,
      fieldSelection,
      [
        row("--type-body-md-* + --font-weight-400", "14px / 400 / 1.5", "Group label role"),
        row("--size-5", "20px", "Radio outer size"),
        row("--space-2", "8px", "Stack gap and inner indicator size"),
        row("--space-3", "12px", "Gap between control and copy"),
        row("--space-6", "24px", "Horizontal group spacing"),
        row("--radius-control-pill", "9999px", "Radio shape"),
        row("--color-bg-surface", "slate-0 / graphite-800", "Unchecked surface"),
        row("--color-border-input", "slate-300 / graphite-600", "Unchecked border"),
        row("--color-danger", "error-600", "Invalid border and error text"),
      ],
      focusWithOffset,
      disabled,
      motion
    ),
  },
  resizable: {
    title: "Design Tokens",
    inheritsFrom: ["separator", "interaction"],
    tokens: compose(
      [
        row("--color-border", "slate-200 / graphite-700", "Handle line color"),
        row("--color-border-strong", "slate-300 / graphite-600", "Active handle color"),
        row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Hover state"),
        row("--color-bg-surface", "slate-0 / graphite-800", "Grip background"),
        row("--color-text-muted", "slate-400 / graphite-500", "Grip icon color"),
        row("--radius-scale-xs", "4px", "Grip corner radius"),
        row("--size-3", "12px", "Compact grip side"),
        row("--size-4", "16px", "Long grip side"),
        row("--icon-size-sm", "12px", "Grip icon size"),
      ],
      focusWithOffset,
      motion
    ),
  },
  "scroll-area": {
    title: "Design Tokens",
    inheritsFrom: ["interaction", "surface"],
    tokens: compose(
      [
        row("--color-text-muted", "slate-400 / graphite-500", "Scrollbar thumb color"),
        row("--color-border-strong", "slate-300 / graphite-600", "Scrollbar thumb hover state"),
        row("--color-border", "slate-200 / graphite-700", "Track separator"),
        row("--space-1", "4px", "Default scrollbar thickness"),
        row("--space-2", "8px", "Hover scrollbar thickness"),
      ],
      motion
    ),
  },
  "segment-control": {
    title: "Design Tokens",
    inheritsFrom: ["control", "selection"],
    tokens: compose(
      [
        row("--height-control-sm", "32px", "Small height (shared)"),
        row("--height-control-md", "40px", "Default height (shared)"),
        row("--radius-control-pill", "9999px", "Container and pill radius"),
        row("--segment-padding", "2px", "Container inner padding"),
        row("--space-1", "4px", "Gap between items and between icon/label"),
        row("--space-4", "16px", "Item horizontal padding"),
        row("--segment-pill-shadow", "soft depth recipe", "Active pill shadow"),
      ],
      [
        row("--type-body-md-* + --font-weight-400", "14px / 400 / 1.5", "Active item label role"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Inactive/disabled item label role"),
      ],
      surface,
      interactiveSurface,
      focus,
      disabled,
      motionEaseOut
    ),
  },
  select: {
    title: "Design Tokens",
    inheritsFrom: ["field-trigger", "overlay", "selection", "label"],
    tokens: compose(
      controlHeights,
      [
        row("--radius-control-input", "8px", "Standard trigger radius"),
        row("--radius-scale-xl", "16px", "Floating trigger radius"),
        row("--radius-control-pill", "9999px", "Dropdown item radius"),
        row("--size-14", "56px", "Floating trigger height"),
        row("--space-1", "4px", "Gap between icon, text, and clear action"),
        row("--space-2", "8px", "Trigger padding and floating label inset"),
        row("--space-3", "12px", "Dropdown item padding"),
      ],
      bodyRoles,
      [
        row(
          "--type-body-sm-* + --font-weight-400",
          "12px / 400 / 1.5",
          "Compact floating label and group heading role"
        ),
        row("--font-weight-400", "500", "Compact floating label emphasis"),
        row("--icon-size-md", "16px", "Trigger, chevron, and item icon size"),
        row("--icon-size-sm", "12px", "Clear action icon size"),
      ],
      fieldTextRoles,
      surface,
      selectionPalette,
      [
        row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Hovered option state"),
        row("--color-danger", "error-600", "Error border and helper text"),
        row("--color-text-secondary", "slate-600 / graphite-300", "Placeholder and resting label"),
      ],
      focusWithOffset,
      disabled,
      motion,
      glassSurface
    ),
  },
  "interactive-card": {
    title: "Design Tokens",
    inheritsFrom: ["card", "selection", "motion"],
    tokens: compose(
      [
        row("--color-bg-surface", "slate-0 / graphite-800", "Base card surface"),
        row("--color-border", "slate-200 / graphite-700", "Base card border"),
        row("--radius-scale-xl", "16px", "Card radius (shared)"),
        row("--shadow-md", "0 4px 16px ...", "Link card hover shadow (shared)"),
        row("--space-3", "12px", "Check badge inset"),
        row("--space-4", "16px", "Select mode padding"),
        row("--space-5", "20px", "Link mode padding"),
        row("--size-5", "20px", "Check badge size"),
        row("--icon-size-sm", "12px", "Check icon size"),
        row("--type-body-md-*", "16px / 400 / 1.5", "Title/body typography role"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Supporting text role"),
        row("--type-body-sm-* + --font-weight-400", "12px / 400 / 1.5", "Footer typography role"),
      ],
      surfaceText,
      [
        row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Hover overlay + link gradient"),
        row("--color-brand-subtle", "brand-50", "Selected background"),
        row("--color-brand", "brand-500", "Selected border/check accent"),
        row("--color-text-on-brand", "white", "Check icon on brand"),
        row("scale(1.02)", "CSS transform", "Link card hover scale"),
      ],
      focus,
      disabled,
      motion
    ),
  },
  separator: {
    title: "Design Tokens",
    inheritsFrom: ["surface"],
    tokens: compose(
      [
        row("--color-border", "slate-200 / graphite-700", "Separator color"),
        row("--space-4", "16px", "Gap around centered label"),
        row("--type-body-sm-* + --font-weight-400", "12px / 400 / 1.5", "Centered label role"),
        row("Primitive: 1px", "1px", "Separator thickness"),
      ],
      motion
    ),
  },
  sheet: {
    title: "Design Tokens",
    inheritsFrom: ["dialog", "overlay"],
    tokens: compose(
      overlaySurface,
      surfaceText,
      [
        row("--radius-scale-xl", "16px", "Sheet panel radius"),
        row("--radius-control-soft", "12px", "Close affordance radius"),
        row("--space-1", "4px", "Header title/description gap"),
        row("--space-2", "8px", "Footer action gap"),
        row("--space-4", "16px", "Floating outer inset and footer padding"),
        row("--space-5", "20px", "Header vertical padding"),
        row("--space-6", "24px", "Header/footer horizontal padding"),
        row("--size-8", "32px", "Close affordance size"),
        row("--icon-size-md", "16px", "Close icon size"),
        row(
          "--type-heading-3-* + --font-weight-400",
          "18px / 400 / 1.333333 / 0em",
          "Sheet title typography role"
        ),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Sheet description typography role"),
        row("Primitive: panel width", "450px", "Default left/right sheet width"),
        row("Primitive: close inset", "28px", "Close button inset from the panel edge"),
      ],
      focus,
      motion
    ),
  },
  skeleton: {
    title: "Design Tokens",
    inheritsFrom: ["surface", "interaction"],
    tokens: compose(
      [
        row("--color-bg-input", "slate-100 / graphite-800", "Skeleton base fill"),
        row("--color-hover", "slate-900 @ 5% / graphite-50 @ 5%", "Shimmer highlight tint"),
        row("--radius-control-input", "8px", "Text skeleton radius"),
        row("--radius-scale-xl", "16px", "Card skeleton radius"),
        row("--size-5", "20px", "Default text skeleton height"),
        row("--size-10", "40px", "Default circle skeleton size"),
        row("--size-24", "96px", "Default card skeleton height"),
      ],
      motion
    ),
  },
  sonner: {
    title: "Design Tokens",
    inheritsFrom: ["elevated-surface", "status", "typography"],
    tokens: compose(
      elevatedSurface,
      controlSoft,
      [
        row("--type-body-md-* + --font-weight-600", "14px / 600 / 1.5", "Toast title role"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Toast description role"),
        row("--icon-size-lg", "20px", "Status icon size"),
      ],
      statusSubtle,
      focus,
      motion
    ),
  },
  spinner: {
    title: "Design Tokens",
    inheritsFrom: ["status", "interaction"],
    tokens: compose(
      [
        row("--color-brand", "brand-500", "Brand bar color"),
        row("--color-text-muted", "slate-400 / graphite-500", "Default muted bar color"),
        row(
          "--size-4 / --size-6 / --size-8 / --size-10",
          "16 / 24 / 32 / 40px",
          "Spinner size scale"
        ),
        row("Intrinsic bar gap", "max(1px, 6.25%)", "Responsive wave bar spacing"),
      ],
      motion
    ),
  },
  stepper: {
    title: "Design Tokens",
    inheritsFrom: ["status", "selection", "interaction"],
    tokens: compose(
      [
        row("--color-text-primary", "slate-900 / graphite-50", "Active step title"),
        row("--color-text-secondary", "slate-600 / graphite-300", "Inactive description text"),
        row("--color-text-muted", "slate-400 / graphite-500", "Optional/helper text"),
        row("--color-border", "slate-200 / graphite-700", "Connector and idle border"),
        row("--color-brand", "brand-500", "Active/completed accent"),
        row("--color-brand-subtle", "brand-50", "Completed background tint"),
        row("--color-success", "success-600", "Success variant accent"),
        row("--color-danger", "error-600", "Error variant accent"),
        row("--size-8", "32px", "Step indicator size"),
        row("--size-6", "24px", "Vertical connector span"),
        row("--space-1", "4px", "Horizontal/vertical item gap"),
        row("--space-2", "8px", "Vertical connector spacer"),
        row("--space-3", "12px", "Vertical indicator/content gap"),
        row("--space-4", "16px", "Vertical content bottom padding"),
        row("--radius-control-pill", "9999px", "Indicator shape"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Step label and description base role"),
        row("--font-weight-400", "500", "Active step emphasis"),
        row("--icon-size-md", "16px", "Completed check icon"),
      ],
      focus,
      motion
    ),
  },
  switch: {
    title: "Design Tokens",
    inheritsFrom: ["selection-control", "label"],
    tokens: compose(
      [
        row("--size-4", "16px", "Small track height"),
        row("--size-5", "20px", "Default track height"),
        row("--size-6", "24px", "Large track height"),
        row("--radius-control-pill", "9999px", "Track radius"),
        row("--switch-track-padding", "2px", "Track inner padding"),
        row("--color-border-input", "slate-300 / graphite-600", "Unchecked track"),
        row("--color-success", "success-600", "Checked track"),
        row("--color-text-on-brand", "white", "Thumb color"),
        row("--switch-track-width-sm", "28px", "Small track width"),
        row("--switch-track-width-md", "36px", "Default track width"),
        row("--switch-track-width-lg", "51px", "Large track width"),
        row("--switch-thumb-w-sm", "14px", "Small thumb width"),
        row("--switch-thumb-w-md", "18px", "Default thumb width"),
        row("--switch-thumb-w-lg", "27px", "Large thumb width"),
        row("--switch-thumb-shadow", "soft elevation recipe", "Thumb drop shadow"),
        row("--switch-track-inner-shadow", "inset shadow recipe", "Track depth treatment"),
      ],
      fieldTextRoles,
      focusWithOffset,
      disabled,
      motion
    ),
  },
  table: {
    title: "Design Tokens",
    inheritsFrom: ["table"],
    tokens: compose(
      tabularText,
      [
        row("--height-control-md", "40px", "Header minimum height"),
        row("--space-1", "4px", "Header icon gap and compact cell spacing"),
        row("--space-3", "12px", "Default cell horizontal padding"),
        row("--space-4", "16px", "Card row padding"),
        row("--space-6", "24px", "Striped row edge padding"),
        row("--radius-scale-lg", "12px", "Outline table container radius"),
        row("--radius-scale-xl", "16px", "Card row radius"),
        row("--radius-scale-2xl", "24px", "Striped row edge rounding"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Default table cell typography role"),
        row("--type-body-md-*", "16px / 400 / 1.5", "Expressive striped row typography role"),
        row(
          "--type-body-sm-* + --font-weight-400",
          "12px / 400 / 1.5",
          "Card helper label typography role"
        ),
        row("--font-weight-400", "500", "Header and emphasized cell weight"),
        row("--color-bg-subtle", "slate-50 / graphite overlay", "Striped row background"),
        row(
          "--color-bg-subtle-hover",
          "slate-100 / graphite overlay",
          "Striped row hover background"
        ),
        row("--color-border-strong", "slate-300 / graphite-600", "Card hover border"),
        row("--shadow-xs", "0 1px 2px ...", "Card row resting shadow"),
        row("--shadow-sm", "0 2px 6px ...", "Card row hover shadow"),
        row("Primitive: sort icon", "14px", "Sorting affordance icon size"),
      ],
      motion
    ),
  },
  tabs: {
    title: "Design Tokens",
    inheritsFrom: ["control", "selection"],
    tokens: compose(
      controlHeights,
      [
        row("--space-8", "32px", "Gap between triggers"),
        row("--space-3", "12px", "Bottom padding before indicator"),
        row("--space-4", "16px", "Gap between list and content"),
        row("Primitive: indicator height", "2px", "Active indicator height"),
        row("--type-body-md-* + --font-weight-400", "14px / 400 / 1.5", "Trigger label role"),
        row("--icon-size-md", "16px", "Default icon size"),
        row("--icon-size-lg", "20px", "Large icon size"),
      ],
      surface,
      interactiveSurface,
      [row("--color-border", "slate-200 / graphite-700", "Tablist divider")],
      focus,
      disabled,
      motion
    ),
  },
  textarea: {
    title: "Design Tokens",
    inheritsFrom: ["form-field", "label"],
    tokens: compose(
      [
        row("--radius-control-input", "8px", "Standard field radius"),
        row("--radius-scale-xl", "16px", "Floating field radius"),
        row("--space-1", "4px", "Helper text and action spacing"),
        row("--space-2", "8px", "Container padding"),
        row("--space-6", "24px", "Floating label/content top inset"),
      ],
      fieldTextRoles,
      [
        row("--type-body-md-*", "16px / 400 / 1.5", "Textarea value role"),
        row("--size-24", "96px", "Core textarea body minimum height"),
        row("Composite min-height", "120px", "Container height via size-24 + space-6"),
      ],
      fieldBase,
      [row("--color-danger", "error-600", "Error border and helper text")],
      focusWithOffset,
      disabled,
      motion
    ),
  },
  "time-field": {
    title: "Design Tokens",
    inheritsFrom: ["input", "popover", "scroll-area"],
    tokens: compose(
      [
        row("--radius-scale-xl", "16px", "Field and popup list radius"),
        row("--size-14", "56px", "Field height"),
        row("--space-2", "8px", "Gap between text and trailing actions"),
        row("--space-3", "12px", "Field horizontal padding and popup content padding"),
        row("--space-5", "20px", "Floating content top inset"),
      ],
      bodyRoles,
      fieldTextRoles,
      fieldBase,
      overlayGlassSurface,
      [row("--color-brand", "brand-500", "Selected hour/minute background")],
      [row("--color-text-on-brand", "white", "Selected hour/minute foreground")],
      [row("--color-danger", "tomato-700", "Error border and helper text")],
      focusWithOffset,
      disabled,
      motion,
      motionSurfaceEnter
    ),
  },
  toggle: {
    title: "Design Tokens",
    inheritsFrom: ["selection-control"],
    tokens: compose(
      controlHeights,
      controlPill,
      [
        row("--space-2", "8px", "Gap between icon and label"),
        row("--space-3", "12px", "Small horizontal padding"),
        row("--space-4", "16px", "Default horizontal padding"),
        row("--space-5", "20px", "Large horizontal padding"),
        row("--type-body-sm-* + --font-weight-400", "12px / 400 / 1.5", "Small label role"),
        row("--type-body-md-* + --font-weight-400", "14px / 400 / 1.5", "Default label role"),
        row("--type-body-md-* + --font-weight-400", "14px / 400 / 1.5", "Large label role"),
        row("--icon-size-sm", "12px", "Compact icon size"),
        row("--icon-size-md", "16px", "Default icon size"),
        row("--icon-size-lg", "20px", "Large icon size"),
      ],
      interactiveSurface,
      selectionPalette,
      [row("--color-border", "slate-200 / graphite-700", "Outline variant border")],
      focusWithOffset,
      disabled,
      motion
    ),
  },
  "toggle-group": {
    title: "Design Tokens",
    inheritsFrom: ["toggle"],
    tokens: compose(
      [row("--space-1", "4px", "Gap between items")],
      interactiveSurface,
      selectionPalette,
      [row("--color-border", "slate-200 / graphite-700", "Outline variant border")],
      focusWithOffset,
      disabled,
      motion
    ),
  },
  tooltip: {
    title: "Design Tokens",
    inheritsFrom: ["inverted-surface"],
    tokens: compose(
      invertedSurface,
      [
        row("--shadow-md", "0 4px 12px ...", "Tooltip shadow (shared)"),
        row("--space-3", "12px", "Tooltip horizontal padding and arrow width"),
        row("--radius-control-soft", "12px", "Tooltip radius"),
        row("--type-body-sm-size", "12px", "Tooltip font size"),
        row("--type-body-sm-line-height", "1.5", "Tooltip line-height"),
        row("--font-weight-400", "500", "Tooltip font weight"),
      ],
      motion,
      motionTooltip
    ),
  },
  "page-header": {
    title: "Design Tokens",
    inheritsFrom: ["typography", "surface", "spacing"],
    tokens: compose(
      [
        row("h-20 (80px)", "5rem", "Fixed header height"),
        row("--space-8", "32px", "Horizontal padding"),
        row("--space-4", "16px", "Gap between back button and title"),
        row("--space-3", "12px", "Gap between action elements"),
        row("--space-1", "4px", "Gap between title and subtitle"),
        row("Primitive: page title", "24px / 400 / 1.2", "Shared page header title role"),
        row("--type-body-sm-*", "14px / 400 / 1.5", "Subtitle typography role"),
      ],
      surfaceText,
      [row("--color-border", "slate-200 / graphite-700", "Bottom border (when bordered)")]
    ),
  },
  "page-layout": {
    title: "Design Tokens",
    inheritsFrom: ["spacing"],
    tokens: compose([
      row("--space-2", "8px", "Gap between panes"),
      row(
        "Primitive: layout ratios",
        "100 / 50-50 / 25-75 / 75-25 / 66-33 / 33-66",
        "Available page column presets"
      ),
    ]),
  },
  "layout-card": {
    title: "Design Tokens",
    inheritsFrom: ["surface", "spacing", "radius"],
    tokens: compose(
      [
        row("--color-bg-surface", "slate-0 / graphite-800", "Panel background"),
        row("--color-border", "slate-300 / graphite-700", "Panel border"),
        row("--radius-scale-3xl", "32px", "Panel radius"),
        row("--space-4", "16px", "Panel inner padding"),
      ],
      surfaceText
    ),
  },
  "side-navigation": {
    title: "Design Tokens",
    inheritsFrom: ["surface", "interaction", "spacing", "typography", "overlay"],
    tokens: compose(
      [
        row("--side-nav-width", "240px", "Expanded desktop width"),
        row("--side-nav-collapsed-width", "80px", "Collapsed desktop width"),
        row("--side-nav-item-shadow", "0 6px 6px ...", "Active item elevation"),
        row("--space-3", "12px", "Outer shell horizontal padding"),
        row("--space-4", "16px", "Header and footer gaps"),
        row("--space-5", "20px", "Expanded item horizontal padding"),
        row("--radius-scale-md", "8px", "Collapsed icon tiles and utility action buttons"),
        row(
          "--radius-control-soft",
          "12px",
          "Header toggle, profile row, and supporting shell surfaces"
        ),
        row("--radius-control-pill", "9999px", "Expanded active item shape"),
        row("--radius-scale-3xl", "32px", "Mobile drawer top radius and profile popover shape"),
        row("--height-control-lg", "40px", "Primary nav/action row height"),
      ],
      surface,
      surfaceText,
      selectionPalette,
      overlaySurface,
      motion
    ),
  },
} satisfies Record<string, ComponentTokenDocEntry>;
