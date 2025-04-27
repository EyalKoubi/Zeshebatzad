import React, { useState } from "react";
import { askGroq } from "./api/groqApi";

const Home: React.FC = () => {
  const [opinion1, setOpinion1] = useState("");
  const [opinion2, setOpinion2] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!opinion1 || !opinion2) {
      alert("חייב למלא את שתי הדעות!");
      return;
    }
    setLoading(true);
    try {
      const result = await askGroq(opinion1, opinion2);
      setAnswer(result);
    } catch (error) {
      console.error(error);
      setAnswer("הייתה בעיה, תנסה שוב מאוחר יותר.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#121212",
      }}
    >
      <h1 style={{ marginBottom: "1rem", color: "#fff" }}>זה שבצד 🛕</h1>

      <p
        style={{
          marginBottom: "2rem",
          color: "#999",
          fontStyle: "italic",
          fontSize: "1rem",
        }}
      >
        .מה שזה שבצד אומר — קדוש
      </p>

      <input
        dir="rtl"
        type="text"
        placeholder="דיעה ראשונה"
        value={opinion1}
        onChange={(e) => setOpinion1(e.target.value)}
        style={{
          padding: "0.8rem",
          marginBottom: "1rem",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#333",
          color: "#fff",
        }}
      />
      <br />
      <input
        dir="rtl"
        type="text"
        placeholder="דיעה שנייה"
        value={opinion2}
        onChange={(e) => setOpinion2(e.target.value)}
        style={{
          padding: "0.8rem",
          marginBottom: "2rem",
          width: "300px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#333",
          color: "#fff",
        }}
      />
      <br />

      {loading ? (
        <div
          style={{
            border: "6px solid #ccc",
            borderTop: "6px solid #00FFAA",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            animation: "spin 1s linear infinite",
            marginBottom: "2rem",
          }}
        />
      ) : (
        <button
          onClick={handleAsk}
          style={{
            padding: "0.8rem 2rem",
            fontSize: "1.2rem",
            marginBottom: "2rem",
            backgroundColor: "#00FFAA",
            color: "#000",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          תשאל את זה שבצד
        </button>
      )}

      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#00FFAA",
          minHeight: "120px",
          textAlign: "center",
        }}
      >
        {answer && (
          <div style={{ animation: "pulse 1s infinite" }} dir="rtl">
            {answer}
          </div>
        )}
      </div>

      {/* אנימציה של הספינר */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
};

export default Home;

