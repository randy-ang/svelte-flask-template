import json
import os
from flask import Flask, send_from_directory, render_template, request
from werkzeug.exceptions import HTTPException, NotFound
from src.server.api.v1.routes import api as api_routes
from src.server.renderer import render_ssr
from src.server.utils.RegexConverter import RegexConverter
from dotenv import load_dotenv

load_dotenv('./.env')
DEV=os.getenv("DEV", False)

template_dir = os.path.abspath('./dist')
app = Flask(__name__, template_folder=template_dir)
app.url_map.converters['regex'] = RegexConverter
app.register_blueprint(api_routes, url_prefix='/api/v1')

# Path for all the static files (compiled JS/CSS, etc.)
@app.route('/<regex("(.*)\.(.+)"):filename>')
def serve_static(filename):
    return send_from_directory('../dist', filename)

@app.route('/', defaults={'url': ''})
@app.route('/<path:url>')
def render_svelte_app(url):
    processed_ssr = render_ssr(url)
    return render_template('index.html', **processed_ssr)

@app.errorhandler(NotFound)
def not_found_handler(err: NotFound):
    return render_svelte_app(request.path), err.code

@app.errorhandler(HTTPException)
def handle_exception(e: HTTPException):
    """Return JSON instead of HTML for HTTP errors."""
    # start with the correct headers and status code from the error
    response = e.get_response()
    # replace the body with JSON
    response.data = json.dumps({
        "code": e.code,
        "name": e.name,
        "description": e.description,
    })
    response.content_type = "application/json"
    return response

if __name__ == "__main__":
    app.run(debug=DEV)
