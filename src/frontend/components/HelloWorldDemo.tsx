import { useState } from "react";
import { client } from "@/frontend/client";

export function HelloWorldDemo() {
  const [name, setName] = useState("World");
  const [submittedName, setSubmittedName] = useState("World");
  const { loading, data, error } = client.useQuery("helloWorld", { name: submittedName });

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Hello World Query</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && setSubmittedName(name)}
          placeholder="Enter your name"
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-300"
        />
        <button
          onClick={() => setSubmittedName(name)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Greet
        </button>
      </div>
      <div className="bg-gray-50 rounded-lg px-4 py-3 min-h-[48px] flex items-center">
        {loading && <span className="text-gray-400 text-sm">Loading...</span>}
        {error && <span className="text-red-500 text-sm">{error.message}</span>}
        {data && <span className="text-gray-700">{data.message}</span>}
      </div>
    </div>
  );
}
