"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { DocsSection } from "@/components/docs/section";
import { componentTokenDocs } from "@/lib/component-token-docs";

/* ── Helpers ── */

function ShowcaseRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-body-md font-medium text-subtext-color">{label}</p>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function ShowcaseCard({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-5">
      {title && <p className="text-body-md font-medium text-default-font">{title}</p>}
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* ── Page ── */

export default function SonnerPage() {
  const [promiseLoading, setPromiseLoading] = useState(false);

  return (
    <div id="content" className="mx-auto flex w-full max-w-[1120px] flex-col gap-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[24px] border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-6 py-8 lg:px-8">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-3">
              <Badge variant="success">Ready</Badge>
              <Badge variant="info1">Component</Badge>
            </div>
            <h1 className="text-hero font-medium tracking-[0em] text-default-font lg:text-hero">
              Sonner
            </h1>
            <p className="mt-4 max-w-2xl text-body-lg text-subtext-color">
              Toast notification system built on the sonner package. 5 semantic variants (default,
              success, info, warning, error), promise support, action buttons, and full design token
              integration.
            </p>
          </div>
        </div>
      </section>

      {/* ── Variants ── */}
      <DocsSection
        id="variants"
        title="Variants"
        description="Each variant uses semantic color tokens to communicate different message types. Click each button to see the toast."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="All variants">
            <Button
              variant="secondary"
              onClick={() =>
                toast("Default notification", {
                  description: "Neutral styling with surface background and border.",
                })
              }
            >
              Default
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.success("Patient saved", {
                  description: "Record updated successfully.",
                })
              }
            >
              Success
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.info("New update available", {
                  description: "Version 2.4 is ready to install.",
                })
              }
            >
              Info
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.warning("Session expiring", {
                  description: "Your session will expire in 5 minutes.",
                })
              }
            >
              Warning
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.error("Upload failed", {
                  description: "The file could not be processed.",
                })
              }
            >
              Error
            </Button>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Actions ── */}
      <DocsSection
        id="actions"
        title="With Actions"
        description="Toasts can include action and cancel buttons for quick user interactions."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Action + Cancel buttons">
            <Button
              variant="secondary"
              onClick={() =>
                toast("File deleted", {
                  description: "The file has been moved to trash.",
                  action: {
                    label: "Undo",
                    onClick: () => toast.success("File restored"),
                  },
                  cancel: {
                    label: "Dismiss",
                    onClick: () => {},
                  },
                })
              }
            >
              With Undo Action
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                toast.error("Failed to save", {
                  description: "Network connection lost.",
                  action: {
                    label: "Retry",
                    onClick: () => toast.success("Saved successfully"),
                  },
                })
              }
            >
              Error with Retry
            </Button>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Promise ── */}
      <DocsSection
        id="promise"
        title="Promise"
        description="Show loading state while an async operation completes, then transition to success or error."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Async operation toasts">
            <Button
              variant="secondary"
              disabled={promiseLoading}
              onClick={() => {
                setPromiseLoading(true);
                toast.promise(
                  new Promise<{ name: string }>((resolve) =>
                    setTimeout(() => {
                      resolve({ name: "Patient record" });
                      setPromiseLoading(false);
                    }, 2000)
                  ),
                  {
                    loading: "Saving patient data...",
                    success: (data) => `${data.name} saved successfully`,
                    error: "Failed to save patient data",
                  }
                );
              }}
            >
              Promise (Success)
            </Button>
            <Button
              variant="secondary"
              onClick={() => {
                toast.promise(
                  new Promise((_resolve, reject) =>
                    setTimeout(() => reject(new Error("timeout")), 2000)
                  ),
                  {
                    loading: "Uploading file...",
                    success: "File uploaded",
                    error: "Upload failed — please try again",
                  }
                );
              }}
            >
              Promise (Error)
            </Button>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Duration ── */}
      <DocsSection
        id="duration"
        title="Custom Duration"
        description="Control how long toasts are visible. Set duration in milliseconds or Infinity for persistent toasts."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="Duration control">
            <Button
              variant="outline"
              onClick={() =>
                toast.info("Extended toast", {
                  description: "This toast stays for 10 seconds.",
                  duration: 10000,
                })
              }
            >
              10s Duration
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                toast.warning("Persistent toast", {
                  description: "This toast stays until manually dismissed.",
                  duration: Infinity,
                })
              }
            >
              Infinite (Dismiss to close)
            </Button>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── Title Only ── */}
      <DocsSection
        id="title-only"
        title="Title Only"
        description="Simple toasts with just a title, for quick feedback."
      >
        <div className="flex flex-col gap-6">
          <ShowcaseCard title="No description">
            <ShowcaseRow label="Title-only toasts">
              <Button variant="ghost" onClick={() => toast("Copied to clipboard")}>
                Default
              </Button>
              <Button variant="ghost" onClick={() => toast.success("Saved")}>
                Success
              </Button>
              <Button variant="ghost" onClick={() => toast.info("Synced")}>
                Info
              </Button>
              <Button variant="ghost" onClick={() => toast.warning("Low storage")}>
                Warning
              </Button>
              <Button variant="ghost" onClick={() => toast.error("Connection lost")}>
                Error
              </Button>
            </ShowcaseRow>
          </ShowcaseCard>
        </div>
      </DocsSection>

      {/* ── API ── */}
      <DocsSection
        id="api"
        title="API Reference"
        description="Functions, options, and CSS custom properties."
      >
        <div className="overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Function</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["toast()", "string | options", "Default neutral toast"],
                ["toast.success()", "string | options", "Green success toast"],
                ["toast.info()", "string | options", "Blue informational toast"],
                ["toast.warning()", "string | options", "Amber warning toast"],
                ["toast.error()", "string | options", "Red error toast"],
                ["toast.promise()", "Promise, { loading, success, error }", "Async loading toast"],
                ["toast.dismiss()", "toastId?", "Dismiss a specific or all toasts"],
              ].map(([fn, type, desc]) => (
                <tr key={fn}>
                  <td className="px-4 py-3 font-mono text-body-sm">{fn}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
                  <td className="px-4 py-3">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Option</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Type</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Default</th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {[
                ["description", "string", "—", "Secondary text below the title"],
                ["duration", "number", "4000", "Time in ms before auto-dismiss"],
                ["action", "{ label, onClick }", "—", "Primary action button"],
                ["cancel", "{ label, onClick }", "—", "Cancel/dismiss button"],
                ["icon", "ReactNode", "—", "Custom icon element"],
                ["closeButton", "boolean", "true", "Show close button"],
                ["id", "string | number", "—", "Unique toast identifier"],
              ].map(([option, type, def, desc]) => (
                <tr key={option}>
                  <td className="px-4 py-3 font-mono text-body-sm">{option}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{type}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{def}</td>
                  <td className="px-4 py-3">{desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 overflow-x-auto rounded-xl border border-neutral-200">
          <table className="w-full text-left text-body-md">
            <thead className="border-b border-neutral-200 bg-neutral-50">
              <tr>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  CSS Variable
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">
                  Light value
                </th>
                <th className="text-body-md font-normal px-4 py-3 text-subtext-color">Usage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {componentTokenDocs["sonner"].tokens.map(({ token, value, usage }) => (
                <tr key={token}>
                  <td className="px-4 py-3 font-mono text-body-sm">{token}</td>
                  <td className="px-4 py-3 font-mono text-body-sm">{value}</td>
                  <td className="px-4 py-3">{usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DocsSection>
    </div>
  );
}
