"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { AlertTriangle } from "dubo-design-system/lib/icons";

import { cn } from "dubo-design-system/lib/utils";
import { Button } from "dubo-design-system/components/ui/button";

/**
 * Dubo Design System — ErrorState
 *
 * O par de `EmptyState`, e deliberadamente diferente dele. `EmptyState` afirma
 * um facto sobre os dados da clínica ("não há produtos"); `ErrorState` admite
 * que não foi possível saber. Partilhavam o mesmo ecrã em `/inventory`,
 * `/patient-groups` e `/inventory/movements`, e o resultado é que uma falha do
 * servidor era lida como "perdi o inventário" ou "este grupo não existe".
 *
 * Por isso não leva ilustração amigável: leva ícone de aviso em tom `danger` e
 * uma ação de repetir. Quem olha tem de perceber, sem ler o texto todo, que o
 * ecrã não está a descrever a clínica.
 *
 * Tokens usados:
 *   --color-danger            ícone
 *   --color-danger-subtle     fundo do círculo do ícone
 *   --color-text-primary      título
 *   --color-text-secondary    descrição
 *   --space-2/3/4             espaçamentos
 *   --icon-size-lg            tamanho do ícone
 *   --size-32                 caixa do ícone (igual à do EmptyState)
 *   --type-body-md-*          título
 *   --type-body-sm-*          descrição
 */

const errorStateVariants = cva("flex flex-col items-center justify-center text-center", {
  variants: {
    size: {
      compact: "gap-[var(--space-3)]",
      default: "gap-[var(--space-4)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

const iconContainerVariants = cva(
  [
    "flex shrink-0 items-center justify-center rounded-full",
    "bg-[var(--color-danger-subtle)] text-[color:var(--color-danger)]",
  ].join(" "),
  {
    variants: {
      size: {
        compact: "h-[var(--size-16)] w-[var(--size-16)]",
        default: "h-[var(--size-16)] w-[var(--size-16)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const contentVariants = cva("flex flex-col items-center", {
  variants: {
    size: {
      compact: "gap-[var(--space-1)]",
      default: "gap-[var(--space-2)]",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type ErrorStateSize = "compact" | "default";

export type ErrorStateProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof errorStateVariants> & {
    /** O que falhou, na linguagem do ecrã. Ex.: "Não foi possível carregar o inventário". */
    title: React.ReactNode;
    /** Detalhe opcional — tipicamente a mensagem devolvida pela API. */
    description?: React.ReactNode;
    /** Texto do botão de repetir. Sem ele, e sem `onRetry`, não há botão. */
    retryLabel?: string;
    onRetry?: () => void;
    /** Ação alternativa, quando repetir não é o que faz sentido. */
    action?: React.ReactNode;
  };

const ErrorState = React.forwardRef<HTMLDivElement, ErrorStateProps>(
  (
    { className, size = "default", title, description, retryLabel, onRetry, action, ...props },
    ref
  ) => {
    const resolvedSize: ErrorStateSize = size ?? "default";
    const retryButton =
      onRetry && retryLabel ? (
        <Button variant="secondary" size="lg" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null;
    const resolvedAction = action ?? retryButton;

    // `role="alert"` fica antes do spread de propósito: quem mostra vários
    // destes no mesmo ecrã pode passar `role={undefined}` e deixar o anúncio a
    // um só sítio.
    return (
      <div
        ref={ref}
        role="alert"
        data-slot="error-state"
        className={cn(errorStateVariants({ size: resolvedSize }), className)}
        {...props}
      >
        <div className={iconContainerVariants({ size: resolvedSize })}>
          <AlertTriangle className="size-[var(--icon-size-lg)]" aria-hidden="true" />
        </div>

        <div className={contentVariants({ size: resolvedSize })}>
          <p className="text-body-lg [font-weight:var(--font-weight-400)] text-[color:var(--color-text-primary)]">
            {title}
          </p>
          {description ? (
            <p className="text-body-md [font-weight:var(--font-weight-400)] text-[color:var(--color-text-secondary)]">
              {description}
            </p>
          ) : null}
        </div>

        {resolvedAction ? (
          <div className="flex items-center justify-center">{resolvedAction}</div>
        ) : null}
      </div>
    );
  }
);

ErrorState.displayName = "ErrorState";

export { ErrorState, errorStateVariants };
