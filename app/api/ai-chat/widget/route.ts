const WIDGET_SOURCE = String.raw`
(() => {
  const script = document.currentScript;
  const chatbotId = script && script.dataset.chatbotId;
  if (!script || !chatbotId || script.dataset.chatbotLoaded === "true") return;
  script.dataset.chatbotLoaded = "true";

  const apiOrigin = new URL(script.src).origin;
  const host = document.createElement("div");
  host.setAttribute("data-braided-ai-chat", chatbotId);
  document.body.appendChild(host);
  const root = host.attachShadow({ mode: "open" });
  let config = { companyName: "Asystent AI", welcomeMessage: "Dzień dobry! Jak mogę pomóc?", color: "#151515" };
  let messages = [];
  let open = false;
  let busy = false;
  const sessionKey = "braided-chat-" + chatbotId;
  let sessionId;
  try {
    sessionId = localStorage.getItem(sessionKey);
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem(sessionKey, sessionId);
    }
  } catch {
    sessionId = crypto.randomUUID();
  }

  root.innerHTML = '<style>\
    :host{all:initial}*{box-sizing:border-box}.launcher{position:fixed;right:22px;bottom:22px;z-index:2147483646;width:58px;height:58px;border:0;border-radius:50%;background:var(--chat-color);color:#fff;cursor:pointer;font:700 18px/1 Arial,sans-serif;box-shadow:0 12px 35px rgba(0,0,0,.24)}\
    .panel{position:fixed;right:22px;bottom:92px;z-index:2147483647;width:min(380px,calc(100vw - 28px));height:min(590px,calc(100vh - 120px));display:none;grid-template-rows:auto 1fr auto;background:#fff;border:1px solid rgba(0,0,0,.12);border-radius:20px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.24);font:14px/1.5 Arial,sans-serif;color:#171717}.panel.open{display:grid}\
    header{display:flex;align-items:center;gap:11px;padding:16px 18px;background:var(--chat-color);color:#fff}header span{display:grid}header small{opacity:.72}header button{margin-left:auto;border:0;background:transparent;color:#fff;font-size:24px;cursor:pointer}.avatar{width:38px;height:38px;display:grid;place-items:center;border-radius:50%;background:rgba(255,255,255,.18);font-weight:700}\
    .messages{padding:18px;overflow:auto;background:#f5f4f1}.bubble{max-width:86%;margin:0 0 10px;padding:10px 13px;border-radius:14px;white-space:pre-wrap}.assistant{background:#fff;border:1px solid rgba(0,0,0,.08);border-bottom-left-radius:4px}.user{margin-left:auto;background:var(--chat-color);color:#fff;border-bottom-right-radius:4px}.typing{opacity:.65}\
    form{display:flex;gap:8px;padding:12px;background:#fff;border-top:1px solid rgba(0,0,0,.1)}input{min-width:0;flex:1;border:1px solid rgba(0,0,0,.18);border-radius:999px;padding:11px 14px;font:14px Arial,sans-serif;outline:none}input:focus{border-color:var(--chat-color)}form button{border:0;border-radius:999px;padding:0 16px;background:var(--chat-color);color:#fff;font-weight:700;cursor:pointer}button:disabled,input:disabled{opacity:.55;cursor:not-allowed}\
    .error{margin:0;padding:8px 14px;background:#fff0f0;color:#a32626;font-size:12px}@media(max-width:520px){.launcher{right:14px;bottom:14px}.panel{right:14px;bottom:82px;height:calc(100vh - 104px)}}\
  </style>\
  <button class="launcher" type="button" aria-label="Otwórz czat AI">AI</button>\
  <section class="panel" role="dialog" aria-label="Czat z asystentem">\
    <header><span class="avatar">AI</span><span><strong class="company">Asystent AI</strong><small>Asystent online</small></span><button class="close" type="button" aria-label="Zamknij czat">×</button></header>\
    <div class="messages" aria-live="polite"></div><form><input aria-label="Wiadomość" maxlength="1000" placeholder="Napisz wiadomość…"><button type="submit">Wyślij</button></form>\
  </section>';

  const panel = root.querySelector(".panel");
  const launcher = root.querySelector(".launcher");
  const close = root.querySelector(".close");
  const form = root.querySelector("form");
  const input = root.querySelector("input");
  const send = form.querySelector("button");
  const messageList = root.querySelector(".messages");

  function applyConfig() {
    host.style.setProperty("--chat-color", /^#[0-9a-f]{6}$/i.test(config.color) ? config.color : "#151515");
    root.querySelector(".company").textContent = config.companyName;
  }
  function addMessage(role, content, transient) {
    const bubble = document.createElement("p");
    bubble.className = "bubble " + role + (transient ? " typing" : "");
    bubble.textContent = content;
    if (transient) bubble.dataset.transient = "true";
    messageList.appendChild(bubble);
    messageList.scrollTop = messageList.scrollHeight;
    return bubble;
  }
  function setOpen(next) {
    open = next;
    panel.classList.toggle("open", open);
    launcher.setAttribute("aria-label", open ? "Zamknij czat AI" : "Otwórz czat AI");
    if (open) input.focus();
  }

  launcher.addEventListener("click", () => setOpen(!open));
  close.addEventListener("click", () => setOpen(false));
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const content = input.value.trim();
    if (!content || busy) return;
    const history = messages.slice(-10);
    messages.push({ role: "user", content });
    addMessage("user", content);
    input.value = "";
    busy = true;
    input.disabled = true;
    send.disabled = true;
    const typing = addMessage("assistant", "Piszę odpowiedź…", true);
    try {
      const response = await fetch(apiOrigin + "/api/ai-chat/" + encodeURIComponent(chatbotId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history, sessionId })
      });
      const payload = await response.json();
      if (!response.ok || !payload.reply) throw new Error(payload.error || "Brak odpowiedzi.");
      typing.remove();
      messages.push({ role: "assistant", content: payload.reply });
      addMessage("assistant", payload.reply);
    } catch (error) {
      typing.textContent = error && error.message ? error.message : "Asystent jest chwilowo niedostępny.";
      typing.classList.remove("typing");
    } finally {
      busy = false;
      input.disabled = false;
      send.disabled = false;
      input.focus();
    }
  });

  fetch(apiOrigin + "/api/ai-chat/" + encodeURIComponent(chatbotId))
    .then((response) => response.ok ? response.json() : Promise.reject())
    .then((data) => {
      config = data;
      applyConfig();
      messages = [{ role: "assistant", content: config.welcomeMessage }];
      addMessage("assistant", config.welcomeMessage);
    })
    .catch(() => {
      applyConfig();
      messages = [{ role: "assistant", content: config.welcomeMessage }];
      addMessage("assistant", config.welcomeMessage);
    });
})();
`;

export function GET() {
  return new Response(WIDGET_SOURCE, {
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
      "Cross-Origin-Resource-Policy": "cross-origin",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
