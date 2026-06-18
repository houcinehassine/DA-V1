import http.server, socketserver, os

PORT = 8082
DIR  = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIR, **kwargs)
    def log_message(self, fmt, *args):
        pass  # suppress request logs

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    httpd.allow_reuse_address = True
    print(f"Serving {DIR} on http://localhost:{PORT}")
    httpd.serve_forever()
