<div align="center">

# 🎥 PromptTube

### 💬 Chat with any YouTube video using its transcript

Paste a YouTube URL, ask a question, and receive AI-generated responses grounded entirely in the video's transcript — presented through a retro-futurist "signal console" interface.

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=nextdotjs">
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white">
  <img src="https://img.shields.io/badge/Groq-LLM-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white">
  <img src="https://img.shields.io/badge/Python-3.12+-3776AB?style=for-the-badge&logo=python&logoColor=white">
</p>

</div>

---

## 📖 Overview

PromptTube is a lightweight full-stack AI application that allows users to interact with YouTube videos through natural language.

The application extracts captions directly from YouTube videos and uses an LLM to generate answers strictly grounded in the transcript content.

Simply:

1. Paste a YouTube URL
2. Ask a question (optional)
3. Get an AI-generated answer based on the video's transcript

---

## 🖼️ Screenshots

<div align="center">
  <img src="docs/screenshots/prompttube-v2.png" width="720" alt="PromptTube signal console UI">
</div>

> Replace the placeholder path above with your own capture — the console fits the full viewport by design, so a full-window screenshot at ~1440px wide shows it best.

---

## ✨ Features

- ✅ YouTube transcript extraction
- ✅ Natural language querying
- ✅ Transcript-grounded responses
- ✅ Markdown formatted output
- ✅ Fast API responses via Groq
- ✅ Retro-futurist "signal console" UI, built with Tailwind
- ✅ Viewport-fit layout — no page scroll, only the response panel scrolls
- ✅ One-click copy and PDF export of any generated response
- ✅ Fully typed backend schemas with Pydantic

---

## 🏗️ Architecture

<details>
<summary><strong>Click to expand — request flow and system diagram</strong></summary>

<br>

```text
User Input
    ↓
Next.js Frontend
    ↓
FastAPI Backend
    ↓
YouTube Transcript API
    ↓
Prompt Construction
    ↓
Groq LLM API
    ↓
Generated Response
```

**Processing flow:**

1. User submits a YouTube URL and optional prompt.
2. Frontend sends a request to `POST /generate`.
3. Backend extracts the video ID.
4. Transcript is fetched using `youtube-transcript-api`.
5. Prompt and transcript are merged into a single context.
6. Request is sent to Groq's OpenAI-compatible API.
7. Generated response is returned to the frontend, rendered in the console's `03 OUTPUT` panel.

</details>

---

## 📂 Project Structure

<details>
<summary><strong>Click to expand — full directory layout</strong></summary>

<br>

```text
prompttube/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── schemas/
│   │   ├── services/
│   │   │   ├── youtube.py
│   │   │   └── llm.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── PromptForm.tsx
│   │   └── ResponseDisplay.tsx
│   ├── lib/
│   ├── tailwind.config.ts
│   └── .env.local.example
│
├── docs/
│   └── screenshots/
│
└── README.md
```

</details>

---

## ⚙️ Setup

<details>
<summary><strong>Click to expand — backend setup</strong></summary>

<br>

### 1️⃣ Create a Virtual Environment

```bash
cd backend

py -3.12 -m venv venv
source venv/Scripts/activate
```

### 2️⃣ Install Dependencies

```bash
pip install -r requirements.txt
```

### 3️⃣ Configure Environment Variables

```bash
copy .env.example .env
```

Add your Groq API key:

```env
GROQ_API_KEY=your_api_key_here
```

You can get a free API key from:

https://console.groq.com/keys

### 4️⃣ Start the Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

Swagger documentation:

```text
http://localhost:8000/docs
```

</details>

<details>
<summary><strong>Click to expand — frontend setup</strong></summary>

<br>

### 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

This includes `jspdf`, used for the console's PDF export button.

### 2️⃣ Configure Environment Variables

```bash
copy .env.local.example .env.local
```

### 3️⃣ Start Development Server

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

</details>

---

## 🚧 Limitations

Current version intentionally excludes:

- Authentication
- Persistent chat history
- Multi-video conversations
- Database storage
- Caching
- Docker deployment
- CI/CD pipelines

These are explicit non-goals for `v0.1`.

---

## 🚀 Future Improvements

- 📚 Saved conversations
- 🎥 Multi-video context support
- 📝 Study notes mode
- 📄 Report generation mode
- ❓ Quiz generation mode
- 🧠 Semantic transcript search
- ☁️ Cloud deployment

---

## 🤖 Development Process

PromptTube was built using an AI-assisted development workflow ("vibe coding") combined with manual integration, debugging, and architecture decisions.

The project involved solving issues such as:

- Breaking API changes in `youtube-transcript-api`
- Dependency conflicts between `openai` and `httpx`
- Prompt construction and transcript grounding
- Frontend-backend integration
- Reworking the frontend into a single-viewport, no-scroll console layout with an internally scrollable output panel

---

## 📜 License

This project is licensed under the MIT License.

---

## 🙌 Contributing

PromptTube started as a small personal build, and it's very much open to outside eyes. If you're a curious visitor who stumbled in from a star, a search, or a link — you're welcome here, whether this is your first pull request or your five-hundredth.

Good places to start:

- Skim the [Future Improvements](#-future-improvements) list above and pick something that interests you.
- Open an issue if you spot a bug, an unclear setup step, or a rough edge in the console UI.
- Fork the repo, make your change, and open a pull request — small, focused PRs are easiest to review and merge.

There's no formal contribution template yet; a clear description of what changed and why is enough to get started.

---

<div align="center">

## 👨‍💻 Author

### Aiman Fazal

<a href="https://github.com/aimanfazal">
  <img src="https://img.shields.io/badge/GitHub-aimanfazal-black?style=for-the-badge&logo=github">
</a>

### ⭐ If you found this project interesting, consider starring the repository!

</div>
