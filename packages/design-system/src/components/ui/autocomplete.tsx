"use client";

import * as React from "react";
import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, X } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";
import { Command, CommandList } from "dubo-design-system/components/ui/command";
import { dropdownPanelClasses } from "dubo-design-system/components/ui/dropdown-menu";
import { Button } from "./button";
import { Label } from "./label";
import {
  fieldBodyLgClass,
  fieldClearActionClass,
  fieldClearActionVisibleClass,
  fieldDescriptionClass,
  fieldOpenFilledVariantClass,
  fieldOpenOutlineVariantClass,
  fieldTransitionClass,
  floatingLabelCompactClass,
  floatingLabelIdleClass,
} from "dubo-design-system/components/ui/field-styles";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";

type AutocompleteChangeEventDetails = ComboboxPrimitive.Root.ChangeEventDetails;

function getAutocompleteItemLabel<Value>(
  item: Value | null | undefined,
  itemToStringLabel?: (item: Value) => string
) {
  if (item == null) return "";
  if (itemToStringLabel) return itemToStringLabel(item);
  if (typeof item === "string") return item;
  if (typeof item === "object" && "label" in item) {
    const label = (item as { label?: unknown }).label;
    return typeof label === "string" ? label : "";
  }
  return String(item);
}

export interface AutocompleteProps<Value> extends ComboboxPrimitive.Root.Props<Value, false> {
  minSearchChars?: number;
  openOnlyWhenMinCharsReached?: boolean;
  searchDebounceMs?: number;
  onSearchTermChange?: (term: string) => void;
  clearSearchTermOnSelect?: boolean;
  clearSearchTermOnClose?: boolean;
  clearSelectedValueOnInputChange?: boolean;
}

function Autocomplete<Value>({
  value: valueProp,
  defaultValue = null,
  inputValue: inputValueProp,
  open: openProp,
  itemToStringLabel,
  onInputValueChange,
  onOpenChange,
  onValueChange,
  minSearchChars = 0,
  openOnlyWhenMinCharsReached = false,
  searchDebounceMs = 0,
  onSearchTermChange,
  clearSearchTermOnSelect = false,
  clearSearchTermOnClose = false,
  clearSelectedValueOnInputChange = false,
  ...props
}: AutocompleteProps<Value>) {
  const searchTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const [uncontrolledValue, setUncontrolledValue] = React.useState<Value | null>(defaultValue);
  const [uncontrolledInputValue, setUncontrolledInputValue] = React.useState(() =>
    getAutocompleteItemLabel(defaultValue, itemToStringLabel)
  );
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);

  const isValueControlled = valueProp !== undefined;
  const isInputValueControlled = inputValueProp !== undefined;
  const isOpenControlled = openProp !== undefined;

  const selectedValue = (isValueControlled ? valueProp : uncontrolledValue) ?? null;
  const inputValue = isInputValueControlled ? inputValueProp : uncontrolledInputValue;
  const normalizedInputValue =
    typeof inputValue === "string"
      ? inputValue
      : Array.isArray(inputValue)
        ? inputValue.join("")
        : inputValue == null
          ? ""
          : String(inputValue);
  const open = isOpenControlled ? openProp : uncontrolledOpen;
  const selectedLabel = React.useMemo(
    () => getAutocompleteItemLabel(selectedValue, itemToStringLabel),
    [itemToStringLabel, selectedValue]
  );

  const clearSearchTimer = React.useCallback(() => {
    if (searchTimerRef.current) {
      clearTimeout(searchTimerRef.current);
      searchTimerRef.current = null;
    }
  }, []);

  React.useEffect(() => {
    return () => {
      clearSearchTimer();
    };
  }, [clearSearchTimer]);

  React.useEffect(() => {
    if (isInputValueControlled) return;
    if (selectedValue != null) {
      setUncontrolledInputValue(selectedLabel);
    }
  }, [isInputValueControlled, selectedLabel, selectedValue]);

  const setNextOpen = React.useCallback(
    (nextOpen: boolean) => {
      if (!isOpenControlled) {
        setUncontrolledOpen(nextOpen);
      }
    },
    [isOpenControlled]
  );

  const setNextInputValue = React.useCallback(
    (nextValue: string) => {
      if (!isInputValueControlled) {
        setUncontrolledInputValue(nextValue);
      }
    },
    [isInputValueControlled]
  );

  const setNextValue = React.useCallback(
    (nextValue: Value | null) => {
      if (!isValueControlled) {
        setUncontrolledValue(nextValue);
      }
    },
    [isValueControlled]
  );

  const emitSearchTermChange = React.useCallback(
    (term: string) => {
      if (!onSearchTermChange) return;

      const normalizedTerm = term.trim();
      const emittedTerm =
        normalizedTerm.length === 0 || normalizedTerm.length >= minSearchChars ? term : "";

      clearSearchTimer();

      if (emittedTerm === "" || searchDebounceMs <= 0) {
        onSearchTermChange(emittedTerm);
        return;
      }

      searchTimerRef.current = setTimeout(() => {
        onSearchTermChange(emittedTerm);
      }, searchDebounceMs);
    },
    [clearSearchTimer, minSearchChars, onSearchTermChange, searchDebounceMs]
  );

  const handleInputValueChange = React.useCallback(
    (nextValue: string, eventDetails: AutocompleteChangeEventDetails) => {
      setNextInputValue(nextValue);
      onInputValueChange?.(nextValue, eventDetails);

      if (eventDetails.reason === "item-press") {
        return;
      }

      if (eventDetails.reason === "clear-press" || eventDetails.reason === "input-clear") {
        if (clearSelectedValueOnInputChange && selectedValue != null) {
          setNextValue(null);
          onValueChange?.(null, eventDetails);
        }

        setNextOpen(false);
        emitSearchTermChange("");
        return;
      }

      if (eventDetails.reason === "input-change") {
        if (
          clearSelectedValueOnInputChange &&
          selectedValue != null &&
          nextValue !== selectedLabel
        ) {
          setNextValue(null);
          onValueChange?.(null, eventDetails);
        }

        const normalizedTerm = nextValue.trim();

        if (openOnlyWhenMinCharsReached && normalizedTerm.length < minSearchChars) {
          setNextOpen(false);
          emitSearchTermChange("");
          return;
        }

        if (openOnlyWhenMinCharsReached && normalizedTerm.length >= minSearchChars) {
          setNextOpen(true);
        }

        emitSearchTermChange(nextValue);
      }
    },
    [
      clearSelectedValueOnInputChange,
      emitSearchTermChange,
      minSearchChars,
      onInputValueChange,
      onValueChange,
      openOnlyWhenMinCharsReached,
      selectedLabel,
      selectedValue,
      setNextInputValue,
      setNextOpen,
      setNextValue,
    ]
  );

  const handleOpenChange = React.useCallback(
    (nextOpen: boolean, eventDetails: AutocompleteChangeEventDetails) => {
      const canOpen =
        !openOnlyWhenMinCharsReached || normalizedInputValue.trim().length >= minSearchChars;
      const resolvedOpen = nextOpen && canOpen;

      setNextOpen(resolvedOpen);

      if (!resolvedOpen && clearSearchTermOnClose) {
        emitSearchTermChange("");
      }

      onOpenChange?.(resolvedOpen, eventDetails);
    },
    [
      clearSearchTermOnClose,
      emitSearchTermChange,
      normalizedInputValue,
      minSearchChars,
      onOpenChange,
      openOnlyWhenMinCharsReached,
      setNextOpen,
    ]
  );

  const handleValueChange = React.useCallback(
    (nextValue: Value | null, eventDetails: AutocompleteChangeEventDetails) => {
      setNextValue(nextValue);
      setNextInputValue(getAutocompleteItemLabel(nextValue, itemToStringLabel));
      setNextOpen(false);
      clearSearchTimer();

      if (clearSearchTermOnSelect) {
        onSearchTermChange?.("");
      }

      onValueChange?.(nextValue, eventDetails);
    },
    [
      clearSearchTermOnSelect,
      clearSearchTimer,
      itemToStringLabel,
      onSearchTermChange,
      onValueChange,
      setNextInputValue,
      setNextOpen,
      setNextValue,
    ]
  );

  return (
    <ComboboxPrimitive.Root<Value, false>
      {...props}
      value={selectedValue}
      inputValue={normalizedInputValue}
      open={open}
      itemToStringLabel={itemToStringLabel}
      onInputValueChange={handleInputValueChange}
      onOpenChange={handleOpenChange}
      onValueChange={handleValueChange}
    />
  );
}

const AutocompleteValue = ComboboxPrimitive.Value;
const AutocompleteCollection = ComboboxPrimitive.Collection;
const AutocompleteRow = ComboboxPrimitive.Row;
const AutocompleteGroup = ComboboxPrimitive.Group;
const AutocompletePortal = ComboboxPrimitive.Portal;
const AutocompleteBackdrop = ComboboxPrimitive.Backdrop;
const AutocompleteArrow = ComboboxPrimitive.Arrow;
const AutocompleteSeparator = ComboboxPrimitive.Separator;

const inputFieldBase = [
  "h-full w-full border-none bg-transparent outline-none",
  fieldBodyLgClass,
  "text-[color:var(--color-text-primary)]",
  "placeholder:text-[color:var(--color-text-muted)]",
  "focus:outline-none focus:ring-0",
  "disabled:cursor-not-allowed",
].join(" ");

type AutocompleteInputChangeEvent = Parameters<
  NonNullable<ComboboxPrimitive.Input.Props["onChange"]>
>[0];
type AutocompleteInputFocusEvent = Parameters<
  NonNullable<ComboboxPrimitive.Input.Props["onFocus"]>
>[0];
type AutocompleteInputBlurEvent = Parameters<
  NonNullable<ComboboxPrimitive.Input.Props["onBlur"]>
>[0];

const inputContainerVariants = cva(
  [
    "group flex w-full items-center",
    "rounded-[var(--radius-control-input)]",
    "border",
    "px-[var(--space-2)] gap-[var(--space-1)]",
    fieldTransitionClass,
  ].join(" "),
  {
    variants: {
      variant: {
        outline: fieldOpenOutlineVariantClass,
        filled: fieldOpenFilledVariantClass,
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

const floatingContainerVariants = cva(
  [
    "group relative flex w-full items-center",
    "rounded-[var(--radius-scale-xl)]",
    "border",
    "px-[var(--space-2)] gap-[var(--space-1)]",
    fieldTransitionClass,
  ].join(" "),
  {
    variants: {
      variant: {
        outline: fieldOpenOutlineVariantClass,
        filled: fieldOpenFilledVariantClass,
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

function AutocompleteClearButton({
  visible,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Clear> & {
  visible: boolean;
}) {
  const clearLabel = useDesignSystemLabel("clear");

  return (
    <ComboboxPrimitive.Clear
      className={cn(fieldClearActionClass, visible && fieldClearActionVisibleClass, className)}
      {...props}
    >
      <X className="size-[var(--icon-size-sm)]" />
      <span className="sr-only">{clearLabel}</span>
    </ComboboxPrimitive.Clear>
  );
}

function AutocompleteChevronButton({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Trigger>) {
  const toggleLabel = useDesignSystemLabel("toggleSuggestions");

  return (
    <ComboboxPrimitive.Trigger
      className={(state) =>
        cn(
          "inline-flex shrink-0 items-center justify-center rounded-[var(--radius-control-pill)] p-0.5",
          "text-[color:var(--color-text-muted)]",
          fieldTransitionClass,
          "hover:bg-[var(--color-hover)] hover:text-[color:var(--color-text-secondary)]",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--focus-ring)]",
          state.open && "rotate-180",
          typeof className === "function" ? className(state) : className
        )
      }
      {...props}
    >
      <ChevronDown className="size-[var(--icon-size-md)]" />
      <span className="sr-only">{toggleLabel}</span>
    </ComboboxPrimitive.Trigger>
  );
}

export interface AutocompleteInputProps
  extends Omit<ComboboxPrimitive.Input.Props, "size">, VariantProps<typeof inputContainerVariants> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  error?: boolean;
  icon?: React.ReactNode;
  clearable?: boolean;
  showTrigger?: boolean;
  wrapperClassName?: string;
}

const AutocompleteInput = React.forwardRef<HTMLInputElement, AutocompleteInputProps>(
  (
    {
      className,
      wrapperClassName,
      variant,
      label,
      helpText,
      error = false,
      icon,
      clearable = false,
      showTrigger = false,
      disabled,
      id,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const internalRef = React.useRef<HTMLInputElement | null>(null);
    const [internalHasValue, setInternalHasValue] = React.useState(false);
    const hasValue =
      typeof value === "string"
        ? value !== ""
        : value !== undefined && value !== null
          ? String(value) !== ""
          : internalHasValue;

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        internalRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        if (node) setInternalHasValue(node.value !== "");
      },
      [ref]
    );

    const handleChange = React.useCallback(
      (event: AutocompleteInputChangeEvent) => {
        setInternalHasValue(event.target.value !== "");
        onChange?.(event);
      },
      [onChange]
    );

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        {label ? (
          <Label
            htmlFor={inputId}
            className={cn(disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]")}
            disabled={disabled}
          >
            {label}
          </Label>
        ) : null}
        <ComboboxPrimitive.InputGroup
          render={(inputGroupProps, state) => {
            const showClearButton = hasValue || !state.placeholder;

            return (
              <div
                {...inputGroupProps}
                className={cn(
                  inputGroupProps.className,
                  inputContainerVariants({ variant }),
                  "h-[var(--height-control-md)]",
                  error && "border-[var(--color-danger)] focus-within:border-[var(--color-danger)]",
                  disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
                  className
                )}
              >
                {icon ? (
                  <span className="shrink-0 text-[color:var(--color-text-secondary)] [&_svg]:size-[var(--icon-size-md)]">
                    {icon}
                  </span>
                ) : null}
                <ComboboxPrimitive.Input
                  ref={setRefs}
                  id={inputId}
                  disabled={disabled}
                  className={inputFieldBase}
                  onChange={handleChange}
                  {...props}
                />
                {clearable ? <AutocompleteClearButton visible={showClearButton} /> : null}
                {showTrigger ? <AutocompleteChevronButton /> : null}
              </div>
            );
          }}
        />
        {helpText ? (
          <p
            className={cn(
              fieldDescriptionClass,
              error
                ? "text-[color:var(--color-danger)]"
                : "text-[color:var(--color-text-secondary)]"
            )}
          >
            {helpText}
          </p>
        ) : null}
      </div>
    );
  }
);
AutocompleteInput.displayName = "AutocompleteInput";

export interface FloatingAutocompleteInputProps
  extends
    Omit<ComboboxPrimitive.Input.Props, "size" | "placeholder">,
    VariantProps<typeof floatingContainerVariants> {
  label: string;
  helpText?: React.ReactNode;
  error?: boolean;
  icon?: React.ReactNode;
  clearable?: boolean;
  showTrigger?: boolean;
  wrapperClassName?: string;
}

const FloatingAutocompleteInput = React.forwardRef<
  HTMLInputElement,
  FloatingAutocompleteInputProps
>(
  (
    {
      className,
      wrapperClassName,
      variant,
      label,
      helpText,
      error = false,
      icon,
      clearable = false,
      showTrigger = false,
      disabled,
      id,
      value,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;
    const [internalHasValue, setInternalHasValue] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue =
      typeof value === "string"
        ? value !== ""
        : value !== undefined && value !== null
          ? String(value) !== ""
          : internalHasValue;

    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
        if (node) setInternalHasValue(node.value !== "");
      },
      [ref]
    );

    const handleChange = React.useCallback(
      (event: AutocompleteInputChangeEvent) => {
        setInternalHasValue(event.target.value !== "");
        onChange?.(event);
      },
      [onChange]
    );

    const handleFocus = React.useCallback(
      (event: AutocompleteInputFocusEvent) => {
        setIsFocused(true);
        onFocus?.(event);
      },
      [onFocus]
    );

    const handleBlur = React.useCallback(
      (event: AutocompleteInputBlurEvent) => {
        setIsFocused(false);
        onBlur?.(event);
      },
      [onBlur]
    );

    return (
      <div className={cn("flex flex-col gap-1.5", wrapperClassName)}>
        <ComboboxPrimitive.InputGroup
          render={(inputGroupProps, state) => {
            const hasDisplayValue = hasValue || !state.placeholder;
            const isCompact = state.open || isFocused || hasDisplayValue;

            return (
              <div
                {...inputGroupProps}
                className={cn(
                  inputGroupProps.className,
                  floatingContainerVariants({ variant }),
                  "h-[var(--size-14)]",
                  error && "border-[var(--color-danger)] focus-within:border-[var(--color-danger)]",
                  disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
                  className
                )}
              >
                {icon ? (
                  <span className="z-10 shrink-0 text-[color:var(--color-text-secondary)] [&_svg]:size-[var(--icon-size-md)]">
                    {icon}
                  </span>
                ) : null}
                <div className="relative h-full flex-1 px-1">
                  <div
                    className={cn(
                      "pointer-events-none absolute inset-x-1 inset-y-0 flex [&>div]:gap-0",
                      isCompact ? "items-start pt-[var(--space-2)]" : "items-center"
                    )}
                  >
                    <Label
                      htmlFor={inputId}
                      disabled={disabled}
                      className={cn(
                        "pointer-events-none !cursor-text transition-all duration-200 ease-out",
                        isCompact
                          ? [
                              floatingLabelCompactClass,
                              error
                                ? "text-[color:var(--color-danger)]"
                                : state.open
                                  ? "text-[color:var(--color-border-focus)]"
                                  : "text-[color:var(--color-text-secondary)]",
                            ].join(" ")
                          : [
                              floatingLabelIdleClass,
                              error
                                ? "text-[color:var(--color-danger)]"
                                : "text-[color:var(--color-text-secondary)]",
                            ].join(" ")
                      )}
                    >
                      {label}
                    </Label>
                  </div>
                  <ComboboxPrimitive.Input
                    ref={setRefs}
                    id={inputId}
                    disabled={disabled}
                    className={cn(
                      inputFieldBase,
                      "pt-[var(--space-5)] pb-[var(--space-1)]",
                      "focus:text-[color:var(--color-text-primary)]"
                    )}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    {...props}
                  />
                </div>
                {clearable ? <AutocompleteClearButton visible={hasDisplayValue} /> : null}
                {showTrigger ? <AutocompleteChevronButton /> : null}
              </div>
            );
          }}
        />
        {helpText ? (
          <p
            className={cn(
              fieldDescriptionClass,
              error
                ? "text-[color:var(--color-danger)]"
                : "text-[color:var(--color-text-secondary)]"
            )}
          >
            {helpText}
          </p>
        ) : null}
      </div>
    );
  }
);
FloatingAutocompleteInput.displayName = "FloatingAutocompleteInput";

const AutocompleteStatus = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Status>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Status>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Status
    ref={ref}
    className={cn(
      "px-[var(--space-3)] py-[calc(var(--space-3)/2)]",
      fieldBodyLgClass,
      "text-[color:var(--color-text-secondary)] empty:m-0 empty:p-0",
      className
    )}
    {...props}
  />
));
AutocompleteStatus.displayName = "AutocompleteStatus";

const AutocompletePositioner = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Positioner>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Positioner>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.Positioner
    ref={ref}
    className={cn("z-[70] pointer-events-auto outline-none", className)}
    {...props}
  />
));
AutocompletePositioner.displayName = "AutocompletePositioner";

export interface AutocompleteContentProps extends React.ComponentPropsWithoutRef<
  typeof ComboboxPrimitive.Popup
> {
  align?: React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Positioner>["align"];
  sideOffset?: React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Positioner>["sideOffset"];
  alignOffset?: React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Positioner>["alignOffset"];
  side?: React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Positioner>["side"];
  anchor?: React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Positioner>["anchor"];
  container?: React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.Portal>["container"];
  showBackdrop?: boolean;
}

const AutocompleteContent = React.forwardRef<HTMLDivElement, AutocompleteContentProps>(
  (
    {
      className,
      children,
      showBackdrop = false,
      align = "start",
      sideOffset = 6,
      alignOffset = 0,
      side = "bottom",
      anchor,
      container,
      ...props
    },
    ref
  ) => (
    <AutocompletePortal container={container}>
      {showBackdrop ? <AutocompleteBackdrop /> : null}
      <AutocompletePositioner
        align={align}
        side={side}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        anchor={anchor}
      >
        <ComboboxPrimitive.Popup
          ref={ref}
          className={cn(
            dropdownPanelClasses,
            "relative z-[70] pointer-events-auto flex w-[var(--anchor-width)] max-w-[var(--available-width)] max-h-[min(var(--available-height),24rem)] flex-col overscroll-contain",
            className
          )}
          {...props}
        >
          <Command
            shouldFilter={false}
            className="pointer-events-auto rounded-none bg-transparent shadow-none"
          >
            {children}
          </Command>
        </ComboboxPrimitive.Popup>
      </AutocompletePositioner>
    </AutocompletePortal>
  )
);
AutocompleteContent.displayName = "AutocompleteContent";

interface AutocompleteListProps extends React.ComponentPropsWithoutRef<
  typeof ComboboxPrimitive.List
> {
  scrollAreaClassName?: string;
}

const AutocompleteList = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.List>,
  AutocompleteListProps
>(({ className, scrollAreaClassName, ...props }, ref) => (
  <CommandList
    className={cn("pointer-events-auto max-h-[300px] min-h-0 overflow-y-auto", scrollAreaClassName)}
  >
    <ComboboxPrimitive.List
      ref={ref}
      className={cn("pointer-events-auto space-y-[var(--space-1)]", className)}
      {...props}
    />
  </CommandList>
));
AutocompleteList.displayName = "AutocompleteList";

const AutocompleteGroupLabel = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.GroupLabel>,
  React.ComponentPropsWithoutRef<typeof ComboboxPrimitive.GroupLabel>
>(({ className, ...props }, ref) => (
  <ComboboxPrimitive.GroupLabel
    ref={ref}
    className={cn(
      "px-[var(--space-3)] py-[calc(var(--space-3)/2)]",
      "text-body-sm [font-weight:var(--font-weight-400)]",
      "text-[color:var(--color-text-muted)]",
      className
    )}
    {...props}
  />
));
AutocompleteGroupLabel.displayName = "AutocompleteGroupLabel";

export interface AutocompleteEmptyProps extends React.ComponentPropsWithoutRef<
  typeof ComboboxPrimitive.Empty
> {
  showCreateAction?: boolean;
  createActionLabel?: React.ReactNode;
  onCreateAction?: () => void;
}

const AutocompleteEmpty = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Empty>,
  AutocompleteEmptyProps
>(
  (
    { className, children, showCreateAction = false, createActionLabel, onCreateAction, ...props },
    ref
  ) => (
    <ComboboxPrimitive.Empty
      ref={ref}
      className={cn(
        "px-[var(--space-3)] py-[var(--space-6)]",
        fieldBodyLgClass,
        "text-[color:var(--color-text-secondary)]",
        "empty:hidden empty:p-0",
        className
      )}
      {...props}
    >
      <div className="flex flex-col items-start gap-[var(--space-2)]">
        {children ? <p>{children}</p> : null}
        {showCreateAction && createActionLabel ? (
          <Button
            type="button"
            variant="link"
            size="sm"
            rounded={false}
            className="h-auto px-0 text-left"
            onClick={onCreateAction}
          >
            {createActionLabel}
          </Button>
        ) : null}
      </div>
    </ComboboxPrimitive.Empty>
  )
);
AutocompleteEmpty.displayName = "AutocompleteEmpty";

export interface AutocompleteItemProps extends React.ComponentPropsWithoutRef<
  typeof ComboboxPrimitive.Item
> {
  icon?: React.ReactNode;
}

const AutocompleteItem = React.forwardRef<
  React.ComponentRef<typeof ComboboxPrimitive.Item>,
  AutocompleteItemProps
>(({ className, children, icon, ...props }, ref) => (
  <ComboboxPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center gap-[var(--space-2)] pointer-events-auto",
      "min-h-[var(--height-control-sm)] py-[calc(var(--space-3)/2)]",
      "px-[var(--space-3)]",
      "rounded-[var(--radius-control-pill)]",
      fieldBodyLgClass,
      "text-[color:var(--color-text-primary)]",
      "outline-none",
      fieldTransitionClass,
      "data-[highlighted]:bg-[var(--color-hover)]",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-[var(--disabled-opacity)]",
      className
    )}
    {...props}
  >
    {icon ? (
      <span className="shrink-0 text-[color:var(--color-text-secondary)] [&_svg]:size-[var(--icon-size-md)]">
        {icon}
      </span>
    ) : null}
    <span className="min-w-0 flex-1">{children}</span>
    <ComboboxPrimitive.ItemIndicator className="shrink-0">
      <Check className="size-[var(--icon-size-md)] text-[color:var(--color-brand)]" />
    </ComboboxPrimitive.ItemIndicator>
  </ComboboxPrimitive.Item>
));
AutocompleteItem.displayName = "AutocompleteItem";

export {
  Autocomplete,
  AutocompleteValue,
  AutocompleteInput,
  FloatingAutocompleteInput,
  AutocompleteStatus,
  AutocompletePortal,
  AutocompleteBackdrop,
  AutocompletePositioner,
  AutocompleteContent,
  AutocompleteList,
  AutocompleteCollection,
  AutocompleteRow,
  AutocompleteItem,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteEmpty,
  AutocompleteArrow,
  AutocompleteSeparator,
};
