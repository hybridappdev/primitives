import { type ReactElement, useState } from "react";
import { Button } from "../components/button";
import { ChartFrame } from "../components/chart-frame";
import { DataTable, type DataTableColumn } from "../components/data-table";
import { EmptyState } from "../components/empty-state";
import { Filter } from "../components/filter";
import { StreamRow } from "../components/stream-row";
import type {
  ChartNode,
  FilterNode,
  LayoutNode,
  StackNode,
  TableNode,
} from "./schema";

const numericValue = /^[+-−]?(?:\d+\.?\d*|\.\d+)$/;

export function renderLayout(node: LayoutNode): ReactElement {
  return <LayoutNodeView node={node} />;
}

function LayoutNodeView({ node }: { node: LayoutNode }) {
  switch (node.type) {
    case "stack":
      return <StackView node={node} />;
    case "button":
      return <Button variant={node.variant} size="md" label={node.label} />;
    case "filter":
      return <FilterView node={node} />;
    case "chart":
      return <ChartView node={node} />;
    case "table":
      return <TableView node={node} />;
    case "stream":
      return <StreamRow source={node.source} state={node.state} text={node.text} />;
    case "empty":
      return <EmptyState title={node.title} reason={node.reason} />;
    default: {
      const unreachable: never = node;
      return unreachable;
    }
  }
}

function StackView({ node }: { node: StackNode }) {
  return (
    <div className="pr-stack" data-gap={node.gap}>
      {node.children.map((child, index) => (
        <LayoutNodeView key={nodeKey(child, index)} node={child} />
      ))}
    </div>
  );
}

function FilterView({ node }: { node: FilterNode }) {
  const [value, setValue] = useState(node.value);
  return (
    <Filter
      id={node.id}
      label={node.label}
      value={value}
      options={node.options.map((option) => ({ value: option, label: option }))}
      onChange={setValue}
    />
  );
}

function ChartView({ node }: { node: ChartNode }) {
  return <ChartFrame title={node.title} tone={node.tone} points={node.points} />;
}

function TableView({ node }: { node: TableNode }) {
  const columns: DataTableColumn[] = node.columns.map((header, index) => {
    const values = node.rows.map((row) => row[index] ?? "");
    const numeric = values.length > 0 && values.every((value) => numericValue.test(value));
    return {
      key: header,
      header,
      align: numeric ? "end" : "start",
      tone: numeric ? "positive" : "neutral",
    };
  });

  const rows = node.rows.map((row) => {
    const record: Record<string, string> = {};
    node.columns.forEach((header, index) => {
      record[header] = row[index] ?? "";
    });
    return record;
  });

  return <DataTable columns={columns} rows={rows} density="regular" />;
}

function nodeKey(node: LayoutNode, index: number): string {
  if ("id" in node) return node.id;
  return `${node.type}-${index}`;
}
