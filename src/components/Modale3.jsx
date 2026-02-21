import { createPortal } from "react-dom";
import UsersData from "../data/UserData.json";
import { usersImages } from "../constant/images/images-users";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { sendMessageToAI } from "../services/chatbot";
import { useTheme } from "../contexts/ThemeContext";

function Modale3({ onClose }) {
  const { dark } = useTheme();

  const firstFourUsers = UsersData.slice(0, 3);
  const [selectedUser, setSelectedUser] = useState(null);

  const [messages, setMessages] = useState(() => {
    const initialMessages = {};
    UsersData.forEach((user) => {
      initialMessages[user.id] = [
        {
          text: `Hi I'm ${user.name}! 👋`,
          sender: "them",
          time: "10:00 AM",
        },
      ];
    });
    initialMessages["ai"] = [
      {
        text: "Hello 👋 How can I help you today?",
        sender: "them",
        time: "Now",
      },
    ];
    return initialMessages;
  });

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim() || !selectedUser) return;

    const currentInput = input;

    const userMessage = {
      text: currentInput,
      sender: "me",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedUser.id]: [...(prev[selectedUser.id] || []), userMessage],
    }));

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
      };
      setMessages((prev) => ({
        ...prev,
        ai: [...(prev.ai || []), aiMessage],
      }));
    } catch (error) {
      console.error("AI error:", error);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-end"
      onClick={onClose}
    >
      <div
        className={`w-[360px] h-[85vh] rounded-[32px] shadow-2xl p-4 relative overflow-hidden m-6 animate-[slideUp_.3s_ease-out] transition-colors duration-300 ${dark
            ? "bg-[#150d27]/80 backdrop-blur-md border border-white/6"
            : "bg-white/30 backdrop-blur-md"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2
              className={`text-2xl font-bold ${dark ? "text-purple-50" : "text-slate-900"
                }`}
            >
              Messages
            </h2>
            <p className="text-xs tracking-[0.3em] text-fuchsia-500 font-bold mt-1">
              COMMUNITY INBOX
            </p>
          </div>
          <button
            onClick={onClose}
            className={`text-xl transition-colors ${dark
                ? "text-purple-300/40 hover:text-purple-200"
                : "text-slate-400 hover:text-slate-600"
              }`}
          >
            ✕
          </button>
        </div>

        {/* AI CARD */}
        {!selectedUser && (
          <div
            onClick={() =>
              setSelectedUser({ id: "ai", name: "Neighborly AI" })
            }
            className={`rounded-2xl p-4 flex items-center gap-4 mb-6 shadow-sm cursor-pointer hover:scale-[1.02] transition ${dark
                ? "bg-[#1a0a2e] border border-white/8"
                : "bg-gradient-to-r from-fuchsia-50 to-rose-50"
              }`}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-fuchsia-600 to-rose-500 flex items-center justify-center text-white text-xl">
              ✨
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold ${dark ? "text-purple-50" : "text-slate-900"
                    }`}
                >
                  Neighborly AI
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-fuchsia-600 text-white font-bold">
                  ASSISTANT
                </span>
              </div>
              <p className="text-sm text-fuchsia-400 italic">
                Ask me anything about the local area...
              </p>
            </div>
            <span className="w-2 h-2 bg-fuchsia-500 rounded-full"></span>
          </div>
        )}

        {/* USER LIST */}
        {!selectedUser ? (
          <div className="flex flex-col gap-6 overflow-y-auto pr-2 h-[60vh]">
            {firstFourUsers.map((user) => (
              <div
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={`flex items-center justify-between cursor-pointer p-3 rounded-xl transition ${dark
                    ? "hover:bg-white/5"
                    : "hover:bg-slate-100"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <img
                    src={usersImages[user.avatar]}
                    alt={user.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4
                      className={`font-semibold ${dark ? "text-purple-50" : "text-slate-900"
                        }`}
                    >
                      {user.name}
                    </h4>
                    <p
                      className={`text-sm ${dark ? "text-purple-300/40" : "text-slate-400"
                        }`}
                    >
                      {user.bio.slice(0, 40)}...
                    </p>
                  </div>
                </div>
                <FaChevronRight
                  className={dark ? "text-purple-300/30" : "text-slate-300"}
                />
              </div>
            ))}
          </div>
        ) : (
          /* CONVERSATION */
          <div className="flex flex-col h-[60vh] animate-[fadeIn_.3s_ease-in-out]">
            {/* CONVERSATION HEADER */}
            <div
              className={`flex items-center gap-3 border-b pb-3 mb-3 ${dark ? "border-white/6" : "border-slate-200"
                }`}
            >
              <button
                onClick={() => setSelectedUser(null)}
                className={`w-9 h-9 flex items-center justify-center rounded-full transition ${dark
                    ? "text-purple-200 hover:bg-white/8"
                    : "hover:bg-slate-100"
                  }`}
              >
                <FaChevronLeft />
              </button>
              <img
                src={
                  selectedUser.id === "ai"
                    ? "https://ui-avatars.com/api/?name=AI"
                    : usersImages[selectedUser.avatar]
                }
                className="w-10 h-10 rounded-full object-cover"
              />
              <h4
                className={`font-semibold ${dark ? "text-purple-50" : "text-slate-800"
                  }`}
              >
                {selectedUser.name}
              </h4>
            </div>

            {/* MESSAGES */}
            <div className="flex-1 overflow-y-auto flex flex-col gap-4 px-1">
              {(messages[selectedUser.id] || []).map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col max-w-[75%] ${msg.sender === "me"
                      ? "self-end items-end"
                      : "self-start"
                    }`}
                >
                  <div
                    className={`px-4 py-2 rounded-2xl shadow-sm ${msg.sender === "me"
                        ? "bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white"
                        : dark
                          ? "bg-[#1a0a2e] text-purple-100 border border-white/6"
                          : "bg-slate-100 text-slate-800"
                      }`}
                  >
                    {msg.text}
                  </div>
                  <span
                    className={`text-[10px] mt-1 ${dark ? "text-purple-300/40" : "text-slate-400"
                      }`}
                  >
                    {msg.time}
                  </span>
                </div>
              ))}
            </div>

            {/* INPUT */}
            <div className="mt-4 flex gap-2 items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className={`flex-1 rounded-full px-4 py-2 outline-none transition-colors ${dark
                    ? "bg-[#1a0a2e] border border-white/8 text-purple-100 placeholder-purple-300/30 focus:border-fuchsia-500/50"
                    : "border border-slate-200 text-slate-800 focus:border-fuchsia-300"
                  }`}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
              />
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-fuchsia-600 to-rose-500 text-white px-5 py-2 rounded-full hover:opacity-90 transition shadow-sm"
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