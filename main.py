from importlib.resources import path
from flask import Flask, jsonify, render_template, request
import json

app = Flask(__name__)
speletaji = []
rindas = []

@app.route("/",  methods=["GET", "POST"])
def login():
    return render_template('/login.html', title="login")


@app.route('/form', methods=["POST"])
def form():
    vards = request.form.get('vards')
    speletaji.append(f"{vards}")
    title="Paldies!"
    with open('dati/chats.json', 'w', encoding="utf-8") as f:
        f.write(json.dumps(vards, indent=2, ensure_ascii=False))
        
    return render_template("form.html", title=title, vards=vards, speletaji=speletaji)


@app.route("/sakums",  methods=["GET", "POST"])
def sakums():
 
    return render_template('/sakums.html', speletaji=speletaji, title="sākums")

@app.route("/help",  methods=["GET", "POST"])
def help():
    return render_template('/sakums.html' )

@app.route("/layout",  methods=["GET", "POST"])
def layout():
    return render_template('/layout.html', title="layout")

@app.route("/spele",  methods=["GET", "POST"])
def spele():
    return render_template('/spele.html', title="spele")

@app.route("/top",  methods=["GET", "POST"])
def top():
    return render_template('/top.html', title="top")

@app.route('/rezultati/<rezultats>/<time>')
def spelesRezultats(rezultats, time):
    #vards = request.form.get('vards')
    #punkti = {'rezultats'}
    rinda = {
      "kopejie punkti": rezultats,
      "atlikušais laiks": time
    }
   
    rindas.append(rinda)
  
    with open('dati/chats.json', 'w', encoding="utf-8") as f:
        f.write(json.dumps(rindas, indent=2, ensure_ascii=False))
    
    return "OK"

# @app.route('/sutit/<vards>/<zina>')
# def sutit(vards, zina):
#   tagad = datetime.now()
#   laiks = tagad.strftime("%Y/%m/%d, %H:%M:%S")

  # "/sutit/Anna/Labrīt visiem!"
#   rinda = {
#       "zina": zina,
#       "vards": vards,
#       "laiks": laiks
#   }
#   with open('dati/chats.json', 'r', encoding="utf-8") as r:
#     vecie = r.read()
#     rindas = json.loads(vecie)

#   if vards == "Serveris":
#     rinda["vards"] = "Blēdis"
  
#   if zina == "!stats":
#     chata_garums = len(rindas)
#     rinda["zina"] = "Čatā ir " + str(chata_garums) + " ieraksti."
#     rinda["vards"] = "Serveris"
#   elif zina == "!joks":

    # dati = requests.get("https://api.chucknorris.io/jokes/random")
    # print(dati)
    # try:
    #   joks = dati.json()["value"]
    #   rinda["vards"] = "Serveris"
    #   rinda["zina"] = joks
    # except:
    #   print(dati.status_code)
    #   return "Nope"
      
#   rindas.append(rinda)
  
#   with open('dati/chats.json', 'w', encoding="utf-8") as f:
#     f.write(json.dumps(rindas, indent=2, ensure_ascii=False))
    
#   return "OK"
       
if __name__ == "__main__":
    app.run(debug = True)

# if __name__ == "__main__":
#   from waitress import serve
#   serve(app, host="0.0.0.0", port=8080)

