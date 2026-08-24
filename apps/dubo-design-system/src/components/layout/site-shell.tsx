import type { ReactNode } from "react";
import { DocsSidebar } from "@/components/layout/docs-sidebar";

interface SiteShellProps {
  children: ReactNode;
}

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="min-h-screen bg-page-bg text-default-font">
      <div className="flex min-h-screen w-full">
        <DocsSidebar />
        <main className="min-w-0 flex-1 px-4 pb-20 pt-18 lg:px-8 lg:pt-8 xl:px-10">{children}</main>
      </div>
    </div>
  );
}
