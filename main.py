
from importlib.resources import path
from flask import Flask, jsonify, render_template, request
import json

app = Flask(__name__)
speletaji = []

@app.route("/",  methods=["GET", "POST"])
def login():
    return render_template('/login.html')


@app.route('/form', methods=["POST"])
def form():
    vards = request.form.get('vards')
    speletaji.append(f"{vards}")
    title="Paldies!"
   
    return render_template("form.html", title=title, vards=vards, speletaji=speletaji)


@app.route("/sakums",  methods=["GET", "POST"])
def sakums():
    return render_template('/sakums.html', speletaji=speletaji)

@app.route("/help",  methods=["GET", "POST"])
def help():
    return render_template('/sakums.html' )


@app.route("/top",  methods=["GET", "POST"])
def top():
    jauns_speletajs = request.form.get('vards')
    with open("dati/top.json", "r", encoding="utf-8") as f:
        TOP =json.loads(f.read())
        
   
        
    return render_template('/top.html', TOP=TOP)


        
if __name__ == "__main__":
    app.run(debug = True)


