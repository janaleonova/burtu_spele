
from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route("/sarauj", methods=['GET','POST'])
def index():
    vards = request.args.get('vards')
    speletajs = {"vards": vards}
    with open("dati/speletajs.json", "w", encoding="utf-8") as f:
        f.write(json.dumps(speletajs, indent=2, ensure_ascii=False))


    with open("dati/top.json", "r", encoding="utf-8") as f:
        dati = json.loads(f.read())
        
    return render_template('/index.html', vards=vards)

@app.route("/",  methods=["GET", "POST"])
def login():
    return render_template('/login.html')

@app.route("/top",  methods=["GET", "POST"])
def top():
    return render_template('/top.html')
    

if __name__ == "__main__":
    app.run(debug = True)

