import EditorPanel from "@/components/EditorPanel";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full h-screen grid grid-cols-4 bg-[#1e1e1e]">
      <EditorPanel />
      {/* <DiagramPanel /> */}
    </div>
  );
}
