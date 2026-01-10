export const runtime = "nodejs";

import { parsePrismaError } from "@/lib/prismalang";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { schema } = await req.json();

  try {
    // Lazy import so Prisma internals doesn’t get bundled
    const { getDMMF } = await import("@prisma/internals");

    const dmmf = await getDMMF({ datamodel: schema });

    const nodes = dmmf.datamodel.models.map((model: any, i: number) => ({
      id: model.name,
      type: "modelNode",
      position: { x: i * 300, y: 50 },
      data: {
        name: model.name,
        fields: model.fields,
      },
    }));

    const enumNodes = dmmf.datamodel.enums.map((enm: any, i: number) => ({
      id: enm.name,
      type: "enumNode",
      position: { x: i * 300, y: 400 },
      data: enm,
    }));

    const edges: any = [];
    for (const model of dmmf.datamodel.models) {
      for (const field of model.fields) {
        if (field.kind === "enum") {
          edges.push({
            id: `${model.name}-${field.name}-enum`,
            source: model.name,
            sourceHandle: `field-${field.name}`,
            target: field.type,
            targetHandle: "enum-bottom",
            type: "smoothstep",
          });
        }

        if (field.relationName) {
          edges.push({
            id: `${model.name}-${field.name}-rel`,
            source: model.name,
            sourceHandle: `field-${field.name}`,
            target: field.type,
            type: "smoothstep",
          });
        }
      }
    }

    return NextResponse.json({ nodes: [...nodes, ...enumNodes], edges });
  } catch (e: any) {
    const diagnose = parsePrismaError(e.message);
    return NextResponse.json({ error: diagnose }, { status: 500 });
  }
}
