"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { useSchemaStore } from "@/store/schema";
import { useEffect, useRef } from "react";
import * as prismaLanguage from "../lib/prismalang";

export default function EditorPanel() {
  const { schema, setSchema } = useSchemaStore();
  const editorRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  async function validateSchema(value: string) {
    const res = await fetch("/api/parse-prisma", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ schema: value }),
    });

    const data = await res.json();

    const monaco = await import("monaco-editor");
    const model = editorRef.current.getModel();

    if (model) {
      if (data.error) {
        editorRef.current.revealLine(data.error[0].startLineNumber);
        monaco.editor.setModelMarkers(model, "prisma", data.error);
      } else {
        monaco.editor.setModelMarkers(model, "prisma", []);
      }
    }
  }

  async function debouncedValidate(value: string) {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      validateSchema(value);
    });
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
    <Editor
      className="border-r-2 border-r-[#333333]"
      height={"100vh"}
      language="prisma"
      theme="vs-dark"
      value={schema}
      onMount={(editor) => (editorRef.current = editor)}
      onChange={(v) => {
        const value = v || "";
        setSchema(value);

        debouncedValidate(value);
      }}
      options={{
        minimap: { enabled: false },
        fontSize: 18,
        tabSize: 2,
        lineHeight: 22,
        lineNumbers: "on", //off, //relative, //on,
        automaticLayout: true,
        lineNumbersMinChars: 3,
        folding: true, // function folding
        wordWrap: "on",
        scrollbar: {
          vertical: "auto", //hidden
          verticalScrollbarSize: 3,
          horizontal: "auto",
          horizontalScrollbarSize: 4,
        },
        padding: {
          top: 10,
        },
        guides: {
          indentation: true, //false
        },
      }}
    />
  );
}
