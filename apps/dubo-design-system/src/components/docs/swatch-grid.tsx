import type { ColorSwatch } from "@dubo/design-system/foundations";

interface SwatchGridProps {
  title: string;
  swatches: ColorSwatch[];
}

export function SwatchGrid({ title, swatches }: SwatchGridProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-body-md font-medium text-default-font">{title}</h3>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">
        {swatches.map((swatch) => (
          <div
            key={swatch.scale}
            className="rounded-[18px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-3"
          >
            <div
              className="h-20 rounded-[14px] border border-black/5"
              style={{ backgroundColor: swatch.value }}
            />
            <div className="mt-3 flex flex-col gap-1">
              <p className="text-body-sm text-default-font">{swatch.scale}</p>
              <p className="text-body-sm font-mono text-subtext-color">{swatch.value}</p>
              {swatch.note ? (
                <p className="text-body-sm text-subtext-color">{swatch.note}</p>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
