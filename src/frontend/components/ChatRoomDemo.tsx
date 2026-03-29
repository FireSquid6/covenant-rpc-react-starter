import { useState, useEffect, useRef } from "react";
import { client } from "@/frontend/client";

type Message = {
  text: string;
  timestamp: number;
  username: string;
};

type ConnectionState =
  | { status: "disconnected" }
  | { status: "connecting" }
  | { status: "connected"; token: string; username: string }
  | { status: "error"; message: string };

export function ChatRoomDemo() {
  const [channelId, setChannelId] = useState("general");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conn, setConn] = useState<ConnectionState>({ status: "disconnected" });
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (conn.status !== "connected") return;
    const token = conn.token;
    let unsub: (() => void) | undefined;

    client
      .subscribe("chatRoom", { channelId }, token, (msg) => {
        setMessages((prev) => [...prev, msg]);
      })
      .then((fn) => {
        unsub = fn;
      });

    return () => {
      unsub?.();
    };
  }, [conn.status === "connected" ? conn.token : null]);

  async function handleConnect() {
    setConn({ status: "connecting" });
    const result = await client.connect("chatRoom", { channelId }, { username, password });
    if (result.success) {
      setConn({ status: "connected", token: result.token, username });
      setMessages([]);
    } else {
      setConn({ status: "error", message: result.error.message });
    }
  }

  async function handleSend() {
    if (conn.status !== "connected" || !text.trim()) return;
    await client.send("chatRoom", { channelId }, conn.token, { text });
    setText("");
  }

  function handleDisconnect() {
    setConn({ status: "disconnected" });
    setMessages([]);
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-1">Chat Room Channel</h2>
      <p className="text-xs text-gray-400 mb-4">Real-time bidirectional — use "invalid" as password to test rejection</p>

      {conn.status === "disconnected" || conn.status === "error" ? (
        <div className="space-y-3">
          {conn.status === "error" && (
            <p className="text-red-500 text-sm bg-red-50 rounded-lg px-3 py-2">{conn.message}</p>
          )}
          <div className="flex gap-2">
            <input
              value={channelId}
              onChange={(e) => setChannelId(e.target.value)}
              placeholder="Channel ID"
              className="w-28 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-300"
            />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-300"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleConnect()}
              type="password"
              placeholder="Password"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-300"
            />
            <button
              onClick={handleConnect}
              disabled={!username || !channelId}
              className="bg-purple-500 hover:bg-purple-600 disabled:opacity-40 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Join
            </button>
          </div>
        </div>
      ) : conn.status === "connecting" ? (
        <p className="text-gray-400 text-sm">Connecting...</p>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500">
              <span className="text-purple-600 font-medium">#{conn.username}</span> in{" "}
              <span className="font-medium">{channelId}</span>
            </span>
            <button
              onClick={handleDisconnect}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
            >
              Leave
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-3 h-48 overflow-y-auto mb-3 space-y-1">
            {messages.length === 0 && (
              <p className="text-gray-400 text-xs italic text-center mt-16">No messages yet</p>
            )}
            {messages.map((msg, i) => (
              <div key={i} className="text-sm">
                <span className="font-medium text-purple-600">{msg.username}</span>
                <span className="text-gray-400 text-xs ml-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
                <span className="text-gray-700 ml-2">{msg.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder:text-gray-300"
            />
            <button
              onClick={handleSend}
              disabled={!text.trim()}
              className="bg-purple-500 hover:bg-purple-600 disabled:opacity-40 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
