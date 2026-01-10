import DiagramPanel from "@/components/DIagramPanel";
import EditorPanel from "@/components/EditorPanel"; 

export default function Home() {
  return (
    <div className="w-full h-screen grid grid-cols-3 bg-[#1e1e1e]">
      <EditorPanel />
      <div className="col-span-2">
        <DiagramPanel />
      </div>
    </div>
  );
}
