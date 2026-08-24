import { z } from "zod";

export const docKindSchema = z.enum([
  "foundation",
  "token",
  "component",
  "product-component",
]);

export const docStatusSchema = z.enum(["draft", "ready", "internal"]);

export const docEntrySchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  category: z.string().min(1),
  kind: docKindSchema,
  status: docStatusSchema,
  description: z.string().min(1),
  storybookUrl: z.string().url().optional(),
  order: z.number().int().nonnegative(),
});

export const navItemSchema: z.ZodType<{
  label: string;
  href: string;
  visible: boolean;
  children?: Array<{
    label: string;
    href: string;
    visible: boolean;
    children?: unknown[];
  }>;
}> = z.lazy(() =>
  z.object({
    label: z.string().min(1),
    href: z.string().min(1),
    visible: z.boolean().default(true),
    children: z.array(navItemSchema).optional(),
  })
);

export type DocEntry = z.infer<typeof docEntrySchema>;
export type DocKind = z.infer<typeof docKindSchema>;
export type DocStatus = z.infer<typeof docStatusSchema>;
export type NavItem = z.infer<typeof navItemSchema>;
