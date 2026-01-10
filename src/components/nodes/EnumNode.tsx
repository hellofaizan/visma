import React from "react";
import { Position, Handle } from "reactflow";

export default function EnumNode({ data }: { data: any }) {
  return (
    <div className="overflow-hidden rounded-md border border-zinc-600 text-sm min-w-36">
      <div className="bg-green-400 font-bold text-center py-1">{data.name}</div>

      <div className="divide-y divide-zinc-600 bg-background/45">
        {data.values.map(
          (v: any, index: number) => (
            console.log("enum value", v),
            (
              <div key={index} className="px-3 py-2">
                {v.name}
              </div>
            )
          )
        )}
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
