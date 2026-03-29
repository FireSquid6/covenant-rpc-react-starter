import { useState } from "react";
import { client } from "@/frontend/client";

export function StoreDemo() {
  const [input, setInput] = useState("");
  const { data, loading, error } = client.useListenedQuery("getStore", null, true);
  const [setStore, { loading: saving }] = client.useMutation("setStore");

  async function handleSave() {
    await setStore(input);
    setInput("");
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Shared Store</h2>
      <p className="text-xs text-gray-400 mb-4">Live — updates across all connected clients</p>

      <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4 min-h-[48px] flex items-center">
        {loading && <span className="text-gray-400 text-sm">Loading...</span>}
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
        {!loading && !error && (
          <span className="text-gray-700 font-mono text-sm break-all">
            {data ?? <span className="text-gray-400 italic">empty</span>}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="New value..."
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 placeholder:text-gray-300"
        />
        <button
          onClick={handleSave}
          disabled={saving || !input}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-40 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
