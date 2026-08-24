import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";
import { typographyRoleNames } from "../typography-roles";

const mergeDuboClasses = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: typographyRoleNames }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return mergeDuboClasses(clsx(inputs));
}

export function humanizeSlug(slug: string) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
