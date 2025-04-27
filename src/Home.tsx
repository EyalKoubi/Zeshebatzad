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
      <button
        onClick={handleAsk}
        disabled={loading}
        style={{
          padding: "0.8rem 2rem",
          fontSize: "1.2rem",
          marginBottom: "2rem",
        }}
      >
        {loading ? "שואל את זה שבצד..." : "תשאל את זה שבצד"}
      </button>

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
    </div>
  );
};

export default Home;
