import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// 🟢 TRẢ LỜI ĐỂ UPTIMEROBOT KIỂM TRA SERVER SỐNG
app.get("/", (req, res) => {
  res.send("Server is alive");
});

// 🟢 DÁN API KEY CỦA BẠN VÀO ĐÂY
const GEMINI_API_KEY = "AIzaSyBzzvRNoTHIetsg9fhDjXF5Rx6N1gKLE2Q";

// 🟢 API /ask
app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question || "Hello";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }]
        })
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

// 🟢 CHẠY SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
