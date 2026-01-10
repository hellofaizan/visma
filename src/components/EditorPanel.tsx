"use client";

import Editor, { useMonaco } from "@monaco-editor/react";
import { useSchemaStore } from "@/store/schema";
import { useEffect } from "react";
import * as prismaLanguage from "./prismalang";

export default function EditorPanel() {
  const { schema, setSchema } = useSchemaStore();

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
      onChange={(v) => setSchema(v ?? "")}
      options={{
        minimap: { enabled: false },
        fontSize: 18,
        tabSize: 2,
        lineHeight: 22,
        lineNumbers: "on", //off, //relative, //on,
        automaticLayout: true,
        lineNumbersMinChars: 3,
        folding: false, // function folding
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
