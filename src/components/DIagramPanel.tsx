"use client";

import ReactFlow, {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  EdgeChange,
  NodeChange,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";

import { useEffect, useMemo, useRef, useState } from "react";
import { Node } from "reactflow";
import { useSchemaStore } from "@/store/schema";
import ModelNode from "./nodes/ModelNode";
import EnumNode from "./nodes/EnumNode";
import { applyDagreLayout } from "./layout/dagreLayout";

const nodeTypes = { modelNode: ModelNode, enumNode: EnumNode };

export default function DiagramPanel() {
  const { schema } = useSchemaStore();
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const layoutDone = useRef(false);

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

      let newNodes = data.nodes;
      const newEdges = data.edges;

      if (!layoutDone.current) {
        newNodes = applyDagreLayout(newNodes, newEdges, "LR");
        layoutDone.current = true;
      } else {
        newNodes = newNodes.map((n: any) => {
          const existing = nodes.find((e: any) => e.id === n.id);
          return existing ? { ...n, position: (existing as any).position } : n;
        });
      }

      setNodes(newNodes);
      setEdges(newEdges);
    };
    parse();
  }, [schema]);

  const onNodeChange = (changes: NodeChange[]) => {
    setNodes((mds) => applyNodeChanges(changes, mds));
  };

  const onEdgeChanges = (changes: EdgeChange[]) => {
    setEdges((eds) => applyEdgeChanges(changes, eds));
  };

  const styledEdges = useMemo(() => {
    return edges.map((edge: any) => {
      const isActive =
        edge.source === hoveredNode || edge.target === hoveredNode;

      return {
        ...edge,
        type: "smoothstep",
        style: {
          stroke: isActive ? "#2563eb" : "#9ca3af",
          strokeWidth: isActive ? 2 : 1.5,
        },
        labelStyle: {
          fill: "#374151",
          fontSize: 10,
          fontWeight: 500,
        },
        labelBgStyle: {
          fill: "#ffffff",
          fillOpacity: 0.85,
        },
        labelBgPadding: [4, 2],
        labelBgBorderRadius: 4,
      };
    });
  }, [edges, hoveredNode]);

  return (
    <ReactFlow
      nodes={nodes.map((node: any) => ({
        ...node,
        data: {
          ...node.data,
          setHoveredNode,
        },
        setHoveredNode,
      }))}
      edges={styledEdges}
      onNodesChange={onNodeChange}
      onEdgesChange={onEdgeChanges}
      nodesDraggable
      nodesConnectable={false}
      nodeTypes={nodeTypes}
      snapToGrid
      snapGrid={[20, 20]}
      fitView
    >
      <Background size={1} />
      <Controls />
    </ReactFlow>
  );
}
