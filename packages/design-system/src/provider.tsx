"use client";

import type { ComponentProps, ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import {
  DesignSystemLabelsProvider,
  type DesignSystemLabels,
} from "./lib/labels";

type NextThemeProviderProps = ComponentProps<typeof NextThemesProvider>;

export interface DuboProviderProps extends Omit<NextThemeProviderProps, "children"> {
  children: ReactNode;
  labels?: Partial<DesignSystemLabels>;
}

/**
 * Root provider for standalone consumers such as Figma Make.
 *
 * It configures class-based light/dark themes and the embedded accessibility
 * labels used by dialogs, fields, pagination, navigation, and floating panels.
 */
export function DuboProvider({
  children,
  labels = {},
  attribute = "class",
  defaultTheme = "light",
  enableSystem = true,
  disableTransitionOnChange = true,
  ...themeProps
}: DuboProviderProps) {
  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...themeProps}
    >
      <DesignSystemLabelsProvider labels={labels}>{children}</DesignSystemLabelsProvider>
    </NextThemesProvider>
  );
}
