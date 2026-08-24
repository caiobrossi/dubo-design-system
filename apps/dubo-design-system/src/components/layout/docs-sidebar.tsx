"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "@/lib/icons";
import { siteNavigation } from "@/lib/content-registry";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

function SidebarContent() {
  const pathname = usePathname();
  const initialOpenSections = useMemo(
    () =>
      Object.fromEntries(
        siteNavigation.map((item) => [
          item.href,
          pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href)),
        ])
      ),
    [pathname]
  );
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(initialOpenSections);

  useEffect(() => {
    setOpenSections((current) => {
      const next = { ...current };

      for (const item of siteNavigation) {
        const isActive =
          pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));

        if (isActive) {
          next[item.href] = true;
        } else if (!(item.href in next)) {
          next[item.href] = false;
        }
      }

      return next;
    });
  }, [pathname]);

  return (
    <div className="flex h-full flex-col">
      <Link href="/" className="border-b border-[var(--color-border)] p-5">
        <div className="flex flex-col gap-3">
          <img src="/dubo-full.svg" alt="Dubo" className="h-7 w-auto" />
          <p className="text-body-md font-medium text-default-font">Design System</p>
        </div>
      </Link>

      <nav className="flex-1 overflow-y-auto px-4 py-5" aria-label="Documentation navigation">
        <div className="flex flex-col gap-4">
          {siteNavigation.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            const isOpen = openSections[item.href] ?? false;

            return (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center gap-2">
                  <Link
                    href={item.href}
                    className={cn(
                      "min-w-0 flex-1 text-body-md font-medium transition-colors",
                      isActive ? "text-default-font" : "text-subtext-color hover:text-default-font"
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.children?.length ? (
                    <button
                      type="button"
                      aria-label={isOpen ? `Collapse ${item.label}` : `Expand ${item.label}`}
                      aria-expanded={isOpen}
                      onClick={() =>
                        setOpenSections((current) => ({
                          ...current,
                          [item.href]: !isOpen,
                        }))
                      }
                      className="inline-flex size-6 items-center justify-center rounded-md text-subtext-color transition-colors hover:bg-[var(--color-hover)] hover:text-default-font"
                    >
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform duration-[var(--transition-fast)]",
                          isOpen ? "rotate-0" : "-rotate-90"
                        )}
                      />
                    </button>
                  ) : null}
                </div>
                {item.children?.length ? (
                  <div
                    className={cn(
                      "overflow-hidden transition-[max-height,opacity] duration-[var(--transition-fast)] ease-out",
                      isOpen ? "max-h-[1200px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="mt-1 flex flex-col gap-1 border-l border-[var(--color-border)] pl-3">
                      {item.children.map((child) => {
                        const childActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "rounded-md px-2 py-1.5 text-body-md transition-colors",
                              childActive
                                ? "bg-[var(--color-hover)] text-default-font"
                                : "text-subtext-color hover:bg-[var(--color-hover)] hover:text-default-font"
                            )}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-[var(--color-border)] px-5 py-4">
        <ThemeToggle />
      </div>
    </div>
  );
}

export function DocsSidebar() {
  return (
    <>
      <aside className="sticky top-0 hidden h-screen w-[280px] shrink-0 self-start border-r border-[var(--color-border)] bg-[var(--color-bg-surface)] lg:block">
        <SidebarContent />
      </aside>
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" aria-label="Open navigation">
              <Menu className="size-4" />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
