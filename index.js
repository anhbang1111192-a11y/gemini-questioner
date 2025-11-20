import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const GEMINI_API_KEY = "YOUR_API_KEY_HERE";  // <<< DÁN KEY VÀO ĐÂY

app.post("/ask", async (req, res) => {
    try {
        const question = req.body.question || "Hello";

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateText?key=${GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: { text: question }
                })
            }
        );

        const data = await response.json();
        res.json(data);

    } catch (err) {
        res.status(500).json({ 
            error: "Server error", 
            details: err.message 
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
