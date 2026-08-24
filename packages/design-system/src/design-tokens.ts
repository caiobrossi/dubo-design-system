import { componentTokenDocs, sharedComponentTokenGroups } from "./component-token-docs";

const brandBluePalette = {
  25: "oklch(0.982 0.010 269.0)",
  50: "oklch(0.959 0.016 274.8)",
  100: "oklch(0.895 0.044 278.4)",
  200: "oklch(0.803 0.099 275.1)",
  300: "oklch(0.706 0.141 272.1)",
  400: "oklch(0.615 0.185 270.4)",
  500: "oklch(0.514 0.224 268.7)",
  600: "oklch(0.457 0.217 268.1)",
  700: "oklch(0.391 0.189 268.3)",
  800: "oklch(0.319 0.156 268.5)",
  900: "oklch(0.241 0.116 269.2)",
  950: "oklch(0.190 0.090 269.2)",
} as const;

const slatePalette = {
  0: "oklch(1 0 0)",
  25: "oklch(0.993 0.002 256)",
  50: "oklch(0.982 0.002 256)",
  100: "oklch(0.959 0.004 256)",
  200: "oklch(0.936 0.006 256)",
  300: "oklch(0.914 0.008 256)",
  400: "oklch(0.889 0.010 256)",
  500: "oklch(0.811 0.016 256)",
  600: "oklch(0.645 0.018 256)",
  700: "oklch(0.501 0.018 256)",
  800: "oklch(0.378 0.016 256)",
  900: "oklch(0.208 0.018 256)",
  950: "oklch(0.156 0.014 256)",
} as const;

const graphitePalette = {
  50: "oklch(0.920 0.002 256)",
  100: "oklch(0.820 0.002 256)",
  200: "oklch(0.720 0.002 256)",
  300: "oklch(0.640 0.003 256)",
  400: "oklch(0.560 0.003 256)",
  500: "oklch(0.480 0.003 256)",
  600: "oklch(0.410 0.003 256)",
  700: "oklch(0.340 0.003 256)",
  800: "oklch(0.280 0.003 256)",
  900: "oklch(0.240 0.003 256)",
  950: "oklch(0.180 0.003 256)",
} as const;

const indigoPalette = {
  25: "oklch(0.99 0.008 275)",
  50: "oklch(0.979 0.014 275)",
  100: "oklch(0.96 0.034 275)",
  200: "oklch(0.939 0.051 275)",
  300: "oklch(0.914 0.069 275)",
  400: "oklch(0.883 0.088 275)",
  500: "oklch(0.84 0.11 275)",
  600: "oklch(0.776 0.139 275)",
  700: "oklch(0.632 0.185 275)",
  800: "oklch(0.59 0.191 275)",
  900: "oklch(0.474 0.154 275)",
  950: "oklch(0.355 0.102 275)",
} as const;

const cyanPalette = {
  25: "oklch(0.989 0.01 210)",
  50: "oklch(0.978 0.018 210)",
  100: "oklch(0.956 0.042 210)",
  200: "oklch(0.931 0.062 210)",
  300: "oklch(0.902 0.082 210)",
  400: "oklch(0.868 0.102 210)",
  500: "oklch(0.823 0.125 210)",
  600: "oklch(0.762 0.153 210)",
  700: "oklch(0.623 0.178 210)",
  800: "oklch(0.579 0.179 210)",
  900: "oklch(0.464 0.143 210)",
  950: "oklch(0.348 0.095 210)",
} as const;

const peachPalette = {
  25: "oklch(0.989 0.008 76.0)",
  50: "oklch(0.982 0.016 79.4)",
  100: "oklch(0.968 0.024 79.2)",
  200: "oklch(0.944 0.035 79.0)",
  300: "oklch(0.919 0.047 78.5)",
  400: "oklch(0.889 0.060 77.8)",
  500: "oklch(0.832 0.086 75.6)",
  600: "oklch(0.758 0.109 73.6)",
  700: "oklch(0.662 0.121 70.2)",
  800: "oklch(0.584 0.108 68.5)",
  900: "oklch(0.471 0.081 67.1)",
  950: "oklch(0.349 0.054 65.8)",
} as const;

const skyPalette = {
  25: "oklch(0.988 0.004 228.0)",
  50: "oklch(0.953 0.011 226.0)",
  100: "oklch(0.931 0.018 227.4)",
  200: "oklch(0.900 0.029 230.2)",
  300: "oklch(0.861 0.044 232.6)",
  400: "oklch(0.810 0.062 234.8)",
  500: "oklch(0.739 0.090 237.7)",
  600: "oklch(0.664 0.114 240.0)",
  700: "oklch(0.562 0.121 242.0)",
  800: "oklch(0.473 0.101 242.8)",
  900: "oklch(0.383 0.078 242.9)",
  950: "oklch(0.286 0.053 243.1)",
} as const;

const tealPalette = {
  25: "oklch(0.989 0.011 180)",
  50: "oklch(0.977 0.019 180)",
  100: "oklch(0.954 0.044 180)",
  200: "oklch(0.928 0.065 180)",
  300: "oklch(0.898 0.086 180)",
  400: "oklch(0.863 0.107 180)",
  500: "oklch(0.817 0.131 180)",
  600: "oklch(0.755 0.16 180)",
  700: "oklch(0.618 0.182 180)",
  800: "oklch(0.574 0.182 180)",
  900: "oklch(0.461 0.146 180)",
  950: "oklch(0.346 0.097 180)",
} as const;

const limePalette = {
  25: "oklch(0.99 0.012 120)",
  50: "oklch(0.981 0.024 120)",
  100: "oklch(0.965 0.055 120)",
  200: "oklch(0.947 0.082 120)",
  300: "oklch(0.925 0.108 120)",
  400: "oklch(0.897 0.134 120)",
  500: "oklch(0.859 0.162 120)",
  600: "oklch(0.805 0.193 120)",
  700: "oklch(0.703 0.205 120)",
  800: "oklch(0.651 0.195 120)",
  900: "oklch(0.512 0.149 120)",
  950: "oklch(0.373 0.096 120)",
} as const;

const yellowPalette = {
  25: "oklch(0.991 0.01 91)",
  50: "oklch(0.985 0.021 91)",
  100: "oklch(0.972 0.049 91)",
  200: "oklch(0.96 0.074 91)",
  300: "oklch(0.943 0.098 91)",
  400: "oklch(0.92 0.122 91)",
  500: "oklch(0.886 0.147 91)",
  600: "oklch(0.835 0.176 91)",
  700: "oklch(0.725 0.187 91)",
  800: "oklch(0.667 0.177 91)",
  900: "oklch(0.527 0.136 91)",
  950: "oklch(0.385 0.088 91)",
} as const;

const orangePalette = {
  25: "oklch(0.991 0.009 55)",
  50: "oklch(0.983 0.017 55)",
  100: "oklch(0.967 0.042 55)",
  200: "oklch(0.95 0.063 55)",
  300: "oklch(0.928 0.084 55)",
  400: "oklch(0.9 0.105 55)",
  500: "oklch(0.861 0.128 55)",
  600: "oklch(0.804 0.156 55)",
  700: "oklch(0.67 0.185 55)",
  800: "oklch(0.626 0.187 55)",
  900: "oklch(0.505 0.15 55)",
  950: "oklch(0.377 0.099 55)",
} as const;

const pinkPalette = {
  25: "oklch(0.99 0.009 343)",
  50: "oklch(0.981 0.016 343)",
  100: "oklch(0.963 0.038 343)",
  200: "oklch(0.943 0.057 343)",
  300: "oklch(0.919 0.076 343)",
  400: "oklch(0.889 0.095 343)",
  500: "oklch(0.847 0.117 343)",
  600: "oklch(0.785 0.144 343)",
  700: "oklch(0.641 0.185 343)",
  800: "oklch(0.599 0.191 343)",
  900: "oklch(0.483 0.154 343)",
  950: "oklch(0.361 0.102 343)",
} as const;

const tomatoPalette = {
  25: "oklch(0.99 0.008 25)",
  50: "oklch(0.982 0.015 25)",
  100: "oklch(0.966 0.038 25)",
  200: "oklch(0.948 0.057 25)",
  300: "oklch(0.926 0.076 25)",
  400: "oklch(0.898 0.096 25)",
  500: "oklch(0.859 0.118 25)",
  600: "oklch(0.803 0.145 25)",
  700: "oklch(0.657 0.183 25)",
  800: "oklch(0.615 0.189 25)",
  900: "oklch(0.497 0.152 25)",
  950: "oklch(0.372 0.1 25)",
} as const;

const redPalette = {
  25: "oklch(0.99 0.007 17)",
  50: "oklch(0.982 0.013 17)",
  100: "oklch(0.965 0.036 17)",
  200: "oklch(0.946 0.051 17)",
  300: "oklch(0.924 0.067 17)",
  400: "oklch(0.895 0.083 17)",
  500: "oklch(0.856 0.101 17)",
  600: "oklch(0.802 0.124 17)",
  700: "oklch(0.647 0.176 17)",
  800: "oklch(0.61 0.186 17)",
  900: "oklch(0.49 0.155 17)",
  950: "oklch(0.367 0.102 17)",
} as const;

/**
 * Dubo Design System — Design Tokens v1.3
 *
 * Single source of truth for the new design system.
 * Architecture: Primitives → Semantic → Component
 * Color format: OKLCH for perceptual uniformity and native opacity composability.
 *
 * IMPORTANT: This file is NOT consumed by the current Dubo app.
 * It will be progressively adopted page-by-page during the migration.
 */

// ─────────────────────────────────────────────
// Layer 1: Primitives — raw values, no semantics
// ─────────────────────────────────────────────

export const primitives = {
  colors: {
    brand: brandBluePalette,
    blue: brandBluePalette,
    indigo: indigoPalette,
    purple: {
      50: "oklch(0.957 0.023 308.2)",
      100: "oklch(0.871 0.071 310.2)",
      200: "oklch(0.763 0.135 309.0)",
      400: "oklch(0.579 0.233 303.6)",
      500: "oklch(0.530 0.251 299.2)",
      600: "oklch(0.455 0.219 298.6)",
      800: "oklch(0.309 0.148 296.0)",
    },
    slate: slatePalette,
    cool: slatePalette,
    graphite: graphitePalette,
    cyan: cyanPalette,
    peach: peachPalette,
    sky: skyPalette,
    teal: tealPalette,
    lime: limePalette,
    yellow: yellowPalette,
    orange: orangePalette,
    pink: pinkPalette,
    tomato: tomatoPalette,
    red: redPalette,
    success: limePalette,
    warning: orangePalette,
    error: tomatoPalette,
    info: {
      50: "oklch(0.959 0.016 274.8)",
      200: "oklch(0.803 0.099 275.1)",
      500: "oklch(0.514 0.224 268.7)",
      600: "oklch(0.457 0.217 268.1)",
      800: "oklch(0.319 0.156 268.5)",
    },
  },

  typography: {
    fontFamily: {
      heading: 'var(--font-poppins), "Poppins", sans-serif',
      body: 'var(--font-open-sans), "Open Sans", sans-serif',
      mono: '"JetBrains Mono", monospace',
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
      "4xl": "2rem", // 32px
    },
    fontWeight: {
      extraLight: "200",
      light: "300",
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extraBold: "800",
    },
    lineHeight: {
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
    },
    letterSpacing: {
      tight: "0em",
      normal: "0em",
    },
  },

  spacing: {
    1: "4px",
    2: "8px",
    3: "12px",
    4: "16px",
    5: "20px",
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    16: "64px",
  },

  radius: {
    xs: "4px",
    sm: "6px",
    md: "8px",
    lg: "12px",
    xl: "16px",
    "2xl": "24px",
    "3xl": "32px",
    full: "9999px",
  },

  sizing: {
    6: "24px",
    8: "32px",
    10: "40px",
    12: "48px",
    14: "56px",
    16: "64px",
    20: "80px",
    24: "96px",
    25: "100px",
    32: "128px",
  },

  shadow: {
    xs: "0 1px 2px oklch(0 0 0 / 0.05)",
    sm: "0 2px 6px oklch(0 0 0 / 0.08)",
    md: "0 4px 12px oklch(0 0 0 / 0.1)",
    lg: "0 8px 24px oklch(0 0 0 / 0.12)",
    xl: "0 7px 10px oklch(0 0 0 / 0.09), 0 40px 80px oklch(0 0 0 / 0.30)",
  },

  opacity: {
    0: "0",
    5: "0.05",
    10: "0.10",
    20: "0.20",
    40: "0.40",
    60: "0.60",
    80: "0.80",
    90: "0.90",
    100: "1",
  },
} as const;

// ─────────────────────────────────────────────
// Layer 2: Semantic — intent-based, references primitives
// ─────────────────────────────────────────────

const semanticColors = {
  brand: primitives.colors.brand[500],
  brandHover: primitives.colors.brand[600],
  brandActive: primitives.colors.brand[700],
  brandSubtle: primitives.colors.brand[50],

  accent: primitives.colors.purple[500],
  accentSubtle: primitives.colors.purple[50],
  accentStrong: primitives.colors.purple[600],
  accentBorder: primitives.colors.purple[200],

  cyan: primitives.colors.cyan[500],
  cyanSubtle: primitives.colors.cyan[50],
  cyanStrong: primitives.colors.cyan[600],
  cyanBorder: primitives.colors.cyan[200],

  peach: primitives.colors.peach[600],
  peachSubtle: "oklch(0.934 0.029 75.7)",
  peachStrong: primitives.colors.peach[700],
  peachBorder: primitives.colors.peach[200],

  sky: primitives.colors.sky[600],
  skySubtle: primitives.colors.sky[50],
  skyStrong: primitives.colors.sky[700],
  skyBorder: primitives.colors.sky[200],

  bgPage: "oklch(0.959 0.004 256)",
  bgSurface: primitives.colors.slate[0],
  bgElevated: primitives.colors.slate[0],
  bgSubtle: primitives.colors.slate[50],
  bgSubtleHover: primitives.colors.slate[100],
  bgInput: primitives.colors.slate[100],
  bgInputHover: primitives.colors.slate[200],
  bgInverted: primitives.colors.slate[900],

  textPrimary: primitives.colors.slate[900],
  textSecondary: primitives.colors.slate[700],
  textMuted: primitives.colors.slate[600],
  textOnBrand: primitives.colors.slate[0],
  textInverted: primitives.colors.slate[0],

  border: primitives.colors.slate[300],
  borderStrong: primitives.colors.slate[400],
  borderInteractive: primitives.colors.slate[500],
  borderFocus: primitives.colors.brand[500],

  success: primitives.colors.success[700],
  successSubtle: primitives.colors.success[50],
  successBorder: primitives.colors.success[200],

  warning: primitives.colors.warning[700],
  warningSubtle: primitives.colors.warning[50],
  warningBorder: primitives.colors.warning[200],

  danger: primitives.colors.error[700],
  dangerSubtle: primitives.colors.error[50],
  dangerBorder: primitives.colors.error[200],
  dangerStrongBorder: primitives.colors.error[900],

  info: primitives.colors.info[50],
  infoStrong: primitives.colors.info[500],
  infoBorder: primitives.colors.info[200],

  onDark: primitives.colors.slate[0],

  // Interaction states
  hover: "oklch(0.208 0.018 256 / 0.05)",
  pressed: "oklch(0.208 0.018 256 / 0.10)",
  hoverDark: "oklch(1.000 0 0 / 0.06)",
  pressedDark: "oklch(1.000 0 0 / 0.10)",
  hoverBrand: "oklch(0.514 0.224 268.7 / 0.05)",
  pressedBrand: "oklch(0.514 0.224 268.7 / 0.10)",
} as const;

const semanticTypography = {
  hero: {
    fontFamily: primitives.typography.fontFamily.heading,
    size: primitives.typography.fontSize["4xl"],
    lineHeight: primitives.typography.lineHeight.tight,
    letterSpacing: primitives.typography.letterSpacing.tight,
  },
  heading1: {
    fontFamily: primitives.typography.fontFamily.heading,
    size: primitives.typography.fontSize["2xl"],
    lineHeight: primitives.typography.lineHeight.tight,
    letterSpacing: primitives.typography.letterSpacing.tight,
  },
  heading2: {
    fontFamily: primitives.typography.fontFamily.heading,
    size: primitives.typography.fontSize.xl,
    lineHeight: primitives.typography.lineHeight.tight,
    letterSpacing: primitives.typography.letterSpacing.tight,
  },
  heading3: {
    fontFamily: primitives.typography.fontFamily.heading,
    size: primitives.typography.fontSize.lg,
    lineHeight: "1.333333",
    letterSpacing: primitives.typography.letterSpacing.tight,
  },
  heading4: {
    fontFamily: primitives.typography.fontFamily.heading,
    size: primitives.typography.fontSize.base,
    lineHeight: primitives.typography.lineHeight.tight,
    letterSpacing: primitives.typography.letterSpacing.tight,
  },
  bodyLg: {
    fontFamily: primitives.typography.fontFamily.body,
    size: primitives.typography.fontSize.base,
    lineHeight: primitives.typography.lineHeight.normal,
  },
  bodyMd: {
    fontFamily: primitives.typography.fontFamily.body,
    size: primitives.typography.fontSize.sm,
    lineHeight: primitives.typography.lineHeight.normal,
  },
  bodySm: {
    fontFamily: primitives.typography.fontFamily.body,
    size: primitives.typography.fontSize.xs,
    lineHeight: primitives.typography.lineHeight.normal,
  },
} as const;

const semanticInteraction = {
  transitionFast: "200ms",
  transitionNormal: "300ms",
  transitionEasing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  transitionEasingOut: "ease-out",
  dropdownEnterDuration: "300ms",
  dropdownEnterEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
  dropdownEnterScaleFrom: "0.95",
  tooltipEnterDuration: "200ms",
  tooltipEnterEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
  tooltipExitDuration: "150ms",
  tooltipExitEasing: "cubic-bezier(0.4, 0, 1, 1)",
  tooltipTranslateXFrom: "-4px",
  overlayEnterDuration: "300ms",
  overlayEnterEasing: "ease-out",
  overlayExitDuration: "150ms",
  overlayExitEasing: "ease-in",
  modalEnterDuration: "500ms",
  modalEnterEasing: "cubic-bezier(0.16, 1, 0.3, 1)",
  modalEnterScaleFrom: "0.92",
  modalEnterTranslateYFrom: "20px",
  disabledOpacity: primitives.opacity[40],
  focusRing: primitives.colors.brand[500],
  focusRingOffset: "2px",
} as const;

const semanticControls = {
  height: {
    sm: primitives.sizing[8],
    md: primitives.sizing[10],
    lg: primitives.sizing[10],
  },
  icon: {
    sm: "14px",
    md: "16px",
    lg: "20px",
  },
  radius: {
    pill: primitives.radius.full,
    input: primitives.radius["2xl"],
    soft: primitives.radius.lg,
    card: primitives.radius.xl,
  },
  interaction: semanticInteraction,
} as const;

const semanticFormField = {
  border: semanticColors.borderInteractive,
  borderActive: semanticColors.brand,
  borderDisabled: semanticColors.border,
  bg: semanticColors.bgSurface,
  bgActive: semanticColors.brand,
  bgActiveHover: semanticColors.brandHover,
  label: semanticTypography.bodyMd,
  groupLabel: semanticTypography.bodyMd,
  description: semanticTypography.bodySm,
} as const;

const semanticStatus = {
  success: {
    subtleBg: primitives.colors.success[100],
    subtleBorder: semanticColors.successBorder,
    subtleText: primitives.colors.success[950],
    subtleIcon: primitives.colors.success[950],
    strongBg: semanticColors.success,
    strongText: semanticColors.textOnBrand,
  },
  warning: {
    subtleBg: primitives.colors.warning[100],
    subtleBorder: semanticColors.warningBorder,
    subtleText: primitives.colors.warning[950],
    subtleIcon: primitives.colors.warning[950],
    strongBg: semanticColors.warning,
    strongText: semanticColors.textOnBrand,
  },
  danger: {
    subtleBg: primitives.colors.error[100],
    subtleBorder: semanticColors.dangerBorder,
    subtleText: primitives.colors.error[950],
    subtleIcon: primitives.colors.error[950],
    strongBg: semanticColors.danger,
    strongText: semanticColors.textOnBrand,
    strongBorderAccent: semanticColors.dangerStrongBorder,
  },
  info: {
    subtleBg: primitives.colors.brand[100],
    subtleBorder: semanticColors.infoBorder,
    subtleText: primitives.colors.brand[950],
    subtleIcon: primitives.colors.brand[950],
    strongBg: semanticColors.infoStrong,
    strongText: semanticColors.textOnBrand,
  },
  accent: {
    subtleBg: primitives.colors.purple[100],
    subtleBorder: semanticColors.accentBorder,
    subtleText: primitives.colors.purple[800],
    strongBg: semanticColors.accentStrong,
    strongText: semanticColors.onDark,
  },
  cyan: {
    subtleBg: primitives.colors.cyan[100],
    subtleBorder: semanticColors.cyanBorder,
    subtleText: primitives.colors.cyan[950],
    strongBg: semanticColors.cyanStrong,
    strongText: primitives.colors.cyan[950],
  },
  peach: {
    subtleBg: semanticColors.peachSubtle,
    subtleBorder: semanticColors.peachBorder,
    subtleText: primitives.colors.peach[950],
    subtleIcon: primitives.colors.peach[900],
    strongBg: semanticColors.peachStrong,
    strongText: semanticColors.onDark,
  },
  sky: {
    subtleBg: primitives.colors.sky[100],
    subtleBorder: semanticColors.skyBorder,
    subtleText: primitives.colors.sky[950],
    subtleIcon: primitives.colors.sky[900],
    strongBg: semanticColors.skyStrong,
    strongText: semanticColors.onDark,
  },
} as const;

const semanticSurface = {
  card: {
    bg: semanticColors.bgSurface,
    mutedBg: semanticColors.bgInput,
    border: semanticColors.border,
    radius: primitives.radius["2xl"],
    shadow: "none",
  },
  elevated: {
    bg: semanticColors.bgElevated,
    border: semanticColors.border,
    radius: primitives.radius["2xl"],
    shadow: primitives.shadow.lg,
  },
  glass: {
    bg: "oklch(1 0 0 / 0.72)",
    border: "oklch(1 0 0 / 0.30)",
    blur: "blur(16px)",
    saturate: "saturate(180%)",
  },
  inverted: {
    bg: semanticColors.bgInverted,
    text: semanticColors.textInverted,
  },
  overlay: {
    bg: "oklch(0.208 0.031 259.0 / 0.20)",
    blur: "blur(4px)",
    transition: semanticInteraction.transitionFast,
  },
  gradientProduct: {
    bg: `linear-gradient(148deg, ${primitives.colors.peach[100]} 2%, ${primitives.colors.sky[200]} 103%)`,
    border: "color-mix(in oklab, var(--color-peach-border) 48%, var(--color-sky-border) 52%)",
    text: semanticColors.textPrimary,
  },
  gradientSunrise: {
    bg: "linear-gradient(152deg, oklch(0.965 0.020 53.3) 2%, oklch(0.910 0.048 241.6) 103%)",
    border: "color-mix(in oklab, var(--color-peach-border) 50%, var(--color-sky-border) 50%)",
    text: semanticColors.textPrimary,
  },
  gradientWarmTint: {
    bg: "linear-gradient(187.243deg, oklch(1 0 89.9 / 0) 1.323%, oklch(0.924 0.018 81.3 / 0.6) 69.215%)",
    border: "color-mix(in oklab, var(--color-peach-border) 72%, var(--color-border) 28%)",
    text: semanticColors.textPrimary,
  },
} as const;

export const semantic = {
  colors: semanticColors,
  typography: semanticTypography,
  interaction: semanticInteraction,
  controls: semanticControls,
  formField: semanticFormField,
  status: semanticStatus,
  surface: semanticSurface,
  layout: {
    sidebarWidth: "240px",
    topbarHeight: "56px",
  },
} as const;

// ─────────────────────────────────────────────
// Layer 3: Component — context-specific, references semantic
// ─────────────────────────────────────────────

export const component = {
  button: {
    primaryShadow:
      "0px 1px 1px oklch(0 0 0 / 0.22), inset 0px 1px 1px oklch(1 0 0 / 0.22), inset 0px -1px 1px oklch(0 0 0 / 0.08)",
    primaryShadowHover:
      "0px 1px 1px oklch(0 0 0 / 0.22), inset 0px 1px 1px oklch(1 0 0 / 0.22), inset 0px -1px 1px oklch(0 0 0 / 0.08), 0 4px 16px oklch(0.514 0.224 268.7 / 0.30)",
    primaryScaleHover: "1.03",
    primaryScaleActive: "0.97",
    destructiveShadow:
      "0px 1px 1px oklch(0 0 0 / 0.22), inset 0px 1px 1px oklch(1 0 0 / 0.18), inset 0px -1px 1px oklch(0 0 0 / 0.08)",
  },
  segment: {
    padding: "2px",
    pillShadow: "0 6px 6px oklch(0 0 0 / 0.08), 0 2px 2px oklch(0 0 0 / 0.16)",
  },
  switch: {
    trackPadding: "2px",
    trackWidthSm: "28px",
    thumbWidthSm: "14px",
    trackWidthMd: "36px",
    thumbWidthMd: "18px",
    trackWidthLg: "51px",
    thumbWidthLg: "27px",
    thumbShadow: "0px 1px 1px 1px oklch(0 0 0 / 0.22)",
    trackInnerShadow:
      "inset 0px -0.5px 1px 0px oklch(1 0 0 / 0.2), inset 0px 2px 2.6px 0px oklch(0 0 0 / 0.12), inset 0px 2px 2.4px 0px oklch(0 0 0 / 0.08)",
  },
  avatar: {
    groupOverlap: "-8px",
  },
  floatingPanel: {
    width: "420px",
    minimizedWidth: "320px",
    heightDefault: "520px",
    heightTall: "640px",
  },
  overlayGlass: {
    minWidth: "192px",
    widthDefault: "280px",
    widthCompact: "280px",
    widthWide: "320px",
    widthNarrow: "200px",
    maxHeightScroll: "300px",
    bgLight: "var(--glass-bg-light)",
    bgDark: "var(--glass-bg-dark)",
    borderLight: "var(--color-border-strong)",
    borderDark: "var(--color-border-strong)",
    borderWidth: "0.5px",
    blur: "var(--glass-blur-md)",
    saturate: "var(--glass-saturate)",
    radius: "var(--radius-scale-2xl)",
    shadow: "var(--shadow-lg)",
  },
  sideNavigation: {
    width: semantic.layout.sidebarWidth,
    collapsedWidth: "80px",
    activeItemShadow: "0px 6px 6px oklch(0 0 0 / 0.08), 0px 2px 2px oklch(0 0 0 / 0.16)",
  },
} as const;

export const docsTheme = {
  heroRadius: primitives.radius["3xl"],
  heroOverlayRadius: "28px",
  heroPaddingX: primitives.spacing[8],
  heroPaddingY: "40px",
  heroGridSize: "28px",
  heroTitleSize: semantic.typography.hero.size,
  heroTitleLineHeight: semantic.typography.hero.lineHeight,
  heroTitleLetterSpacing: semantic.typography.hero.letterSpacing,
  cardRadius: semantic.controls.radius.card,
  cardPadding: primitives.spacing[6],
  cardGap: primitives.spacing[4],
  tableRadius: semantic.controls.radius.soft,
  tableCellPx: primitives.spacing[4],
  tableCellPy: primitives.spacing[3],
  chipPaddingX: primitives.spacing[4],
  chipPaddingY: primitives.spacing[2],
  chipRadius: semantic.controls.radius.pill,
  chipBg: "oklch(1 0 0 / 0.9)",
  heroOverlayBg: "oklch(1 0 0 / 0.55)",
  heroOverlayBorder: "oklch(1 0 0 / 0.4)",
  tableHeaderBg: "oklch(0.976 0.006 264.5 / 0.9)",
  tableStripeBg: "oklch(0.976 0.006 264.5 / 0.5)",
} as const;

// ─────────────────────────────────────────────
// Frosted Glass
// ─────────────────────────────────────────────

export const frostedGlass = {
  bgLight: "oklch(1 0 0 / 0.72)",
  bgDark: "color-mix(in oklab, var(--p-graphite-950) 80%, transparent)",
  bgBrand: "oklch(0.514 0.224 268.7 / 0.12)",
  blurSm: "blur(8px)",
  blurMd: "blur(16px)",
  blurLg: "blur(24px)",
  borderLight: "oklch(1 0 0 / 0.30)",
  borderDark: "color-mix(in oklab, var(--p-graphite-50) 8%, transparent)",
  saturate: "saturate(180%)",
} as const;

// ─────────────────────────────────────────────
// CSS Variables generator (for globals.css / dark mode)
// ─────────────────────────────────────────────

/** Generates CSS custom properties for :root (light mode) */
export function generateLightModeVars(): Record<string, string> {
  return {
    // Primitives
    ...Object.entries(primitives.colors).reduce(
      (acc, [scale, shades]) => {
        Object.entries(shades).forEach(([shade, value]) => {
          acc[`--p-${scale}-${shade}`] = value;
        });
        return acc;
      },
      {} as Record<string, string>
    ),

    // Semantic colors
    "--color-brand": semantic.colors.brand,
    "--color-brand-hover": semantic.colors.brandHover,
    "--color-brand-active": semantic.colors.brandActive,
    "--color-brand-subtle": semantic.colors.brandSubtle,
    "--color-accent": semantic.colors.accent,
    "--color-accent-subtle": semantic.colors.accentSubtle,
    "--color-accent-strong": semantic.colors.accentStrong,
    "--color-accent-border": semantic.colors.accentBorder,
    "--color-cyan": semantic.colors.cyan,
    "--color-cyan-subtle": semantic.colors.cyanSubtle,
    "--color-cyan-strong": semantic.colors.cyanStrong,
    "--color-cyan-border": semantic.colors.cyanBorder,
    "--color-peach": semantic.colors.peach,
    "--color-peach-subtle": semantic.colors.peachSubtle,
    "--color-peach-strong": semantic.colors.peachStrong,
    "--color-peach-border": semantic.colors.peachBorder,
    "--color-sky": semantic.colors.sky,
    "--color-sky-subtle": semantic.colors.skySubtle,
    "--color-sky-strong": semantic.colors.skyStrong,
    "--color-sky-border": semantic.colors.skyBorder,
    "--color-bg-page": semantic.colors.bgPage,
    "--color-bg-surface": semantic.colors.bgSurface,
    "--color-bg-elevated": semantic.colors.bgElevated,
    "--color-bg-subtle": semantic.colors.bgSubtle,
    "--color-bg-subtle-hover": semantic.colors.bgSubtleHover,
    "--color-bg-input": semantic.colors.bgInput,
    "--color-bg-input-hover": semantic.colors.bgInputHover,
    "--color-bg-inverted": semantic.colors.bgInverted,
    "--color-text-primary": semantic.colors.textPrimary,
    "--color-text-secondary": semantic.colors.textSecondary,
    "--color-text-muted": semantic.colors.textMuted,
    "--color-text-on-brand": semantic.colors.textOnBrand,
    "--color-text-inverted": semantic.colors.textInverted,
    "--color-border": semantic.colors.border,
    "--color-border-strong": semantic.colors.borderStrong,
    "--color-border-interactive": semantic.colors.borderInteractive,
    "--color-border-focus": semantic.colors.borderFocus,
    "--color-success": semantic.colors.success,
    "--color-success-subtle": semantic.colors.successSubtle,
    "--color-success-border": semantic.colors.successBorder,
    "--color-warning": semantic.colors.warning,
    "--color-warning-subtle": semantic.colors.warningSubtle,
    "--color-warning-border": semantic.colors.warningBorder,
    "--color-danger": semantic.colors.danger,
    "--color-danger-subtle": semantic.colors.dangerSubtle,
    "--color-danger-border": semantic.colors.dangerBorder,
    "--color-info": semantic.colors.info,
    "--color-info-strong": semantic.colors.infoStrong,
    "--color-info-border": semantic.colors.infoBorder,
    "--color-on-dark": semantic.colors.onDark,

    // Interaction states
    "--color-hover": semantic.colors.hover,
    "--color-pressed": semantic.colors.pressed,
    "--color-hover-brand": semantic.colors.hoverBrand,
    "--color-pressed-brand": semantic.colors.pressedBrand,

    // Shared interaction
    "--transition-fast": semantic.interaction.transitionFast,
    "--transition-normal": semantic.interaction.transitionNormal,
    "--transition-easing": semantic.interaction.transitionEasing,
    "--transition-easing-out": semantic.interaction.transitionEasingOut,
    "--motion-dropdown-enter-duration": semantic.interaction.dropdownEnterDuration,
    "--motion-dropdown-enter-easing": semantic.interaction.dropdownEnterEasing,
    "--motion-dropdown-enter-scale-from": semantic.interaction.dropdownEnterScaleFrom,
    "--motion-tooltip-enter-duration": semantic.interaction.tooltipEnterDuration,
    "--motion-tooltip-enter-easing": semantic.interaction.tooltipEnterEasing,
    "--motion-tooltip-exit-duration": semantic.interaction.tooltipExitDuration,
    "--motion-tooltip-exit-easing": semantic.interaction.tooltipExitEasing,
    "--motion-tooltip-enter-x-from": semantic.interaction.tooltipTranslateXFrom,
    "--motion-overlay-enter-duration": semantic.interaction.overlayEnterDuration,
    "--motion-overlay-enter-easing": semantic.interaction.overlayEnterEasing,
    "--motion-overlay-exit-duration": semantic.interaction.overlayExitDuration,
    "--motion-overlay-exit-easing": semantic.interaction.overlayExitEasing,
    "--motion-modal-enter-duration": semantic.interaction.modalEnterDuration,
    "--motion-modal-enter-easing": semantic.interaction.modalEnterEasing,
    "--motion-modal-enter-scale-from": semantic.interaction.modalEnterScaleFrom,
    "--motion-modal-enter-y-from": semantic.interaction.modalEnterTranslateYFrom,
    "--disabled-opacity": semantic.interaction.disabledOpacity,
    "--focus-ring": semantic.interaction.focusRing,
    "--focus-ring-offset": semantic.interaction.focusRingOffset,

    // Shared typography roles
    "--font-family-heading": primitives.typography.fontFamily.heading,
    "--font-family-body": primitives.typography.fontFamily.body,
    "--font-family-mono": primitives.typography.fontFamily.mono,
    "--type-hero-size": semantic.typography.hero.size,
    "--type-hero-line-height": semantic.typography.hero.lineHeight,
    "--type-hero-letter-spacing": semantic.typography.hero.letterSpacing,
    "--type-heading-1-size": semantic.typography.heading1.size,
    "--type-heading-1-line-height": semantic.typography.heading1.lineHeight,
    "--type-heading-1-letter-spacing": semantic.typography.heading1.letterSpacing,
    "--type-heading-2-size": semantic.typography.heading2.size,
    "--type-heading-2-line-height": semantic.typography.heading2.lineHeight,
    "--type-heading-2-letter-spacing": semantic.typography.heading2.letterSpacing,
    "--type-heading-3-size": semantic.typography.heading3.size,
    "--type-heading-3-line-height": semantic.typography.heading3.lineHeight,
    "--type-heading-3-letter-spacing": semantic.typography.heading3.letterSpacing,
    "--type-heading-4-size": semantic.typography.heading4.size,
    "--type-heading-4-line-height": semantic.typography.heading4.lineHeight,
    "--type-heading-4-letter-spacing": semantic.typography.heading4.letterSpacing,
    "--type-body-lg-size": semantic.typography.bodyLg.size,
    "--type-body-lg-line-height": semantic.typography.bodyLg.lineHeight,
    "--type-body-md-size": semantic.typography.bodyMd.size,
    "--type-body-md-line-height": semantic.typography.bodyMd.lineHeight,
    "--type-body-sm-size": semantic.typography.bodySm.size,
    "--type-body-sm-line-height": semantic.typography.bodySm.lineHeight,
    "--font-weight-200": primitives.typography.fontWeight.extraLight,
    "--font-weight-300": primitives.typography.fontWeight.light,
    "--font-weight-400": primitives.typography.fontWeight.regular,
    "--font-weight-500": primitives.typography.fontWeight.medium,
    "--font-weight-600": primitives.typography.fontWeight.semibold,
    "--font-weight-700": primitives.typography.fontWeight.bold,
    "--font-weight-800": primitives.typography.fontWeight.extraBold,
    "--font-weight-extralight": primitives.typography.fontWeight.extraLight,
    "--font-weight-light": primitives.typography.fontWeight.light,
    "--font-weight-regular": primitives.typography.fontWeight.regular,
    "--font-weight-medium": primitives.typography.fontWeight.medium,
    "--font-weight-semibold": primitives.typography.fontWeight.semibold,
    "--font-weight-bold": primitives.typography.fontWeight.bold,
    "--font-weight-extrabold": primitives.typography.fontWeight.extraBold,

    // Shared control roles
    "--height-control-sm": semantic.controls.height.sm,
    "--height-control-md": semantic.controls.height.md,
    "--height-control-lg": semantic.controls.height.lg,
    "--icon-size-sm": semantic.controls.icon.sm,
    "--icon-size-md": semantic.controls.icon.md,
    "--icon-size-lg": semantic.controls.icon.lg,
    "--radius-control-pill": semantic.controls.radius.pill,
    "--radius-control-input": semantic.controls.radius.input,
    "--radius-control-soft": semantic.controls.radius.soft,
    "--radius-surface-card": semantic.controls.radius.card,
    "--radius-scale-xs": primitives.radius.xs,
    "--radius-scale-sm": primitives.radius.sm,
    "--radius-scale-md": primitives.radius.md,
    "--radius-scale-lg": primitives.radius.lg,
    "--radius-scale-xl": primitives.radius.xl,
    "--radius-scale-2xl": primitives.radius["2xl"],
    "--radius-scale-3xl": primitives.radius["3xl"],
    "--radius-scale-full": primitives.radius.full,

    // Compatibility aliases — still kept for legacy consumers during migration
    "--color-background": "var(--color-bg-page)",
    "--color-background-card": "var(--color-bg-surface)",
    "--color-background-elevated": "var(--color-bg-elevated)",
    "--color-input-bg": "var(--color-bg-input)",
    "--color-active": "var(--color-pressed)",
    "--color-scrollbar": primitives.colors.slate[400],
    "--color-scrollbar-hover": primitives.colors.slate[500],

    // Shared sizing primitives
    ...Object.entries(primitives.spacing).reduce(
      (acc, [step, value]) => {
        acc[`--space-${step}`] = value;
        return acc;
      },
      {} as Record<string, string>
    ),
    "--size-3": "12px",
    "--size-4": "16px",
    "--size-5": "20px",
    "--size-6": primitives.sizing[6],
    "--size-8": primitives.sizing[8],
    "--size-10": primitives.sizing[10],
    "--size-12": primitives.sizing[12],
    "--size-14": primitives.sizing[14],
    "--size-16": primitives.sizing[16],
    "--size-20": primitives.sizing[20],
    "--size-24": primitives.sizing[24],
    "--size-25": primitives.sizing[25],
    "--size-32": primitives.sizing[32],

    // Shared form/control aliases
    "--color-border-input": semantic.formField.border,
    "--color-border-active": semantic.formField.borderActive,
    "--color-border-disable": "var(--color-border)",
    "--color-bg-active": semantic.formField.bgActive,
    "--color-bg-active-hover": semantic.formField.bgActiveHover,

    // Shared status recipes
    "--status-success-subtle-bg": "var(--color-success-subtle)",
    "--status-success-subtle-border": "var(--color-success-border)",
    "--status-success-subtle-text": "var(--color-success)",
    "--status-success-subtle-icon": "var(--color-success)",
    "--status-success-strong-bg": "var(--color-success)",
    "--status-success-strong-text": semantic.status.success.strongText,
    "--status-warning-subtle-bg": "var(--color-warning-subtle)",
    "--status-warning-subtle-border": "var(--color-warning-border)",
    "--status-warning-subtle-text": "var(--color-warning)",
    "--status-warning-subtle-icon": "var(--color-warning)",
    "--status-warning-strong-bg": "var(--color-warning)",
    "--status-warning-strong-text": semantic.status.warning.strongText,
    "--status-danger-subtle-bg": "var(--color-danger-subtle)",
    "--status-danger-subtle-border": "var(--color-danger-border)",
    "--status-danger-subtle-text": "var(--color-danger)",
    "--status-danger-subtle-icon": "var(--color-danger)",
    "--status-danger-strong-bg": "var(--color-danger)",
    "--status-danger-strong-text": semantic.status.danger.strongText,
    "--status-danger-strong-border-accent": semantic.status.danger.strongBorderAccent,
    "--status-info-subtle-bg": "var(--color-info)",
    "--status-info-subtle-border": "var(--color-info-border)",
    "--status-info-subtle-text": semantic.status.info.subtleText,
    "--status-info-subtle-icon": semantic.status.info.subtleIcon,
    "--status-info-strong-bg": "var(--color-info-strong)",
    "--status-info-strong-text": "var(--color-text-on-brand)",
    "--status-accent-subtle-bg": semantic.status.accent.subtleBg,
    "--status-accent-subtle-border": semantic.status.accent.subtleBorder,
    "--status-accent-subtle-text": semantic.status.accent.subtleText,
    "--status-accent-strong-bg": semantic.status.accent.strongBg,
    "--status-accent-strong-text": semantic.status.accent.strongText,
    "--status-cyan-subtle-bg": semantic.status.cyan.subtleBg,
    "--status-cyan-subtle-border": semantic.status.cyan.subtleBorder,
    "--status-cyan-subtle-text": semantic.status.cyan.subtleText,
    "--status-cyan-strong-bg": semantic.status.cyan.strongBg,
    "--status-cyan-strong-text": semantic.status.cyan.strongText,
    "--status-peach-subtle-bg": semantic.status.peach.subtleBg,
    "--status-peach-subtle-border": semantic.status.peach.subtleBorder,
    "--status-peach-subtle-text": semantic.status.peach.subtleText,
    "--status-peach-subtle-icon": semantic.status.peach.subtleIcon,
    "--status-peach-strong-bg": semantic.status.peach.strongBg,
    "--status-peach-strong-text": semantic.status.peach.strongText,
    "--status-sky-subtle-bg": semantic.status.sky.subtleBg,
    "--status-sky-subtle-border": semantic.status.sky.subtleBorder,
    "--status-sky-subtle-text": semantic.status.sky.subtleText,
    "--status-sky-subtle-icon": semantic.status.sky.subtleIcon,
    "--status-sky-strong-bg": semantic.status.sky.strongBg,
    "--status-sky-strong-text": semantic.status.sky.strongText,

    // Compatibility status aliases
    "--color-success-strong": "var(--status-success-strong-bg)",
    "--color-success-text-on": "var(--status-success-strong-text)",
    "--color-warning-strong": "var(--status-warning-strong-bg)",
    "--color-warning-text-on": "var(--status-warning-strong-text)",
    "--color-danger-strong": "var(--status-danger-strong-bg)",
    "--color-danger-text-on": "var(--status-danger-strong-text)",
    "--color-info-subtle": "var(--status-info-subtle-bg)",
    "--color-info-text": "var(--status-info-subtle-text)",
    "--color-info-text-on": "var(--status-info-strong-text)",
    "--color-info2-subtle": "var(--status-accent-subtle-bg)",
    "--color-info2-text": "var(--status-accent-subtle-text)",
    "--color-info2-border": "var(--status-accent-subtle-border)",
    "--color-info2-strong": "var(--status-accent-strong-bg)",
    "--color-info2-text-on": "var(--status-accent-strong-text)",
    "--color-info3-subtle": "var(--status-cyan-subtle-bg)",
    "--color-info3-text": "var(--status-cyan-subtle-text)",
    "--color-info3-border": "var(--status-cyan-subtle-border)",
    "--color-info3-strong": "var(--status-cyan-strong-bg)",
    "--color-info3-text-on": "var(--status-cyan-strong-text)",

    // Shared surfaces
    "--surface-card-bg": semantic.surface.card.bg,
    "--surface-card-muted-bg": semantic.surface.card.mutedBg,
    "--surface-card-border": semantic.surface.card.border,
    "--surface-card-radius": semantic.surface.card.radius,
    "--surface-card-shadow": semantic.surface.card.shadow,
    "--surface-elevated-bg": "var(--color-bg-elevated)",
    "--surface-elevated-border": "var(--color-border)",
    "--surface-elevated-radius": semantic.surface.elevated.radius,
    "--surface-elevated-shadow": semantic.surface.elevated.shadow,
    "--surface-gradient-product-bg": semantic.surface.gradientProduct.bg,
    "--surface-gradient-product-border": semantic.surface.gradientProduct.border,
    "--surface-gradient-product-text": semantic.surface.gradientProduct.text,
    "--surface-gradient-sunrise-bg": semantic.surface.gradientSunrise.bg,
    "--surface-gradient-sunrise-border": semantic.surface.gradientSunrise.border,
    "--surface-gradient-sunrise-text": semantic.surface.gradientSunrise.text,
    "--surface-gradient-warm-tint-bg": semantic.surface.gradientWarmTint.bg,
    "--surface-gradient-warm-tint-border": semantic.surface.gradientWarmTint.border,
    "--surface-gradient-warm-tint-text": semantic.surface.gradientWarmTint.text,
    "--overlay-bg": semantic.surface.overlay.bg,
    "--overlay-blur": semantic.surface.overlay.blur,
    "--overlay-transition": semantic.surface.overlay.transition,

    // Component — Button
    "--btn-primary-shadow": component.button.primaryShadow,
    "--btn-primary-shadow-hover": component.button.primaryShadowHover,
    "--btn-primary-scale-hover": component.button.primaryScaleHover,
    "--btn-primary-scale-active": component.button.primaryScaleActive,
    "--btn-destructive-shadow": component.button.destructiveShadow,

    // Component — Segment Control
    "--segment-padding": component.segment.padding,
    "--segment-pill-shadow": component.segment.pillShadow,

    // Component — Switch
    "--switch-track-padding": component.switch.trackPadding,
    "--switch-track-width-sm": component.switch.trackWidthSm,
    "--switch-thumb-w-sm": component.switch.thumbWidthSm,
    "--switch-track-width-md": component.switch.trackWidthMd,
    "--switch-thumb-w-md": component.switch.thumbWidthMd,
    "--switch-track-width-lg": component.switch.trackWidthLg,
    "--switch-thumb-w-lg": component.switch.thumbWidthLg,
    "--switch-thumb-shadow": component.switch.thumbShadow,
    "--switch-track-inner-shadow": component.switch.trackInnerShadow,

    // Component — Avatar
    "--avatar-group-overlap": component.avatar.groupOverlap,

    // Component — Floating Panel
    "--floating-panel-width": component.floatingPanel.width,
    "--floating-panel-minimized-width": component.floatingPanel.minimizedWidth,
    "--floating-panel-height-default": component.floatingPanel.heightDefault,
    "--floating-panel-height-tall": component.floatingPanel.heightTall,

    // Component — Side Navigation
    "--side-nav-width": component.sideNavigation.width,
    "--side-nav-collapsed-width": component.sideNavigation.collapsedWidth,
    "--side-nav-item-shadow": component.sideNavigation.activeItemShadow,

    // Component — Overlay glass
    "--overlay-glass-min-width": component.overlayGlass.minWidth,
    "--overlay-glass-width-default": component.overlayGlass.widthDefault,
    "--overlay-glass-width-compact": component.overlayGlass.widthCompact,
    "--overlay-glass-width-wide": component.overlayGlass.widthWide,
    "--overlay-glass-width-narrow": component.overlayGlass.widthNarrow,
    "--overlay-glass-max-height-scroll": component.overlayGlass.maxHeightScroll,
    "--overlay-glass-bg": component.overlayGlass.bgLight,
    "--overlay-glass-border": component.overlayGlass.borderLight,
    "--overlay-glass-border-width": component.overlayGlass.borderWidth,
    "--overlay-glass-blur": component.overlayGlass.blur,
    "--overlay-glass-saturate": component.overlayGlass.saturate,
    "--overlay-glass-radius": component.overlayGlass.radius,
    "--overlay-glass-shadow": component.overlayGlass.shadow,

    // Docs site theme
    "--docs-hero-radius": docsTheme.heroRadius,
    "--docs-hero-overlay-radius": docsTheme.heroOverlayRadius,
    "--docs-hero-px": docsTheme.heroPaddingX,
    "--docs-hero-py": docsTheme.heroPaddingY,
    "--docs-hero-grid-size": docsTheme.heroGridSize,
    "--docs-hero-title-size": docsTheme.heroTitleSize,
    "--docs-hero-title-line-height": docsTheme.heroTitleLineHeight,
    "--docs-hero-title-letter-spacing": docsTheme.heroTitleLetterSpacing,
    "--docs-card-radius": docsTheme.cardRadius,
    "--docs-card-padding": docsTheme.cardPadding,
    "--docs-card-gap": docsTheme.cardGap,
    "--docs-table-radius": docsTheme.tableRadius,
    "--docs-table-cell-px": docsTheme.tableCellPx,
    "--docs-table-cell-py": docsTheme.tableCellPy,
    "--docs-chip-px": docsTheme.chipPaddingX,
    "--docs-chip-py": docsTheme.chipPaddingY,
    "--docs-chip-radius": docsTheme.chipRadius,
    "--docs-chip-bg": docsTheme.chipBg,
    "--docs-hero-overlay-bg": docsTheme.heroOverlayBg,
    "--docs-hero-overlay-border": docsTheme.heroOverlayBorder,
    "--docs-table-header-bg": docsTheme.tableHeaderBg,
    "--docs-table-stripe-bg": docsTheme.tableStripeBg,

    // Frosted glass
    "--glass-bg-light": frostedGlass.bgLight,
    "--glass-bg-dark": frostedGlass.bgDark,
    "--glass-bg-brand": frostedGlass.bgBrand,
    "--glass-blur-sm": frostedGlass.blurSm,
    "--glass-blur-md": frostedGlass.blurMd,
    "--glass-blur-lg": frostedGlass.blurLg,
    "--glass-border-light": frostedGlass.borderLight,
    "--glass-border-dark": frostedGlass.borderDark,
    "--glass-saturate": frostedGlass.saturate,

    // Shadow
    "--shadow-xs": primitives.shadow.xs,
    "--shadow-sm": primitives.shadow.sm,
    "--shadow-md": primitives.shadow.md,
    "--shadow-lg": primitives.shadow.lg,
    "--shadow-xl": primitives.shadow.xl,
    "--shadow-inset-btn": component.button.primaryShadow,
  };
}

/** Dark mode overrides — semantic layer only */
export function generateDarkModeVars(): Record<string, string> {
  const neutral = primitives.colors.graphite;

  return {
    "--color-bg-page": neutral[900],
    "--color-bg-surface": neutral[800],
    "--color-bg-elevated": "color-mix(in oklab, var(--p-graphite-950) 74%, transparent)",
    "--color-bg-subtle": "color-mix(in oklab, var(--p-graphite-50) 5%, transparent)",
    "--color-bg-subtle-hover": "color-mix(in oklab, var(--p-graphite-50) 9%, transparent)",
    "--color-bg-input": neutral[800],
    "--color-bg-input-hover": "color-mix(in oklab, var(--p-graphite-50) 5%, transparent)",
    "--color-bg-inverted": neutral[50],
    "--color-text-primary": neutral[50],
    "--color-text-secondary": neutral[300],
    "--color-text-muted": neutral[500],
    "--color-text-inverted": neutral[950],
    "--color-border": neutral[700],
    "--color-border-strong": neutral[600],
    "--color-border-interactive": neutral[400],
    "--color-scrollbar": neutral[700],
    "--color-scrollbar-hover": neutral[600],

    // Interaction states — dark mode
    "--color-hover": "color-mix(in oklab, var(--p-graphite-50) 5%, transparent)",
    "--color-pressed": "color-mix(in oklab, var(--p-graphite-50) 21%, transparent)",

    "--color-brand-subtle": "oklch(0.514 0.224 268.7 / 0.16)",
    "--color-accent-subtle": "oklch(0.530 0.251 299.2 / 0.16)",

    "--color-success": primitives.colors.success[300],
    "--color-success-subtle": "oklch(0.703 0.205 120 / 0.15)",
    "--color-success-border": "oklch(0.703 0.205 120 / 0.30)",
    "--color-info": "oklch(0.514 0.224 268.7 / 0.15)",
    "--color-info-border": "oklch(0.514 0.224 268.7 / 0.30)",
    "--color-peach": primitives.colors.peach[300],
    "--color-peach-subtle": "oklch(0.758 0.109 73.6 / 0.15)",
    "--color-peach-border": "oklch(0.758 0.109 73.6 / 0.30)",
    "--color-peach-strong": primitives.colors.peach[300],
    "--color-sky": primitives.colors.sky[300],
    "--color-sky-subtle": "oklch(0.739 0.090 237.7 / 0.16)",
    "--color-sky-border": "oklch(0.739 0.090 237.7 / 0.30)",
    "--color-sky-strong": primitives.colors.sky[300],
    "--color-warning": primitives.colors.warning[300],
    "--color-warning-subtle": "oklch(0.67 0.185 55 / 0.15)",
    "--color-warning-border": "oklch(0.67 0.185 55 / 0.30)",
    "--color-danger": primitives.colors.error[300],
    "--color-danger-subtle": "oklch(0.657 0.183 25 / 0.15)",
    "--color-danger-border": "oklch(0.657 0.183 25 / 0.30)",
    "--surface-elevated-bg": "color-mix(in oklab, var(--p-graphite-950) 74%, transparent)",
    "--surface-elevated-border": neutral[800],
    "--surface-card-bg": neutral[800],
    "--surface-card-muted-bg": "color-mix(in oklab, var(--p-graphite-50) 5%, transparent)",
    "--surface-card-border": neutral[700],
    "--surface-card-shadow": "0 0 5.2px 1px rgba(0, 0, 0, 0.25)",
    "--surface-gradient-product-border":
      "color-mix(in oklab, var(--color-peach-border) 48%, var(--color-sky-border) 52%)",
    "--surface-gradient-sunrise-bg":
      "linear-gradient(152deg, oklch(0.758 0.109 73.6 / 0.18) 2%, oklch(0.739 0.090 237.7 / 0.20) 103%)",
    "--surface-gradient-sunrise-border":
      "color-mix(in oklab, var(--color-peach-border) 50%, var(--color-sky-border) 50%)",
    "--surface-gradient-warm-tint-bg":
      "linear-gradient(187.243deg, oklch(1 0 89.9 / 0) 1.323%, oklch(0.924 0.018 81.3 / 0.14) 69.215%)",
    "--surface-gradient-warm-tint-border":
      "color-mix(in oklab, var(--color-peach-border) 52%, var(--color-border) 48%)",
    "--overlay-bg": "color-mix(in oklab, var(--p-graphite-950) 40%, transparent)",

    // Glass dark
    "--glass-bg-light": frostedGlass.bgDark,
    "--glass-border-light": frostedGlass.borderDark,

    // Overlay glass dark
    "--overlay-glass-bg": "color-mix(in oklab, var(--p-graphite-950) 74%, transparent)",
    "--overlay-glass-border": neutral[800],
    "--segment-pill-shadow": "0 0 6.5px rgba(0, 0, 0, 0.08)",
  };
}

// ─────────────────────────────────────────────
// Full export
// ─────────────────────────────────────────────

export const duboTokens = {
  primitives,
  semantic,
  component,
  componentTokenDocs,
  sharedComponentTokenGroups,
  docsTheme,
  frostedGlass,
  generateLightModeVars,
  generateDarkModeVars,
} as const;

export default duboTokens;
