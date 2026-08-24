import type { ReactNode } from "react";

interface Column<Row extends object> {
  key: keyof Row;
  label: string;
  render?: (row: Row) => ReactNode;
}

interface TokenTableProps<Row extends object> {
  rows: Row[];
  columns: Array<Column<Row>>;
}

export function TokenTable<Row extends object>({ rows, columns }: TokenTableProps<Row>) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-[var(--color-border)] bg-[var(--color-bg-surface)]">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[var(--color-border)]">
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="text-body-md font-normal px-4 py-3 text-left text-subtext-color"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index === 0 ? "" : "border-t border-[var(--color-border)]"}>
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-3 align-top">
                  {column.render ? (
                    column.render(row)
                  ) : (
                    <span className="text-body-md text-default-font">
                      {String((row as Record<string, unknown>)[String(column.key)] ?? "")}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
