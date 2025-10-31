# Configuration and per-user settings

This project separates user-specific configuration (API keys, phone numbers, domains, endpoints) from application code.

What I added
- `user_config.example.json` — a single example JSON that maps common settings for backend and frontend. You can upload a modified version of this file to GitHub as a "general file" for a specific deployment (but DO NOT include secrets in a public repo).
- `backend/.env.example` — example environment file for the backend. Copy to `backend/.env` or set real values in your environment.
- `frontend/.env.example` — example Vite `.env` for frontend variables (must be prefixed with `VITE_`).

How this works
- Backend: `backend/app.py` now reads sensitive values from environment variables (via `os.getenv`). In development you can create `backend/.env` (copy `backend/.env.example`) and the app will load those values using `python-dotenv`.
- Frontend: `frontend` reads `VITE_` variables via `import.meta.env` (Vite). Set `VITE_API_URL` and `VITE_GEMINI_KEY` in `frontend/.env` or your deployment system.

Security note
- Never commit real API keys, phone numbers, or tokens to a public repository.
- Use GitHub Secrets, deployment platform secrets, or an encrypted vault for production deployments.

Recommended next steps
1. Copy `backend/.env.example` -> `backend/.env` and fill in real values locally (do not commit).
2. Copy `frontend/.env.example` -> `frontend/.env` and fill in real values locally (do not commit).
3. If you want a single file to upload to GitHub (as you mentioned), use `user_config.example.json` as the template; but replace sensitive values with placeholders before committing.

If you want, I can also wire a small script to generate `.env` files from a single JSON file (locally) — tell me whether you prefer that as plain JS/Python.
