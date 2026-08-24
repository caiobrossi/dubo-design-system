"use client";

import * as React from "react";
import { Search } from "@dubo/design-system-shared/lib/icons";

import { Input, type InputProps } from "@dubo/design-system-shared/components/ui/input";
import { cn } from "@dubo/design-system-shared/lib/utils";

export interface SearchFieldProps extends Omit<InputProps, "type" | "icon"> {
  clearable?: boolean;
}

const SearchField = React.forwardRef<HTMLInputElement, SearchFieldProps>(
  (
    {
      className,
      variant = "filled",
      clearable = true,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    return (
      <Input
        ref={ref}
        type="search"
        variant={variant}
        placeholder={placeholder}
        icon={<Search />}
        clearable={clearable}
        className={cn(
          "rounded-full border-0 bg-[var(--color-bg-input)] shadow-none",
          className
        )}
        {...props}
      />
    );
  }
);

SearchField.displayName = "SearchField";

export { SearchField };
