import React from "react";

interface TokenRow {
  token: string;
  value: string;
  usage: string;
}

interface DesignTokensTableProps {
  tokens: TokenRow[];
  title?: string;
}

/**
 * Reusable table for displaying design tokens in Storybook stories.
 * Add as the last story in each component's stories file.
 */
export function DesignTokensTable({ tokens, title = "Design Tokens" }: DesignTokensTableProps) {
  return (
    <div style={{ fontFamily: "var(--font-poppins), Poppins, sans-serif" }}>
      <h3
        style={{
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "12px",
          color: "var(--color-text-primary)",
        }}
      >
        {title}
      </h3>
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "13px",
          fontFamily: "var(--font-poppins), Poppins, sans-serif",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
            <th
              style={{
                textAlign: "left",
                padding: "8px 12px",
                fontWeight: 600,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
              }}
              className="text-body-md font-normal"
            >
              CSS Variable
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px 12px",
                fontWeight: 600,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
              }}
              className="text-body-md font-normal"
            >
              Value
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "8px 12px",
                fontWeight: 600,
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--color-text-muted)",
              }}
              className="text-body-md font-normal"
            >
              Usage
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((row, index) => (
            <tr
              key={`${row.token}-${index}`}
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <td
                style={{
                  padding: "8px 12px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "var(--color-text-primary)",
                }}
              >
                {row.token}
              </td>
              <td
                style={{
                  padding: "8px 12px",
                  fontFamily: "monospace",
                  fontSize: "12px",
                  color: "var(--color-text-secondary)",
                }}
              >
                {row.value}
              </td>
              <td style={{ padding: "8px 12px", color: "var(--color-text-secondary)" }}>
                {row.usage}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
