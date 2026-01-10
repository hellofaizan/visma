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
    dmmf.datamodel.models.forEach((model: any) => {
      model.fields.forEach((f: any) => {
        if (f.relationName) {
          edges.push({
            id: `${model.name}-${f.name}`,
            source: model.name,
            target: f.type,
            animated: true,
          });
        }
      });
    });

    return NextResponse.json({ nodes: [...nodes, ...enumNodes], edges });
  } catch (e: any) {
    const diagnose = parsePrismaError(e.message);
    return NextResponse.json({ error: diagnose }, { status: 500 });
  }
}
