import DiagramPanel from "@/components/DiagramPanel";
import EditorPanel from "@/components/EditorPanel";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Home() {
  return (
    <ErrorBoundary>
      <div className="w-full h-screen grid grid-cols-3 bg-[#1e1e1e]">
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
          <EditorPanel />
        </ErrorBoundary>
        <div className="col-span-2">
          <DiagramPanel />
        </div>
      </div>
    </ErrorBoundary>
  );
}
