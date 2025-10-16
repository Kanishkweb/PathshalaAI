import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message) return;
    setLoading(true);
    try {
      const res = await axios.post(
        "https://pathshalaai-9n5y.onrender.com/api/chat/",
        { message }
      );
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-purple-800 text-white p-4 overflow-hidden">
      {/* Floating shapes */}
      <motion.div
        className="absolute w-72 h-72 bg-pink-500 rounded-full opacity-20 top-10 left-1/4"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-96 h-96 bg-purple-500 rounded-full opacity-20 bottom-10 right-1/4"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Centered Hero + Chat */}
      <motion.div
        className="z-10 flex flex-col items-center w-full max-w-xl"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          PathshalaAI
        </h1>
        <p className="text-lg md:text-xl text-center mb-8">
          Your AI-powered English tutor. Chat, learn, and improve your English skills interactively.
        </p>

        {/* Chat Box */}
        <motion.div
          className="bg-gray-900 p-6 rounded-2xl w-full shadow-2xl flex flex-col"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <textarea
            rows="4"
            placeholder="Ask me anything about English..."
            className="w-full p-3 rounded-md bg-gray-800 text-white resize-none focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSend}
            className="mt-4 w-full py-3 text-black bg-pink-500 hover:bg-pink-600 rounded-md font-bold transition-all duration-300"
          >
            {loading ? "Thinking..." : "Send"}
          </button>

          {response && (
            <motion.div
              className="mt-6 p-4 bg-gray-700 rounded-xl text-gray-200 prose prose-invert max-w-full overflow-x-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <strong>AI:</strong>
              <ReactMarkdown>{response}</ReactMarkdown>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default App;
