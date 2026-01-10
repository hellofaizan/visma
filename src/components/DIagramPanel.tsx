"use client";

import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";

import { useEffect, useState } from "react";
import { useSchemaStore } from "@/store/schema";
import ModelNode from "./nodes/ModelNode";
import EnumNode from "./nodes/EnumNode";

const nodeTypes = { modelNode: ModelNode, enumNode: EnumNode };

export default function DiagramPanel() {
  const { schema } = useSchemaStore();
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    const parse = async () => {
      const res = await fetch("/api/parse-prisma", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ schema }),
      });

      const data = await res.json();

      if (!data.error) {
        setNodes(data.nodes);
        setEdges(data.edges);
      }
    };
    parse();
  }, [schema]);

  return (
    <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
      <Background />
      <Controls />
    </ReactFlow>
  );
}
