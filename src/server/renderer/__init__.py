import json
import subprocess
from pathlib import Path

def render_ssr(url):
    props = json.dumps({'url': url})
    p = subprocess.Popen(['node', Path(__file__).parent / "svelte_ssr.js"], stdout=subprocess.PIPE, stdin=subprocess.PIPE)
    stdout_data = p.communicate(input=str.encode(props))[0]
    return json.loads(stdout_data.decode())