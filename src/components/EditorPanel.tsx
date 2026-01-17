"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { useSchemaStore } from "@/store/schema";
import { useEffect, useRef } from "react";
import * as prismaLanguage from "../lib/prismalang";
import Link from "next/link";
import {
  IconBrandGithub,
  IconCurrencyDollar,
  IconEyeDollar,
  IconWorld,
} from "@tabler/icons-react";

export default function EditorPanel() {
  const { schema, setSchema, triggerRefresh } = useSchemaStore();
  const editorRef = useRef<any>(null);

  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      monaco.languages.register({ id: "prisma" });
      monaco.languages.setLanguageConfiguration(
        "prisma",
        prismaLanguage.config
      );
      monaco.languages.setMonarchTokensProvider(
        "prisma",
        prismaLanguage.language
      );
    }
  }, [monaco]);

  return (
    <div className="flex flex-col h-screen">
      <div className="h-[60px] bg-[#252526] border-t border-[#333333] flex items-center justify-center px-4">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Link
              href={"https://github.com/hellofaizan/visma"}
              target="_blank"
              className="p-1 border border-[#333333] rounded-md"
              title="OPen source repository"
            >
              <IconBrandGithub size={18} />
            </Link>

            <Link
              href={"https://mohammadfaizan.com?ref=visma"}
              target="_blank"
              className="p-1 border border-[#333333] rounded-md"
              title="Visit my portfolio"
            >
              <IconWorld size={18} />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={"https://github.com/sponsors/hellofaizan"}
              target="_blank"
              className="p-1 border border-[#333333] rounded-md"
              title="Support me"
            >
              <IconCurrencyDollar size={18} className="text-green-500" />
            </Link>
            <button
              onClick={triggerRefresh}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors cursor-pointer"
            >
              Convert to Diagram
            </button>
          </div>
        </div>
      </div>
      <Editor
        className="flex-1"
        height={"calc(100vh - 60px)"}
        language="prisma"
        theme="vs-dark"
        value={schema}
        onMount={(editor) => (editorRef.current = editor)}
        onChange={(v) => {
          const value = v || "";
          setSchema(value);
        }}
        options={{
          minimap: { enabled: false },
          fontSize: 18,
          tabSize: 2,
          lineHeight: 22,
          lineNumbers: "on",
          automaticLayout: true,
          lineNumbersMinChars: 3,
          folding: true,
          wordWrap: "on",
          scrollbar: {
            vertical: "auto",
            verticalScrollbarSize: 3,
            horizontal: "auto",
            horizontalScrollbarSize: 4,
          },
          padding: {
            top: 10,
          },
          guides: {
            indentation: true,
          },
        }}
      />
    </div>
  );
}
