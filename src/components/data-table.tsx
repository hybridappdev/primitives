import type { ColumnTone } from "../tokens/tokens";

export type TableAlignment = "start" | "end";

export const tableAlignments = ["start", "end"] as const satisfies readonly TableAlignment[];

export type TableDensity = "compact" | "regular";

export const tableDensities = ["compact", "regular"] as const satisfies readonly TableDensity[];

export type DataTableColumn = {
  key: string;
  header: string;
  align: TableAlignment;
  tone?: ColumnTone;
};

export type DataTableProps = {
  columns: DataTableColumn[];
  rows: Record<string, string>[];
  density: TableDensity;
};

export function DataTable({ columns, rows, density }: DataTableProps) {
  return (
    <div className="pr-table-wrap">
      <table className="pr-table" data-density={density}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" data-align={column.align}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => {
                const value = row[column.key] ?? "";
                return (
                  <td
                    key={column.key}
                    data-align={column.align}
                    data-tone={presentedTone(value, column.tone)}
                  >
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function presentedTone(value: string, tone: ColumnTone | undefined): ColumnTone {
  if (tone === undefined || tone === "neutral") return "neutral";
  if (isNegative(value)) return "negative";
  if (tone === "negative") return "negative";
  return "positive";
}

function isNegative(value: string): boolean {
  return value.startsWith("-") || value.startsWith("−");
}
