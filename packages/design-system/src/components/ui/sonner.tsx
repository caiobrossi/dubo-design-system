"use client";

/**
 * Dubo Design System — Sonner (Toast notifications)
 *
 * Uses the `sonner` package directly. The Toaster component is configured
 * with Dubo design tokens via CSS variables. No wrapper — just configuration.
 *
 * Place `<Toaster />` once in the root layout.
 * Use `toast()`, `toast.success()`, `toast.error()`, etc. to trigger.
 *
 * All colors, surfaces, and typography reference shared semantic tokens.
 */

import { useTheme } from "next-themes";
import { Toaster as SonnerToaster, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;
type SonnerStyleProps = React.CSSProperties & Record<string, string>;

function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-right"
      style={
        {
          "--normal-bg": "var(--color-bg-surface)",
          "--normal-border": "var(--color-border)",
          "--normal-text": "var(--color-text-primary)",
          "--success-bg": "var(--badge-success-soft-bg)",
          "--success-border": "var(--badge-success-soft-border)",
          "--success-text": "var(--badge-success-soft-text)",
          "--info-bg": "var(--badge-info1-soft-bg)",
          "--info-border": "var(--badge-info1-soft-border)",
          "--info-text": "var(--badge-info1-soft-text)",
          "--warning-bg": "var(--badge-warning-soft-bg)",
          "--warning-border": "var(--badge-warning-soft-border)",
          "--warning-text": "var(--badge-warning-soft-text)",
          "--error-bg": "var(--badge-danger-soft-bg)",
          "--error-border": "var(--badge-danger-soft-border)",
          "--error-text": "var(--badge-danger-soft-text)",
          "--border-radius": "var(--radius-control-soft)",
          fontFamily: "var(--font-poppins), Poppins, sans-serif",
        } as SonnerStyleProps
      }
      toastOptions={{
        style: {
          borderRadius: "var(--radius-control-soft)",
          borderWidth: "0.5px",
          fontFamily: "var(--font-poppins), Poppins, sans-serif",
          boxShadow:
            "0px 1px 2px 0px rgb(0 0 0 / 0.05), inset 0px 0px 0px 0.5px var(--normal-border)",
        },
        classNames: {
          toast:
            "border border-transparent bg-[var(--normal-bg)] text-[color:var(--normal-text)] shadow-none",
          title: "text-body-md [font-weight:var(--font-weight-600)]",
          description: "text-body-md [font-weight:var(--font-weight-400)] text-current/80",
          actionButton:
            "bg-white! text-[color:var(--color-text-primary)]! border border-[var(--color-border)]!",
          cancelButton:
            "bg-white! text-[color:var(--color-text-primary)]! border border-[var(--color-border)]!",
          success:
            "bg-[var(--success-bg)]! text-[color:var(--success-text)]! border-[var(--success-border)]! [box-shadow:0px_1px_2px_0px_rgb(0_0_0_/_0.05),inset_0px_0px_0px_0.5px_var(--success-border)]!",
          info: "bg-[var(--info-bg)]! text-[color:var(--info-text)]! border-[var(--info-border)]! [box-shadow:0px_1px_2px_0px_rgb(0_0_0_/_0.05),inset_0px_0px_0px_0.5px_var(--info-border)]!",
          warning:
            "bg-[var(--warning-bg)]! text-[color:var(--warning-text)]! border-[var(--warning-border)]! [box-shadow:0px_1px_2px_0px_rgb(0_0_0_/_0.05),inset_0px_0px_0px_0.5px_var(--warning-border)]!",
          error:
            "bg-[var(--error-bg)]! text-[color:var(--error-text)]! border-[var(--error-border)]! [box-shadow:0px_1px_2px_0px_rgb(0_0_0_/_0.05),inset_0px_0px_0px_0.5px_var(--error-border)]!",
          closeButton:
            "bg-white! text-[color:var(--color-text-secondary)]! border border-[var(--color-border)]! hover:bg-[var(--color-bg-subtle)]!",
        },
      }}
      richColors
      closeButton
      {...props}
    />
  );
}

export { Toaster, toast };
