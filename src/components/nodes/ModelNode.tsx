import { Handle, Position } from "reactflow";

export default function ModelNode({ data }: { data: any }) {
  function formatType(field: any) {
    let type = field.type;

    if (field.isList) type = type += "[]";
    if (!field.isRequired) type = type += "?";

    return type;
  }

  function formatAttributes(field: any) {
    const attr = [];
    if (field.isId) attr.push("@id");
    if (field.isUnique) attr.push("@unique");
    if (field.isUpdatedAt) attr.push("@updatedAt");
    if (field.isGenerated) attr.push("@default(auto())");
    if (field.hasDefaultValue) {
      if (typeof field.default === "object") {
        attr.push(`${field.default.name}()`);
      } else {
        attr.push(`@default(${field.default})`);
      }
    }
    if (field.relationName)
      attr.push(`@relation(name: "${field.relationName}")`);

    return attr.join(" ");
  }
  console.log("model data", data);
  return (
    <div className="rounded-md shadow border bg-background/45 border-zinc-600 text-sm min-w-96 overflow-hidden">
      <div className="font-bold text-center py-1 border-b-[0.5px] border-zinc-600 bg-background/60">
        {data.name}
      </div>

      <div className="p-1 divide-y divide-zinc-600 text-xs">
        {data.fields.map((field: any, index: number) => {
          return (
            <div
              className="grid grid-cols-[0.5fr_0.5fr_0.5fr] px-2 py-1"
              key={index}
            >
              {(field.relationName || field.kind === "enum") && (
                <Handle
                  type="source"
                  position={Position.Left}
                  id={`field-${field.name}`}
                  style={{
                    top: "50%",
                    left: 0,
                    transform: "translate(-50%)",
                  }}
                />
              )}
              <div className="font-medium">{field.name}</div>
              <div className="">{formatType(field)}</div>
              <div className="text-right">{formatAttributes(field)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
