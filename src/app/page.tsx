"use client";

import DiagramPanel from "@/components/DIagramPanel";
import EditorPanel from "@/components/EditorPanel";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [editorWidth, setEditorWidth] = useState(33.33); // Percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const newWidth = (e.clientX / containerWidth) * 100;

      // Constrain between 20% and 80%
      const constrainedWidth = Math.max(20, Math.min(80, newWidth));
      setEditorWidth(constrainedWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isDragging]);

  return (
    <ErrorBoundary>
      <div
        ref={containerRef}
        className="w-full h-screen flex bg-[#1e1e1e] relative"
      >
        <ErrorBoundary
          fallback={
            <div className="flex items-center justify-center h-full p-8">
              <div className="max-w-md w-full bg-[#2a2a2a] border border-red-500 rounded-lg p-6">
                <h2 className="text-xl font-bold text-red-400 mb-4">
                  Editor Error
                </h2>
                <p className="text-gray-400">
                  The editor encountered an error. Please refresh the page.
                </p>
              </div>
            </div>
          }
        >
          <div style={{ width: `${editorWidth}%` }} className="shrink-0">
            <EditorPanel />
          </div>
        </ErrorBoundary>

        {/* Draggable Divider */}
        <div
          onMouseDown={handleMouseDown}
          className={`w-1 bg-[#333333] cursor-col-resize hover:bg-[#444444] transition-colors shrink-0 ${
            isDragging ? "bg-[#555555]" : ""
          }`}
          style={{ userSelect: "none" }}
        />

        <div style={{ width: `${100 - editorWidth}%` }} className="shrink-0">
          <DiagramPanel />
        </div>
      </div>
    </ErrorBoundary>
  );
}
