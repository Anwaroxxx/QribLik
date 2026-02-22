import { createPortal } from "react-dom";
import UsersData from "../data/UserData.json";
import { usersImages } from "../constant/images/images-users";
import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { sendMessageToAI } from "../services/chatbot";
import { useTheme } from "../contexts/ThemeContext";

function Modale3({ onClose, initialUser = null }) {
  const { dark } = useTheme();

  const [selectedUser, setSelectedUser] = useState(initialUser || null);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!selectedUser) return;

    setMessages((prev) => {
      if (prev[selectedUser.id]) return prev;

      if (selectedUser.id === "ai") {
        return {
          ...prev,
          ai: [
            {
              text: "Hello 👋 How can I help you today?",
              sender: "them",
              time: "Now",
              timestamp: Date.now(),
            },
          ],
        };
      }

      return {
        ...prev,
        [selectedUser.id]: [
          {
            text: `Hi I'm ${selectedUser.name}! 👋`,
            sender: "them",
            time: "10:00 AM",
            timestamp: Date.now(),

          },
        ],
      };
    });
  }, [selectedUser]);

  const sendMessage = async () => {
    if (!input.trim() || !selectedUser) return;
 
    const now = Date.now();

    const userMessage = {
      text: input,
      sender: "me",
      time: new Date(now).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      timestamp: now,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), userMessage],
    }));

    const currentInput = input;
    setInput("");

    if (selectedUser.id !== "ai") return;

    try {
      const aiReply = await sendMessageToAI(currentInput);

      const aiMessage = {
        text: aiReply,
        sender: "them",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        timestamp: Date.now(),
      };

      setMessages((prev) => ({
        ...prev,
        ai: [...(prev.ai || []), aiMessage],
      }));
    } catch (error) {
      console.error("AI error:", error);
    }
  };

  const sortedUsers = [...UsersData].sort((a, b) => {
    const lastA = messages[a.id]?.slice(-1)[0]?.timestamp || 0;
    const lastB = messages[b.id]?.slice(-1)[0]?.timestamp || 0;
    return lastB - lastA;
  });

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-end"
      onClick={onClose}
    >
      <div
        className={`w-[360px] h-[85vh] rounded-[32px] shadow-2xl p-4 relative overflow-hidden m-6 ${
          dark
            ? "bg-[#150d27]/80 backdrop-blur-md border border-white/6"
            : "bg-white/30 backdrop-blur-md"
        }`}
        onClick={(e) => e.stopPropagation()}
      >

        <div className="flex justify-between items-start mb-6">
          <div>
            <h2
              className={`text-2xl font-bold ${
                dark ? "text-purple-50" : "text-slate-900"
              }`}
            >
              Messages
            </h2>
            <p className="text-xs tracking-[0.3em] text-fuchsia-500 font-bold mt-1">
              COMMUNITY INBOX
            </p>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        {!selectedUser ? (
          <div className="flex flex-col gap-6 overflow-y-auto pr-2 h-[60vh]">
            {sortedUsers.slice(0, 3).map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className="flex items-center justify-between cursor-pointer p-3 rounded-xl hover:bg-slate-100"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={usersImages[user.avatar]}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-slate-400">
                      {user.bio.slice(0, 40)}...
                    </p>
                  </div>
                </div>
                <FaChevronRight />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col h-[60vh]">
   
            <div className="flex items-center gap-3 border-b pb-3 mb-3">
              <button onClick={() => setSelectedUser(null)}>
                <FaChevronLeft />
              </button>
              <img
                src={
                  selectedUser.id === "ai"
                    ? "https://ui-avatars.com/api/?name=AI"
                    : selectedUser.avatar?.startsWith("http")
                    ? selectedUser.avatar
                    : usersImages[selectedUser.avatar]
                }
                className="w-10 h-10 rounded-full object-cover"
              />
              <h4 className="font-semibold">{selectedUser.name}</h4>
            </div>
 
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 px-1">
              {(messages[selectedUser.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col max-w-[75%] ${
                    msg.sender === "me"
                      ? "self-end items-end"
                      : "self-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl ${
                      msg.sender === "me"
                        ? "bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white"
                        : "bg-slate-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] mt-1 text-slate-400">
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>
 
            <div className="mt-4 flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 rounded-full px-4 py-2 border border-slate-200"
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-5 py-2 rounded-full"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

export default Modale3;