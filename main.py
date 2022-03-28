from importlib.resources import path
from pickle import TRUE
from flask import Flask, jsonify, render_template, request
import json

app = Flask(__name__)
rindas = [] 
global vards

@app.route("/",  methods=["GET", "POST"])
def login():
    return render_template('/login.html', title="login")

@app.route("/layout",  methods=["POST"])
def layout():
    vards = request.form.get('vards')
    vards=(f"{vards}")
    
    with open('dati/speletajs.json', 'w', encoding="utf-8") as f:
        f.write(json.dumps(vards, indent=2, ensure_ascii=False))
    return render_template('/layout.html', title="layout", vards=vards)


@app.route("/sakums",  methods=["GET", "POST"])
def sakums():
    with open('dati/speletajs.json', 'r', encoding="utf-8") as r:
        speletajaVards = r.read()
        vards = json.loads(speletajaVards)
    return render_template('/sakums.html', title="sākums", vards=vards)

@app.route("/help",  methods=["GET", "POST"])
def help():
    return render_template('/sakums.html' )

@app.route("/top",  methods=["GET", "POST"])
def top():
    return render_template('/top.html', title="top")

@app.route('/rezultati/<punktiTotal>/<rezultats>/<time>')
def spelesRezultats(punktiTotal, rezultats, time):
    with open('dati/speletajs.json', 'r', encoding="utf-8") as r:
        speletajaVards = r.read()
        rindas = json.loads(speletajaVards)
     
    rinda = {
        "vārds": speletajaVards,
        "kopejie punkti": punktiTotal,
        "atminētie vārdi ": rezultats,
        "atlikušais laiks": time
    }
   
    with open('dati/rezultati.json', 'r', encoding="utf-8") as r:
        vecie = r.read()
        rindas = json.loads(vecie)
  
        rindas.append(rinda)
    with open('dati/rezultati.json', 'w', encoding="utf-8") as f:
        f.write(json.dumps(rindas, indent=2, ensure_ascii=False))
    
    return "OK"
       
if __name__ == "__main__":
    app.run(debug = True)
# if __name__ == "__main__":
#     from waitress import serve
#     serve(app, host="0.0.0.0", port=8080)

