import { getDMMF } from "@prisma/internals"

export async function parsePrisma(schema: string) {
  const dmmf = await getDMMF({ datamodel: schema })

  const nodes = dmmf.datamodel.models.map((model, i) => ({
    id: model.name,
    type: "modelNode",
    position: { x: i * 250, y: 100 },
    data: model,
  }))

  const edges = []

  for (const model of dmmf.datamodel.models) {
    for (const field of model.fields) {
      if (field.relationName && field.type !== model.name) {
        edges.push({
          id: `${model.name}-${field.type}`,
          source: model.name,
          target: field.type,
        })
      }
    }
  }

  return { nodes, edges }
}
