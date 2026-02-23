import { createPortal } from "react-dom";
import UsersData from "../data/UserData.json";
import { usersImages } from "../constant/images/images-users";
import { useState, useEffect, useRef } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { sendMessageToAI } from "../services/chatbot";
import { useTheme } from "../contexts/ThemeContext";
import { RiSparklingLine } from "react-icons/ri";
import { FiSend, FiX } from "react-icons/fi";

// ─── Storage helpers ──────────────────────────────────────────────────────────
const MSG_KEY      = "qriblik_messages";
const CONTACTS_KEY = "qriblik_contacts";

function loadMessages()  { try { return JSON.parse(localStorage.getItem(MSG_KEY))      || {}; } catch { return {}; } }
function loadContactIds(){ try { return JSON.parse(localStorage.getItem(CONTACTS_KEY)) || []; } catch { return []; } }
function saveMessages(m) { localStorage.setItem(MSG_KEY,      JSON.stringify(m)); }
function saveContactIds(c){ localStorage.setItem(CONTACTS_KEY, JSON.stringify(c)); }

// ─── AI virtual user ──────────────────────────────────────────────────────────
const AI_USER = { id: "ai", name: "Qriblik AI", bio: "Your neighborhood assistant!", isAI: true };

function getAvatar(user) {
  if (!user || user.isAI) return null;
  if (user.avatar?.startsWith("http")) return user.avatar;
  return usersImages[user.avatar];
}
function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─────────────────────────────────────────────────────────────────────────────
export default function Modale3({ onClose, initialUser = null }) {
  const { dark } = useTheme();

  const [selectedUser, setSelectedUser] = useState(initialUser || null);
  const [messages,     setMessages]     = useState(loadMessages);
  // Just store IDs of users you've messaged
  const [contactedIds, setContactedIds] = useState(() => new Set(loadContactIds()));
  const [input,    setInput]    = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Persist on change
  useEffect(() => { saveMessages(messages); }, [messages]);
  useEffect(() => { saveContactIds([...contactedIds]); }, [contactedIds]);

  // Auto-scroll
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  // Focus input
  useEffect(() => { if (selectedUser) setTimeout(() => inputRef.current?.focus(), 100); }, [selectedUser]);

  // Init greeting when opening a new chat
  useEffect(() => {
    if (!selectedUser) return;
    setMessages(prev => {
      if (prev[selectedUser.id]?.length) return prev;
      const init = selectedUser.isAI
        ? { text: "Hey neighbor! 👋 I'm Qriblik AI. Ask me anything!", sender: "them", time: nowTime(), timestamp: Date.now() }
        : { text: `Hey! I'm ${selectedUser.name} 👋`, sender: "them", time: nowTime(), timestamp: Date.now() };
      return { ...prev, [selectedUser.id]: [init] };
    });
  }, [selectedUser]);

  // ── Send ──────────────────────────────────────────────────────────────────
  async function sendMessage() {
    if (!input.trim() || !selectedUser) return;
    const userMsg = { text: input.trim(), sender: "me", time: nowTime(), timestamp: Date.now() };
    setMessages(prev => ({ ...prev, [selectedUser.id]: [...(prev[selectedUser.id] || []), userMsg] }));
    const sent = input.trim();
    setInput("");

    // Add to contacts ONLY when you actually send a message
    if (!selectedUser.isAI) {
      setContactedIds(prev => new Set([...prev, selectedUser.id]));
    }

    if (!selectedUser.isAI) return;

    setIsTyping(true);
    try {
      const reply = await sendMessageToAI(sent);
      setMessages(prev => ({
        ...prev,
        ai: [...(prev.ai || []), { text: reply, sender: "them", time: nowTime(), timestamp: Date.now() }],
      }));
    } catch {
      setMessages(prev => ({
        ...prev,
        ai: [...(prev.ai || []), { text: "Sorry, couldn't respond. Try again!", sender: "them", time: nowTime(), timestamp: Date.now() }],
      }));
    } finally { setIsTyping(false); }
  }

  // ── Build neighbor list ───────────────────────────────────────────────────
  // 1. Users you've messaged (from UsersData, sorted by last message)
  const messagedUsers = UsersData
    .filter(u => contactedIds.has(u.id))
    .sort((a, b) => {
      const tA = messages[a.id]?.slice(-1)[0]?.timestamp || 0;
      const tB = messages[b.id]?.slice(-1)[0]?.timestamp || 0;
      return tB - tA;
    });

  // 2. Always show 3 suggestions you haven't messaged yet, to fill the list
  const suggestions = UsersData
    .filter(u => !contactedIds.has(u.id))
    .slice(0, 3);

  const neighborList = [...messagedUsers, ...suggestions];

  function lastMsg(userId) {
    const m = messages[userId];
    return m?.length ? m[m.length - 1] : null;
  }

  // ── Theme tokens ─────────────────────────────────────────────────────────
  const bg         = dark ? "#0f0a1e"                    : "#ffffff";
  const borderCol  = dark ? "rgba(255,255,255,0.08)"     : "rgba(0,0,0,0.07)";
  const shadow     = dark
    ? "0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,63,222,0.2)"
    : "0 20px 60px rgba(139,63,222,0.12)";
  const divider    = dark ? "border-white/[0.06]"        : "border-gray-100";
  const titleCl    = dark ? "text-white"                 : "text-gray-900";
  const nameCl     = dark ? "text-purple-100"            : "text-gray-800";
  const subCl      = dark ? "text-purple-300/40"         : "text-gray-400";
  const hoverCl    = dark ? "hover:bg-white/5"           : "hover:bg-gray-50";
  const labelCl    = dark ? "text-white/20"              : "text-gray-400";
  const iconBtnCl  = dark ? "text-white/30 hover:bg-white/8 hover:text-white" : "text-gray-400 hover:bg-gray-100 hover:text-gray-700";
  const receiveBg  = dark ? "rgba(255,255,255,0.08)"     : "#f3f4f6";
  const receiveTxt = dark ? "#d8b4fe"                    : "#374151";
  const inputBg    = dark ? "rgba(255,255,255,0.05)"     : "#f9fafb";
  const inputBdr   = dark ? "rgba(255,255,255,0.10)"     : "#e5e7eb";
  const placeholderCl = dark ? "text-purple-100 placeholder-purple-300/30" : "text-gray-700 placeholder-gray-400";

  // ─────────────────────────────────────────────────────────────────────────
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-end justify-end" onClick={onClose}>
      <div
        onClick={e => e.stopPropagation()}
        className="relative flex flex-col w-full sm:w-[380px] h-[92vh] sm:h-[82vh] sm:m-5 sm:rounded-[28px] rounded-t-[28px] overflow-hidden"
        style={{ background: bg, border: `1px solid ${borderCol}`, boxShadow: shadow }}
      >

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        {!selectedUser ? (
          <div className={`px-5 pt-5 pb-4 shrink-0 border-b ${divider}`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-2xl font-black ${titleCl}`}>Messages</h2>
                <p className="text-[10px] tracking-[0.3em] font-bold mt-0.5 text-fuchsia-500">COMMUNITY INBOX</p>
              </div>
              <button onClick={onClose} className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${iconBtnCl}`}>
                <FiX size={16} />
              </button>
            </div>
          </div>
        ) : (
          <div className={`flex items-center gap-3 px-4 py-3.5 shrink-0 border-b ${divider}`}>
            <button onClick={() => setSelectedUser(null)} className={`p-2 rounded-xl transition-colors shrink-0 ${iconBtnCl}`}>
              <FaChevronLeft size={14} />
            </button>
            {selectedUser.isAI ? (
              <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center"
                style={{ background: "linear-gradient(135deg,#8B3FDE,#C837AB)" }}>
                <RiSparklingLine size={16} color="#fff" />
              </div>
            ) : (
              <img src={getAvatar(selectedUser)} className="w-9 h-9 rounded-full object-cover shrink-0" alt={selectedUser.name} />
            )}
            <div className="flex-1 min-w-0">
              <p className={`font-bold text-sm truncate ${nameCl}`}>{selectedUser.name}</p>
              {selectedUser.isAI && <p className="text-[10px] text-green-400 font-semibold">Always online</p>}
            </div>
            <button onClick={onClose} className={`p-2 rounded-xl transition-colors shrink-0 ${iconBtnCl}`}>
              <FiX size={15} />
            </button>
          </div>
        )}

        {/* ── CONTACT LIST ───────────────────────────────────────────────── */}
        {!selectedUser && (
          <div className="flex-1 overflow-y-auto">

            {/* AI featured card — always dark themed regardless of app theme */}
            <div className="px-4 pt-4 pb-2">
              <button
                onClick={() => setSelectedUser(AI_USER)}
                className="w-full text-left rounded-2xl p-4 relative overflow-hidden active:scale-[0.98] transition-transform"
                style={{ background: "linear-gradient(135deg,#1a0a2e,#2d1058)", border: "1px solid rgba(139,63,222,0.4)" }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none opacity-20"
                  style={{ background: "radial-gradient(circle,#8B3FDE,transparent)", transform: "translate(30%,-30%)" }} />
                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-12 h-12 rounded-2xl shrink-0 relative flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg,#8B3FDE,#C837AB)", boxShadow: "0 0 20px rgba(139,63,222,0.5)" }}>
                    <RiSparklingLine size={22} color="#fff" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#1a0a2e]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-black text-white text-sm">Qriblik AI</p>
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-purple-500/30 text-purple-300">AI</span>
                    </div>
                    <p className="text-xs text-purple-300/60 truncate mt-0.5">
                      {lastMsg("ai")?.text || "Ask me anything about the community…"}
                    </p>
                  </div>
                  {lastMsg("ai") && <span className="text-[10px] text-purple-400/50 shrink-0">{lastMsg("ai").time}</span>}
                </div>
              </button>
            </div>

            {/* Neighbors section */}
            <div className="px-5 pt-3 pb-1">
              <p className={`text-[10px] font-bold uppercase tracking-widest ${labelCl}`}>Neighbors</p>
            </div>

            <div className="px-3 pb-4 flex flex-col gap-0.5">
              {neighborList.map(user => {
                const last  = lastMsg(user.id);
                const isNew = !contactedIds.has(user.id);
                return (
                  <button key={user.id} onClick={() => setSelectedUser(user)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-3 rounded-2xl transition-all ${hoverCl}`}>
                    <img src={getAvatar(user)} alt={user.name} className="w-11 h-11 rounded-full object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className={`font-semibold text-sm truncate ${nameCl}`}>{user.name}</p>
                        {last
                          ? <span className={`text-[10px] shrink-0 ${subCl}`}>{last.time}</span>
                          : <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0"
                              style={{ background: "rgba(139,63,222,0.12)", color: "#a855f7" }}>Say hi</span>
                        }
                      </div>
                      <p className={`text-xs truncate mt-0.5 ${subCl}`}>
                        {last?.text || user.bio?.slice(0, 44) + "…"}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CHAT VIEW ──────────────────────────────────────────────────── */}
        {selectedUser && (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-2.5">
              {(messages[selectedUser.id] || []).map((msg, i) => (
                <div key={i} className={`flex flex-col max-w-[78%] ${msg.sender === "me" ? "self-end items-end" : "self-start items-start"}`}>
                  <div className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={msg.sender === "me"
                      ? { background: "linear-gradient(135deg,#c026d3,#e11d48)", color: "#fff", borderBottomRightRadius: 4 }
                      : { background: receiveBg, color: receiveTxt, borderBottomLeftRadius: 4 }
                    }>
                    {msg.text}
                  </div>
                  <span className={`text-[10px] mt-1 ${subCl}`}>{msg.time}</span>
                </div>
              ))}

              {isTyping && (
                <div className="self-start flex items-center gap-1.5 px-4 py-3 rounded-2xl" style={{ background: receiveBg, borderBottomLeftRadius: 4 }}>
                  {[0,1,2].map(i => (
                    <span key={i} className="w-1.5 h-1.5 rounded-full bg-fuchsia-400"
                      style={{ animation: `typingBounce 1.2s ease-in-out ${i*0.2}s infinite` }} />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input bar */}
            <div className={`px-4 py-3 shrink-0 border-t ${divider} flex gap-2 items-end`}>
              <div className="flex-1 flex items-end rounded-2xl px-3.5 py-2.5 border transition-all"
                style={{ background: inputBg, borderColor: inputBdr }}>
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onInput={e => { e.target.style.height = "auto"; e.target.style.height = e.target.scrollHeight + "px"; }}
                  placeholder={selectedUser.isAI ? "Ask Qriblik AI…" : `Message ${selectedUser.name}…`}
                  rows={1}
                  style={{ resize: "none", maxHeight: "100px", width: "100%" }}
                  className={`text-sm outline-none bg-transparent leading-relaxed ${placeholderCl}`}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                />
              </div>
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 transition-all active:scale-95"
                style={{
                  background: input.trim() ? "linear-gradient(135deg,#c026d3,#e11d48)" : inputBg,
                  opacity: input.trim() ? 1 : 0.4,
                  cursor: input.trim() ? "pointer" : "not-allowed",
                }}>
                <FiSend size={15} color={input.trim() ? "#fff" : dark ? "#fff" : "#9ca3af"} />
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`@keyframes typingBounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
    </div>,
    document.body
  );
}