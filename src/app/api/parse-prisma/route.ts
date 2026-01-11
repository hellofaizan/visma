export const runtime = "nodejs";

import { parsePrismaError } from "@/lib/prismalang";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { schema } = await req.json();

  try {
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

    type RelationSide = {
      model: string;
      field: string;
      isList: boolean;
      isRequired: boolean;
      relationFromFields: readonly string[] | undefined;
    };

    const relationMap = new Map<string, RelationSide[]>();

    for (const model of dmmf.datamodel.models) {
      for (const field of model.fields) {
        if (field.relationName) {
          if (!relationMap.has(field.relationName)) {
            relationMap.set(field.relationName, []);
          }

          relationMap.get(field.relationName)!.push({
            model: model.name,
            field: field.name,
            isList: field.isList,
            isRequired: field.isRequired,
            relationFromFields: field.relationFromFields,
          });
        }
      }
    }

    const relationEdges = [];
    for (const [relationName, sides] of relationMap.entries()) {
      if (sides.length !== 2) continue;

      const owning = sides.find(
        (s) => s.relationFromFields && s.relationFromFields.length > 0
      );

      const inverse = sides.find(
        (s) => !s.relationFromFields || s.relationFromFields.length === 0
      );

      if (!owning || !inverse) continue;

      relationEdges.push({
        id: `rel-${relationName}`,
        source: owning.model,
        sourceHandle: `field-${owning.field}`,
        target: inverse.model,
        type: "smoothstep",
        label: formatCardinality(owning, inverse),
      });
    }

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

    return NextResponse.json({
      nodes: [...nodes, ...enumNodes],
      edges: [...relationEdges, ...edges],
    });
  } catch (e: any) {
    const diagnose = parsePrismaError(e.message);
    return NextResponse.json({ error: diagnose }, { status: 500 });
  }
}

function formatCardinality(a: any, b: any) {
  const left = a.isList ? "N" : a.isRequired ? "1" : "0..1";
  const right = b.isList ? "N" : b.isRequired ? "1" : "0..1";
  return `${left} ↔ ${right}`;
}