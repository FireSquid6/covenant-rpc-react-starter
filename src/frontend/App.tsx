import "./index.css";
import { HelloWorldDemo } from "./components/HelloWorldDemo";
import { StoreDemo } from "./components/StoreDemo";
import { ChatRoomDemo } from "./components/ChatRoomDemo";

export function App() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Covenant RPC Demo</h1>
      <p className="text-gray-500 text-sm mb-8">Query, mutation, and channel examples</p>
      <div className="space-y-6">
        <HelloWorldDemo />
        <StoreDemo />
        <ChatRoomDemo />
      </div>
    </div>
  );
}

export default App;
