export type StreamSource = "model" | "person" | "system";

export const streamSources = ["model", "person", "system"] as const satisfies readonly StreamSource[];

export type StreamState = "streaming" | "settled";

export const streamStates = ["streaming", "settled"] as const satisfies readonly StreamState[];

export type StreamRowProps = {
  source: StreamSource;
  state: StreamState;
  text: string;
};

const sourceLabel: Record<StreamSource, string> = {
  model: "Model",
  person: "Person",
  system: "System",
};

export function StreamRow({ source, state, text }: StreamRowProps) {
  return (
    <article className="pr-stream" data-source={source} data-state={state}>
      <p className="pr-stream-meta">
        <span>{sourceLabel[source]}</span>
        <span>{state === "streaming" ? "Streaming" : "Settled"}</span>
      </p>
      <p className="pr-stream-text">
        {text}
        {state === "streaming" ? <span className="pr-caret" aria-hidden="true" /> : null}
      </p>
    </article>
  );
}
