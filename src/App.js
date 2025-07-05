import "./App.css";
import gptlogo from "./assests/chatgpt.svg";
import addbtn from "./assests/add-30.png";
import msgicon from "./assests/message.svg";
import home from "./assests/home.svg";
import saved from "./assests/bookmark.svg";
import sendbtn from "./assests/send.svg";
import usericon from "./assests/user-icon.png";
import gptimagelogo from "./assests/chatgptLogo.svg";
import { sendmsgopenai } from "./openai";
import { useEffect, useRef, useState } from "react";

function App() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState([
    {
      text: "Hi 👋 I am ChatGPT, your AI buddy developed by Krishnesh Tiwari. Ask me anything!",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const handlesend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    setMessage((prev) => [...prev, { text, isBot: false }]);

    // IMPORTANT: short summary prompt
    const res = await sendmsgopenai(`Give a short summary: ${text}`);

    setMessage((prev) => [...prev, { text: res, isBot: true }]);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handlesend();
  };

  const handlequery = async (query) => {
    setMessage((prev) => [...prev, { text: query, isBot: false }]);
    const res = await sendmsgopenai(`Give a short summary: ${query}`);
    setMessage((prev) => [...prev, { text: res, isBot: true }]);
  };

  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptlogo} alt="Logo" className="logo" />
            <span className="brand">ChatGPT</span>
          </div>

          <button className="midBtn" onClick={() => window.location.reload()}>
            <img src={addbtn} alt="new chat" className="addBtn" />
            New Chat
          </button>

          <div className="upperSideBottom">
            <button
              className="query"
              onClick={() => handlequery("What is Competitive Programming?")}
            >
              <img src={msgicon} alt="Query" />
              What is Competitive Programming?
            </button>
            <button
              className="query"
              onClick={() => handlequery("How does an API work?")}
            >
              <img src={msgicon} alt="Query" />
              How does an API work?
            </button>
            <button
              className="query"
              onClick={() => handlequery("Explain C++ STL")}
            >
              <img src={msgicon} alt="Query" />
              Explain C++ STL
            </button>
            <button
              className="query"
              onClick={() =>
                handlequery("Difference between JavaScript and ReactJS?")
              }
            >
              <img src={msgicon} alt="Query" />
              JS vs ReactJS?
            </button>
          </div>
        </div>

        <div className="lowerSide">
          <div className="listitems">
            <img src={home} alt="" className="listitemimg" />
            <span>Docs</span>
          </div>
          <div className="listitems">
            <img src={saved} alt="" className="listitemimg" />
            <span>Guides</span>
          </div>
          <div className="createdBy">
            Created by <strong>Krishnesh Tiwari</strong>
          </div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          {message.map((m, i) => (
            <div key={i} className={m.isBot ? "chat bot" : "chat"}>
              <img
                className="chatimg"
                src={m.isBot ? gptimagelogo : usericon}
                alt=""
              />
              <p className="txt">{m.text}</p>
            </div>
          ))}
          <div ref={msgEnd}></div>
        </div>
        <div className="chatfooter">
          <div className="inp">
            <input
              type="text"
              placeholder="Send a message..."
              value={input}
              onKeyDown={handleEnter}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="send" onClick={handlesend}>
              <img src={sendbtn} alt="Send" />
            </button>
          </div>
          <p>ChatGPT may produce inaccurate info. © July 2025</p>
        </div>
      </div>
    </div>
  );
}

export default App;
