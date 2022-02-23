
from flask import Flask, jsonify, render_template, request
import json

app = Flask(__name__)

@app.route("/sarauj", methods=['GET','POST'])
def index():
    vards = request.args.get('vards')
    rezult = request.args.get('punkti')
    speletajs = {"vards": vards,
                "punkti": rezult}
    with open("dati/speletajs.json", "w", encoding="utf-8") as f:
        f.write(json.dumps(speletajs, indent=2, ensure_ascii=False))
    return render_template('/index.html', vards=vards)

   

@app.route("/",  methods=["GET", "POST"])
def login():
    return render_template('/login.html')

@app.route("/top",  methods=["GET", "POST"])
def top():
    with open("dati/top.json", "r", encoding="utf-8") as f:
        top =json.loads(f.read())
        
        
    return render_template('/top.html', top=top)
    

if __name__ == "__main__":
    app.run(debug = True)

