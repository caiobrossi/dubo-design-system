import {
  bluePalette,
  cyanPalette,
  indigoPalette,
  limePalette,
  orangePalette,
  peachPalette,
  pinkPalette,
  skyPalette,
  slatePalette,
  tealPalette,
  tomatoPalette,
  yellowPalette,
} from "@dubo/design-system/foundations";

const legacyCool = {
  bgPage: "oklch(0.976 0.006 264.5)",
  bgSurface: "oklch(1 0 0)",
  bgInput: "oklch(0.954 0.009 258.3)",
  border: "oklch(0.912 0.015 264.5)",
  borderStrong: "oklch(0.856 0.023 263.2)",
  textPrimary: "oklch(0.208 0.031 259.0)",
  textSecondary: "oklch(0.447 0.034 261.3)",
  textMuted: "oklch(0.719 0.03 261.4)",
};

const currentSlate = {
  bgPage: "var(--p-slate-25)",
  bgSurface: "var(--p-slate-0)",
  bgInput: "var(--p-slate-100)",
  border: "var(--p-slate-300)",
  borderStrong: "var(--p-slate-400)",
  textPrimary: "var(--p-slate-900)",
  textSecondary: "var(--p-slate-700)",
  textMuted: "var(--p-slate-600)",
};

function PreviewSurface({
  title,
  subtitle,
  palette,
}: {
  title: string;
  subtitle: string;
  palette: typeof legacyCool;
}) {
  return (
    <div
      className="flex flex-col gap-4 rounded-[var(--radius-scale-2xl)] border p-5"
      style={{
        backgroundColor: palette.bgPage,
        borderColor: palette.border,
      }}
    >
      <div
        className="rounded-[var(--radius-scale-xl)] border p-4"
        style={{
          backgroundColor: palette.bgSurface,
          borderColor: palette.border,
          boxShadow: "var(--shadow-xs)",
        }}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <p
              className="text-heading-4"
              style={{ color: palette.textPrimary, fontWeight: "var(--font-weight-400)" }}
            >
              {title}
            </p>
            <p className="text-body-md" style={{ color: palette.textSecondary }}>
              {subtitle}
            </p>
          </div>
          <div
            className="rounded-full px-3 py-1 text-body-sm"
            style={{ backgroundColor: "var(--p-blue-50)", color: "var(--p-blue-700)" }}
          >
            CTA context
          </div>
        </div>

        <div
          className="mt-4 rounded-[var(--radius-control-input)] border px-3 py-2"
          style={{
            backgroundColor: palette.bgInput,
            borderColor: palette.border,
            color: palette.textSecondary,
          }}
        >
          Search patient&hellip;
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            className="rounded-full px-4 py-2 text-body-md"
            style={{
              backgroundColor: "var(--p-blue-500)",
              color: "white",
            }}
          >
            Primary Action
          </button>
          <button
            className="rounded-full border px-4 py-2 text-body-md"
            style={{
              borderColor: palette.borderStrong,
              color: palette.textPrimary,
            }}
          >
            Secondary
          </button>
        </div>
      </div>
    </div>
  );
}

function PaletteRail({
  title,
  swatches,
}: {
  title: string;
  swatches: { scale: string; value: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-md font-semibold text-default-font">{title}</p>
      <div className="grid grid-cols-4 gap-3 md:grid-cols-6 xl:grid-cols-12">
        {swatches.map((swatch) => (
          <div key={`${title}-${swatch.scale}`} className="flex flex-col gap-2">
            <div
              className="h-14 rounded-[var(--radius-scale-lg)] border border-black/5"
              style={{ backgroundColor: swatch.value }}
            />
            <div className="text-center text-body-sm font-medium text-subtext-color">
              {swatch.scale}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ColorSystemPreview() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <p className="text-body-md font-semibold text-default-font">Legacy Cool</p>
          <PreviewSurface
            title="Patients"
            subtitle="Original neutral family before the Slate migration."
            palette={legacyCool}
          />
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-body-md font-semibold text-default-font">New Slate</p>
          <PreviewSurface
            title="Patients"
            subtitle="Official neutral family now used by semantic tokens."
            palette={currentSlate}
          />
        </div>
      </div>

      <div className="rounded-[var(--radius-scale-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6">
        <div className="flex flex-col gap-2">
          <p className="text-body-md font-semibold text-default-font">Brand Blue</p>
          <p className="text-body-md text-subtext-color">
            The new blue family is anchored on the current CTA blue at step <code>500</code>.
          </p>
        </div>
        <div className="mt-5">
          <PaletteRail title="Brand Blue" swatches={bluePalette} />
        </div>
      </div>

      <div className="rounded-[var(--radius-scale-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-6">
        <div className="flex flex-col gap-2">
          <p className="text-body-md font-semibold text-default-font">Chromatic Palette Preview</p>
          <p className="text-body-md text-subtext-color">
            These families are now available for illustration systems, data visualization, and
            future semantic extensions.
          </p>
        </div>
        <div className="mt-5 flex flex-col gap-6">
          <PaletteRail title="Indigo" swatches={indigoPalette} />
          <PaletteRail title="Cyan" swatches={cyanPalette} />
          <PaletteRail title="Peach" swatches={peachPalette} />
          <PaletteRail title="Sky" swatches={skyPalette} />
          <PaletteRail title="Teal" swatches={tealPalette} />
          <PaletteRail title="Lime" swatches={limePalette} />
          <PaletteRail title="Yellow" swatches={yellowPalette} />
          <PaletteRail title="Orange" swatches={orangePalette} />
          <PaletteRail title="Tomato" swatches={tomatoPalette} />
          <PaletteRail title="Pink" swatches={pinkPalette} />
          <PaletteRail title="Slate" swatches={slatePalette} />
        </div>
      </div>

      <div className="rounded-[var(--radius-scale-2xl)] border border-[var(--surface-gradient-product-border)] bg-[var(--color-bg-surface)] p-6">
        <div className="flex flex-col gap-2">
          <p className="text-body-md font-semibold text-default-font">
            Expressive Product Gradient
          </p>
          <p className="text-body-md text-subtext-color">
            Canonical soft Dubo gradient built from the new Peach and Sky families. Use it for
            richer branded surfaces, previews, and editorial moments.
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div
            className="rounded-[var(--radius-scale-2xl)] border p-6"
            style={{
              background: "var(--surface-gradient-product-bg)",
              borderColor: "var(--surface-gradient-product-border)",
              color: "var(--surface-gradient-product-text)",
            }}
          >
            <div className="flex flex-col gap-2">
              <p className="text-body-md font-semibold">Product Gradient Surface</p>
              <p className="text-body-md text-subtext-color">
                Warm on one side, airy on the other, without reading as alert UI.
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-[var(--radius-scale-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">
            <div className="rounded-[var(--radius-scale-xl)] border border-[var(--color-peach-border)] bg-[var(--color-peach-subtle)] px-4 py-3">
              <p className="text-body-md font-semibold text-default-font">
                Peach secondary surface
              </p>
            </div>
            <div className="rounded-[var(--radius-scale-xl)] border border-[var(--color-sky-border)] bg-[var(--color-sky-subtle)] px-4 py-3">
              <p className="text-body-md font-semibold text-default-font">Sky secondary surface</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[var(--radius-scale-2xl)] border border-[var(--surface-gradient-sunrise-border)] bg-[var(--color-bg-surface)] p-6">
        <div className="flex flex-col gap-2">
          <p className="text-body-md font-semibold text-default-font">Sunrise Gradient</p>
          <p className="text-body-md text-subtext-color">
            The classic Dubo welcoming gradient used in explanatory modals, onboarding, and
            anamnese/public entry moments.
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div
            className="rounded-[var(--radius-scale-2xl)] border p-6"
            style={{
              background: "var(--surface-gradient-sunrise-bg)",
              borderColor: "var(--surface-gradient-sunrise-border)",
              color: "var(--surface-gradient-sunrise-text)",
            }}
          >
            <div className="flex flex-col gap-2">
              <p className="text-body-md font-semibold">Sunrise Gradient Surface</p>
              <p className="text-body-md text-subtext-color">
                Slightly brighter and more welcoming than the product gradient, with the classic
                Dubo feel.
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-[var(--radius-scale-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">
            <div className="rounded-[var(--radius-scale-xl)] border border-[var(--surface-gradient-sunrise-border)] px-4 py-3 [background:var(--surface-gradient-sunrise-bg)]">
              <p className="text-body-md font-semibold text-default-font">Sunrise hero surface</p>
            </div>
            <div className="rounded-[var(--radius-scale-xl)] border border-[var(--color-peach-border)] bg-[var(--color-peach-subtle)] px-4 py-3">
              <p className="text-body-md font-semibold text-default-font">Pairs well with Peach</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[var(--radius-scale-2xl)] border border-[var(--surface-gradient-warm-tint-border)] bg-[var(--color-bg-surface)] p-6">
        <div className="flex flex-col gap-2">
          <p className="text-body-md font-semibold text-default-font">Warm Tint Gradient</p>
          <p className="text-body-md text-subtext-color">
            The classic soft warm tint used in patient-group and template hovers, now saved as a
            reusable expressive recipe.
          </p>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <div
            className="rounded-[var(--radius-scale-2xl)] border p-6"
            style={{
              background: "var(--surface-gradient-warm-tint-bg)",
              borderColor: "var(--surface-gradient-warm-tint-border)",
              color: "var(--surface-gradient-warm-tint-text)",
            }}
          >
            <div className="flex flex-col gap-2">
              <p className="text-body-md font-semibold">Warm Tint Surface</p>
              <p className="text-body-md text-subtext-color">
                Gentle, editorial, and familiar. Good for hover overlays that should feel supportive
                rather than flashy.
              </p>
            </div>
          </div>

          <div className="grid gap-3 rounded-[var(--radius-scale-2xl)] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-4">
            <div className="rounded-[var(--radius-scale-xl)] border border-[var(--surface-gradient-warm-tint-border)] px-4 py-3 [background:var(--surface-gradient-warm-tint-bg)]">
              <p className="text-body-md font-semibold text-default-font">
                Patient-group hover surface
              </p>
            </div>
            <div className="rounded-[var(--radius-scale-xl)] border border-[var(--color-peach-border)] bg-[var(--color-peach-subtle)] px-4 py-3">
              <p className="text-body-md font-semibold text-default-font">Pairs well with Peach</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
