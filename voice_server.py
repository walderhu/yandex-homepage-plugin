#!/usr/bin/env python3
import json
import os
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

HOST = "127.0.0.1"
PORT = 8765
GROQ_TRANSCRIPTION_URL = "https://api.groq.com/openai/v1/audio/transcriptions"
MAX_AUDIO_BODY_SIZE = 30 * 1024 * 1024


def load_env(path: Path) -> None:
    if not path.exists():
        return

    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip("\"'"))


load_env(Path(__file__).with_name(".env"))


class VoiceHandler(BaseHTTPRequestHandler):
    def end_headers(self) -> None:
        origin = self.headers.get("Origin", "")
        if self.is_allowed_origin(origin):
            self.send_header("Access-Control-Allow-Origin", origin)
            self.send_header("Vary", "Origin")
        super().end_headers()

    def do_OPTIONS(self) -> None:
        if not self.is_allowed_origin(self.headers.get("Origin", "")):
            self.send_json(403, {"message": "Откройте страницу из расширения или localhost-preview."})
            return

        self.send_response(204)
        self.send_header("Access-Control-Allow-Methods", "POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        if self.headers.get("Access-Control-Request-Private-Network") == "true":
            self.send_header("Access-Control-Allow-Private-Network", "true")
        self.end_headers()

    def do_GET(self) -> None:
        if self.path != "/health":
            self.send_json(404, {"message": "Not found."})
            return
        self.send_json(200, {"ok": True, "groqKeyConfigured": bool(os.getenv("GROQ_API_KEY"))})

    def do_POST(self) -> None:
        if self.path != "/transcribe":
            self.send_json(404, {"message": "Not found."})
            return

        origin = self.headers.get("Origin", "")
        if origin and not self.is_allowed_origin(origin):
            self.send_json(403, {"message": "Откройте страницу из расширения или localhost-preview."})
            return

        api_key = os.getenv("GROQ_API_KEY", "").strip()
        if not api_key:
            self.send_json(500, {"message": "В .env не настроен GROQ_API_KEY."})
            return

        try:
            length = int(self.headers.get("Content-Length", "0"))
        except ValueError:
            self.send_json(400, {"message": "Некорректная длина аудиозаписи."})
            return

        if length <= 0 or length > MAX_AUDIO_BODY_SIZE:
            self.send_json(413, {"message": "Аудиозапись отсутствует или слишком большая."})
            return

        content_type = self.headers.get("Content-Type", "")
        if not content_type.startswith("multipart/form-data;"):
            self.send_json(400, {"message": "Ожидается аудиофайл в multipart/form-data."})
            return

        body = self.rfile.read(length)
        request = Request(
            GROQ_TRANSCRIPTION_URL,
            data=body,
            method="POST",
            headers={
                "Authorization": f"Bearer {api_key}",
                "Accept": "application/json",
                "Content-Type": content_type,
                "Content-Length": str(len(body)),
                "User-Agent": "WalderhuVoice/1.0",
            },
        )
        try:
            with urlopen(request, timeout=120) as response:
                result = response.read()
                self.send_response(response.status)
                self.send_header("Content-Type", response.headers.get("Content-Type", "application/json"))
                self.send_header("Content-Length", str(len(result)))
                self.end_headers()
                self.wfile.write(result)
        except HTTPError as error:
            detail = error.read().decode("utf-8", "replace")
            self.send_json(error.code, {"message": f"Groq не распознал запись: {detail}"})
        except URLError as error:
            self.send_json(502, {"message": f"Не удалось связаться с Groq: {error.reason}"})

    def log_message(self, fmt: str, *args: object) -> None:
        print(f"[voice] {self.address_string()} {fmt % args}")

    @staticmethod
    def is_allowed_origin(origin: str) -> bool:
        return (
            origin.startswith(("chrome-extension://", "moz-extension://"))
            or origin in ("http://127.0.0.1", "http://localhost")
            or origin.startswith(("http://127.0.0.1:", "http://localhost:"))
        )

    def send_json(self, status: int, payload: dict) -> None:
        data = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)


class VoiceServer(ThreadingHTTPServer):
    allow_reuse_address = True


if __name__ == "__main__":
    server = VoiceServer((HOST, PORT), VoiceHandler)
    print(f"Voice transcription server listening on http://{HOST}:{PORT}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
