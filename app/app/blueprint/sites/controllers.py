from flask import Blueprint, render_template

sites = Blueprint(
    "sites", __name__, template_folder="templates", static_folder="static"
)

@sites.route('/', defaults={'path': ''})
@sites.route('/<path:path>')
def index(path):
    return render_template('generate.html')
