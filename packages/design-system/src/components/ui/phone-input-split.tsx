"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { ChevronDown, X } from "dubo-design-system/lib/icons";
import { cn } from "dubo-design-system/lib/utils";
import { useDesignSystemLabel } from "dubo-design-system/lib/labels";
import { parsePhoneNumber, getCountryCallingCode, type CountryCode } from "libphonenumber-js";
import { getCountries } from "react-phone-number-input";
import pt from "react-phone-number-input/locale/pt";

import {
  fieldBodyLgClass,
  fieldClearActionClass,
  fieldClearActionVisibleClass,
  fieldDescriptionClass,
  fieldFilledVariantClass,
  fieldOutlineVariantClass,
  fieldTransitionClass,
  floatingLabelCompactFilledClass,
  floatingLabelCompactFocusClass,
  floatingLabelIdleClass,
} from "dubo-design-system/components/ui/field-styles";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "dubo-design-system/components/ui/popover";
import { ScrollArea } from "dubo-design-system/components/ui/scroll-area";
import { SearchField } from "dubo-design-system/components/ui/search-field";

const phoneFieldVariants = cva(
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
        outline: fieldOutlineVariantClass,
        filled: fieldFilledVariantClass,
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

const countryTriggerVariants = cva(
  [
    "inline-flex shrink-0 items-center justify-center gap-[var(--space-1)]",
    "h-[var(--size-14)] min-w-[84px] px-[var(--space-3)]",
    "rounded-[var(--radius-scale-xl)] border",
    fieldTransitionClass,
  ].join(" "),
  {
    variants: {
      variant: {
        outline: fieldOutlineVariantClass,
        filled: fieldFilledVariantClass,
      },
    },
    defaultVariants: {
      variant: "outline",
    },
  }
);

export interface PhoneInputSplitProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange">,
    VariantProps<typeof phoneFieldVariants> {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: boolean;
  helpText?: React.ReactNode;
  defaultCountry?: CountryCode;
  clearable?: boolean;
  onClear?: () => void;
  portalContainer?: HTMLElement | null;
  searchPlaceholder?: string;
  noCountriesFoundText?: string;
  hideIdleLabel?: boolean;
  compactLabelClassName?: string;
  countryTriggerClassName?: string;
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

function getCountryName(countryCode: CountryCode): string {
  return pt[countryCode] || countryCode;
}

function formatNationalNumber(digits: string, country: CountryCode): string {
  if (!digits) return "";

  if (country === "PT") {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
  }

  if (country === "BR") {
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 2)} ${digits.slice(2)}`;
    if (digits.length <= 11) {
      const areaCode = digits.slice(0, 2);
      const remaining = digits.slice(2);
      if (remaining.length <= 4) return `${areaCode} ${remaining}`;
      if (remaining.length <= 5) return `${areaCode} ${remaining.slice(0, 5)}`;
      return `${areaCode} ${remaining.slice(0, 5)} ${remaining.slice(5)}`;
    }
    return digits;
  }

  if (country === "ES") {
    if (digits.length <= 3) return digits;
    if (digits.length <= 5) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`;
  }

  if (country === "US" || country === "CA") {
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`;
  }

  if (country === "GB") {
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }

  const groups = [];
  for (let i = 0; i < digits.length; i += 3) groups.push(digits.slice(i, i + 3));
  return groups.join(" ");
}

const PhoneInputSplit = React.forwardRef<HTMLInputElement, PhoneInputSplitProps>(
  (
    {
      className,
      variant = "filled",
      label,
      value,
      onChange,
      error = false,
      helpText,
      defaultCountry = "PT",
      clearable = false,
      onClear,
      disabled = false,
      portalContainer,
      searchPlaceholder = "Search country",
      noCountriesFoundText = "No countries found",
      hideIdleLabel = false,
      compactLabelClassName,
      countryTriggerClassName,
      id,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);
    const clearLabel = useDesignSystemLabel("clear");

    // `label` só chega a ser nome acessível do input se o `htmlFor` apontar para um
    // `id` real. Nenhum dos usos no produto passava `id`, o que deixava todos os
    // campos de telemóvel — registo, ficha de paciente, profissionais, filiais —
    // anunciados como "caixa de texto" sem mais nada. Gerar um id quando não vem
    // de fora corrige todos os usos de uma vez, sem obrigar cada chamada a lembrar-se.
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const getInitialCountry = React.useCallback((): CountryCode => {
      if (value) {
        try {
          const parsed = parsePhoneNumber(value);
          if (parsed?.country) return parsed.country;
        } catch {
          // Ignore invalid intermediate values.
        }
      }
      return defaultCountry;
    }, [defaultCountry, value]);

    const [selectedCountry, setSelectedCountry] = React.useState<CountryCode>(getInitialCountry);

    React.useEffect(() => {
      setSelectedCountry(getInitialCountry());
    }, [getInitialCountry]);

    const countries = React.useMemo(() => getCountries(), []);

    const filteredCountries = React.useMemo(() => {
      if (!searchQuery.trim()) return countries;
      const query = searchQuery.toLowerCase();
      return countries.filter((country) => {
        const name = getCountryName(country).toLowerCase();
        const code = `+${getCountryCallingCode(country)}`;
        return (
          name.includes(query) || code.includes(query) || country.toLowerCase().includes(query)
        );
      });
    }, [countries, searchQuery]);

    const getRawNationalNumber = React.useCallback((): string => {
      if (!value) return "";
      try {
        const parsed = parsePhoneNumber(value);
        if (parsed?.nationalNumber) return parsed.nationalNumber;
      } catch {
        const countryCode = `+${getCountryCallingCode(selectedCountry)}`;
        if (value.startsWith(countryCode))
          return value.slice(countryCode.length).replace(/\D/g, "");
      }
      return value.replace(/^\+\d+\s*/, "").replace(/\D/g, "");
    }, [selectedCountry, value]);

    const rawNationalNumber = React.useMemo(() => {
      if (!value) return "";
      const countryCodePrefix = `+${getCountryCallingCode(selectedCountry)}`;
      if (value.startsWith(countryCodePrefix)) {
        return value.slice(countryCodePrefix.length).replace(/\D/g, "");
      }
      if (value.startsWith("+")) {
        const match = value.match(/^\+\d{1,4}(.*)$/);
        if (match) return match[1].replace(/\D/g, "");
      }
      return value.replace(/\D/g, "");
    }, [selectedCountry, value]);

    const formattedNationalNumber = React.useMemo(
      () => formatNationalNumber(rawNationalNumber, selectedCountry),
      [rawNationalNumber, selectedCountry]
    );

    const displayValue = isFocused ? rawNationalNumber : formattedNationalNumber;
    const hasValue = value.trim().length > 0;
    const callingCode = `+${getCountryCallingCode(selectedCountry)}`;

    const handleCountryChange = React.useCallback(
      (country: CountryCode) => {
        setSelectedCountry(country);
        setIsOpen(false);
        setSearchQuery("");

        const nationalNumber = getRawNationalNumber();
        if (nationalNumber) {
          const newCallingCode = getCountryCallingCode(country);
          onChange(`+${newCallingCode}${nationalNumber}`);
        }
      },
      [getRawNationalNumber, onChange]
    );

    const handlePhoneChange = React.useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const digits = event.target.value.replace(/\D/g, "");
        if (!digits) {
          onChange("");
          return;
        }
        const normalized = `+${getCountryCallingCode(selectedCountry)}${digits}`;
        onChange(normalized);
      },
      [onChange, selectedCountry]
    );

    const handleClear = React.useCallback(() => {
      onChange("");
      onClear?.();
    }, [onChange, onClear]);

    return (
      // `min-w-0` porque o componente vive quase sempre dentro de uma grelha ou
      // de um flex: sem isto, num ecrã estreito o campo do número era espremido
      // até zero — a caixa mostrava a bandeira e o `+351` e não havia onde
      // escrever (DUB-025). Com `min-w-0` o contentor pode encolher, e é o
      // indicativo que cede em vez do input.
      <div className={cn("flex min-w-0 gap-2", className)}>
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              disabled={disabled}
              className={cn(
                countryTriggerVariants({ variant }),
                countryTriggerClassName,
                "hover:cursor-pointer",
                disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]",
                error && "border-[var(--color-danger)]"
              )}
            >
              <span className="text-heading-2">{getFlagEmoji(selectedCountry)}</span>
              <ChevronDown className="size-[var(--icon-size-sm)] text-[color:var(--color-text-muted)]" />
            </button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            sideOffset={6}
            className="w-[320px] p-0"
            container={portalContainer}
          >
            <div className="border-b border-[var(--color-border)] p-3">
              <SearchField
                autoFocus
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder={searchPlaceholder}
                className="h-[var(--height-control-md)] rounded-[var(--radius-control-pill)]"
              />
            </div>

            <ScrollArea className="h-[300px]">
              {filteredCountries.length === 0 ? (
                <div className="px-4 py-6 text-center text-[color:var(--color-text-secondary)]">
                  <span className={fieldBodyLgClass}>{noCountriesFoundText}</span>
                </div>
              ) : (
                <div className="p-1">
                  {filteredCountries.map((country) => {
                    const code = getCountryCallingCode(country);
                    const name = getCountryName(country);
                    const isSelected = country === selectedCountry;

                    return (
                      <button
                        key={country}
                        type="button"
                        onClick={() => handleCountryChange(country)}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-[var(--radius-control-soft)] px-3 py-2.5 text-left",
                          "transition-colors duration-[var(--transition-fast)]",
                          "hover:bg-[var(--color-hover)]",
                          isSelected && "bg-[var(--color-hover)]"
                        )}
                      >
                        <span className="text-heading-2">{getFlagEmoji(country)}</span>
                        <span
                          className={cn(
                            "min-w-0 flex-1 truncate text-[color:var(--color-text-primary)]",
                            fieldBodyLgClass
                          )}
                        >
                          {name}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 text-[color:var(--color-text-secondary)]",
                            fieldBodyLgClass
                          )}
                        >
                          +{code}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </PopoverContent>
        </Popover>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div
            className={cn(
              phoneFieldVariants({ variant }),
              "h-[var(--size-14)]",
              error && "border-[var(--color-danger)] focus-within:border-[var(--color-danger)]",
              disabled && "cursor-not-allowed opacity-[var(--disabled-opacity)]"
            )}
          >
            <span
              className={cn(
                "z-10 shrink-0 whitespace-nowrap pl-1 text-[color:var(--color-text-secondary)]",
                fieldBodyLgClass
              )}
            >
              {callingCode}
            </span>

            {/*
              O input tem de continuar a caber quando o resto encolhe: sem uma
              largura mínima própria, o indicativo e as margens consumiam tudo e
              sobrava zero para escrever. Com `min-w-[6ch]` o campo mantém-se
              utilizável e é a caixa que passa a transbordar de forma visível,
              em vez de o input desaparecer em silêncio.
            */}
            <div className="relative h-full min-w-[6ch] flex-1 px-1">
              <input
                ref={ref}
                id={inputId}
                type="tel"
                inputMode="tel"
                disabled={disabled}
                value={displayValue}
                placeholder=" "
                className={cn(
                  "h-full w-full min-w-0 border-none bg-transparent outline-none",
                  "peer pt-[var(--space-5)] pb-[var(--space-1)]",
                  fieldBodyLgClass,
                  "text-[color:var(--color-text-primary)] placeholder:text-transparent",
                  "focus:outline-none focus:ring-0"
                )}
                onChange={handlePhoneChange}
                onFocus={(event) => {
                  setIsFocused(true);
                  onFocus?.(event);
                }}
                onBlur={(event) => {
                  setIsFocused(false);
                  onBlur?.(event);
                }}
                {...props}
              />

              <label
                htmlFor={inputId}
                className={cn(
                  "absolute left-1 pointer-events-none select-none transition-all duration-200 ease-out",
                  "top-1/2 -translate-y-1/2",
                  floatingLabelIdleClass,
                  "peer-focus:top-1 peer-focus:-translate-y-0",
                  floatingLabelCompactFocusClass,
                  "peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:-translate-y-0",
                  floatingLabelCompactFilledClass,
                  compactLabelClassName,
                  hideIdleLabel &&
                    "opacity-0 peer-focus:opacity-100 peer-[:not(:placeholder-shown)]:opacity-100",
                  error
                    ? "text-[color:var(--color-danger)]"
                    : [
                        "text-[color:var(--color-text-secondary)]",
                        "peer-focus:text-[color:var(--color-border-focus)]",
                        "peer-[:not(:placeholder-shown)]:text-[color:var(--color-text-secondary)]",
                      ].join(" "),
                  disabled && "opacity-50"
                )}
              >
                {label}
              </label>
            </div>

            {clearable && hasValue && !disabled ? (
              <button
                type="button"
                onClick={handleClear}
                className={cn(fieldClearActionClass, fieldClearActionVisibleClass)}
                aria-label={clearLabel}
              >
                <X className="size-[var(--icon-size-sm)]" />
              </button>
            ) : null}
          </div>

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
      </div>
    );
  }
);

PhoneInputSplit.displayName = "PhoneInputSplit";

export { PhoneInputSplit };
