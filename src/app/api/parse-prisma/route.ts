export const runtime = "nodejs"

import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { schema } = await req.json()

  try {
    // Lazy import so Prisma internals doesn’t get bundled
    const { getDMMF } = await import("@prisma/internals")

    const dmmf = await getDMMF({ datamodel: schema })

    const nodes = dmmf.datamodel.models.map((model: any, i: number) => ({
      id: model.name,
      type: "modelNode",
      position: { x: i * 300, y: 100 },
      data: {
        name: model.name,
        fields: model.fields,
      },
    }))

    const edges: any = []
    dmmf.datamodel.models.forEach((model: any) => {
      model.fields.forEach((f: any) => {
        if (f.relationName) {
          edges.push({
            id: `${model.name}-${f.name}`,
            source: model.name,
            target: f.type,
            animated: true,
          })
        }
      })
    })

    return NextResponse.json({ nodes, edges })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
