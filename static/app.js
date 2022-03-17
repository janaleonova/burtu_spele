
    
//sagatavo mainīgos un konstantes
const spelesLauks = document.querySelector('.spelesLauks');
const sunuLauks = document.querySelector('.sunuLauks');
const suna = document.querySelector('.suna');
const btn = document.createElement('button');
const ievadamieBurti = document.createElement('input');
const rezultatuTablo = document.querySelector('.score');
const burtuLauks = document.querySelector('.container2');
const dzesamaisLauks = document.createElement('div') 
var atveramieBurti=0;
ievadamieBurti.setAttribute('type','text');
ievadamieBurti.classList.add('tekstaIevade');
btn.textContent = "SĀKT SPĒLI!";
const spelesVardi = ["kaķis"];
const spele ={izveletaisVards:'', sajauktsVards:'',rezultats:0, nepareizi:0, atlikusieVardi:0, izspeles:spelesVardi.length};
spelesLauks.append(ievadamieBurti);
spelesLauks.append(btn);

rezultatuTablo.style.display="none";
ievadamieBurti.style.display = "none";
btn.style.display = 'none';  


//ielādē bišu šūnas pie lapas ielādes
window.onload = spelesLaukums();

function spelesLaukums(){
for (var s = 0; s < 22; s++) {
const lauks = document.createElement('div');
const container = document.querySelector('.S_container');
container.append(lauks);
lauks.classList.add('suna');
}
};
// ielasa vārdus no google sheets - https://docs.google.com/spreadsheets/d/1ilaxRabk_2VQPtNBkh9qzPYhp5lDCV4mq7YQEmUz-io/edit?usp=sharing 
const url ='https://docs.google.com/spreadsheets/d/';
const ssid = '1ilaxRabk_2VQPtNBkh9qzPYhp5lDCV4mq7YQEmUz-io';
const query1 =`/gviz/tq?`;
const endpoint1 = `${url}${ssid}${query1}`;

fetch(endpoint1)
.then(res=>res.text())
.then(data => {
  const temp = data.substring(47).slice(0,-2);
  const json = JSON.parse(temp);
  const rows = json.table.rows;
  rows.forEach((row) => {
  const temp1 = (row.c);
  const div = document.createElement('div');
    temp1.forEach((cell)=>{
        spelesVardi.push(cell.v);
    })    
  });
}) //beidzas vārdu ielasīšana masīvā no google


// spēles sākums un sākas laika skaitīšana, kad ielādējas spēle\\
const startingMinutes = 0.3;
let time = startingMinutes*60;
const ele = document.getElementById("time");
let interval = null;

function saktSpeli(){
jaunaVardaIelasisana();
saktLaikaAtskaiti();
}

function saktLaikaAtskaiti(){
interval = setInterval(laikaAtskaite,1000);
laikaAtskaite()
}

function laikaAtskaite(){
  if (time <= 0) {
        console.log(time);
        beigtSkaititLaiku();
    }
  console.log(time);
  time--;
  const minutes = Math.floor(time/60);
  const seconds =time % 60;
  ele.innerHTML=minutes+":"+formatTime(seconds);
}
function beigtSkaititLaiku(){
clearInterval(interval);
  interval=null;
      //countdown = duration;
      return spelesBeigas();
}
function formatTime(time){
  return time < 10 ? `0${time}` : time; 
}



//nākamā vārda ielāde un citu šūnu aizvēršana
btn.addEventListener('click',(e)=>{
jaunaVardaIelasisana(); 
});

//spēlētāju ievadīto burtu nolasīšana un sūtīšana uz pārbaudi
ievadamieBurti.addEventListener('keyup', (e)=>{
ievadamieBurti.style.borderColor = '#eee';
ievadamieBurti.style.borderWidth = '1px';
if (ievadamieBurti.value.length == spele.izveletaisVards.length || e.code == 'Enter'){
  vardaParbaude();
}
})

//attēlo rezultātu pēc vārda pārbaudes
function pievienotRezultatu(){
  let pagaiduIzvade = `Rezultāts: ${spele.rezultats}. Kļūdainie mēģinājumi ${spele.nepareizi}`;
  let punktiBezLaika = ((spele.rezultats*5)+spele.nepareizi);
 
  console.log(punktiBezLaika+'punkti un laiks'+time);
  rezultatuTablo.innerHTML = pagaiduIzvade;
  document.getElementById('punkti').innerHTML = punktiBezLaika;
  
}
// visu pārkopēju no js mapes, jo nestādāja kaut kā pēc pārnākšanas uz piton.. :( )
function burtuJauksana(orginalvards){
  let jauktsVards = orginalvards.split('');
  jauktsVards.sort(()=>{return 0.5 - Math.random()});  
  jauktsVards=jauktsVards.join('');
  if (orginalvards == jauktsVards){
      return burtuJauksana(orginalvards)
  }
  var b = jauktsVards; 
  var izmestieBurti=[]; 
  for (var z = 0; z < b.length; z++) {
      izmestieBurti.push(b.charAt(z)) 
      
      const burts = document.createElement('div');
      const burtaIeraksts = document.createElement('div');
      
      burtuLauks.append(burts);
      burts.append(burtaIeraksts);

      burtaIeraksts.classList.add('burtaLauks');
      burtaIeraksts.setAttribute('id','burtaIeraksts'+z);

      burts.classList.add('suna');
      
      burts.setAttribute('id','burts'+z);
      
      burtaIeraksts.textContent=(b.charAt(z));

      atveramieBurti++;
      
  }
  return jauktsVards; 
}

function jaunaVardaIelasisana(){
  x=atveramieBurti;  //parbauda, cik ir atvertas sūniņas
  for (var y = 0; y < x; y++) {
    document.getElementById("burts"+y).remove();
    atveramieBurti=0;
  }
  jaunsVards();
}

function spelesBeigas(){

let punktiRezultatam=parseInt(document.getElementById('punkti').innerHTML);
let punktiparLaiku=time;
let punktiTotal=punktiRezultatam+punktiparLaiku;
console.log('punkti rezultātam'+punktiRezultatam);
console.log('punkti par laiku'+punktiparLaiku);
spelesLauks.innerHTML=`<h2>SPĒLES BEIGAS </h2><br><br> Tu ieguvi `+punktiTotal+`punktus. <br><hr><br>Pievieci ${spele.rezultats} vārdus (par katru saņenot 5 punktus), <br>Pieļaujot ${spele.nepareizi} kļūdas (par katru zaudēji 1 punktu)<br> Atlikušais laiks:`+time+`(to pieskaitām )`;

}

function jaunsVards(){
  sunuLauks.style.display = "none";
  
  if(spelesVardi.length<=0){
    beigtSkaititLaiku();
     spelesBeigas();
      
  }else{
      ievadamieBurti.disabled = false;
      ievadamieBurti.value='';
      ievadamieBurti.style.borderWidth='1px';
      ievadamieBurti.style.borderColor="#eee";
      rezultatuTablo.style.display="block";
      ievadamieBurti.style.display = 'inline';
      btn.style.display = 'none';
      ievadamieBurti.focus();
      spelesVardi.sort(()=>{return 0.5 - Math.random()});
      spele.izveletaisVards= spelesVardi.shift();
      console.log(spelesVardi);
      spele.atlikusieVardi = spelesVardi.length;
      spele.sajauktsVards = burtuJauksana(spele.izveletaisVards);
      ievadamieBurti.setAttribute('maxlength', spele.izveletaisVards.length);
      spele.atlikusieVardi=spelesVardi.length;
  }
}


function vardaParbaude(){
  ievadamieBurti.style.borderWidth='5px';
  let parbaudamie =ievadamieBurti.value.toLowerCase();
 
  
  if(parbaudamie !== spele.izveletaisVards){
      ievadamieBurti.style.borderColor = 'red';
      ievadamieBurti.value = '';
      ievadamieBurti.focus();
      spele.nepareizi++;

     
  }else{
      ievadamieBurti.disabled = true;
      ievadamieBurti.style.borderColor='green';
      ievadamieBurti.disabled = true;
      btn.style.display='block';
      btn.textContent = 'Nākamais vārds';
      spele.rezultats++;
     // btn.focus();
  }
  pievienotRezultatu();
  
}

