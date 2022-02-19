function sunuAizversana(){
    x=atveramieBurti;
    for (var y = 0; y < x; y++) {
      document.getElementById("burts"+y).remove();
      atveramieBurti=0;
    }
    jaunsVards();
  }
  
function jaunsVards(){
    sunuLauks.style.display = "none";
    
    if(spelesVardi.length<=0){
        spelesLauks.innerHTML="<div>Spēles beigas</div>"
        spelesLauks.innerHTML+=`Tu ieguvi ${spele.rezultats}, kļūdījies ${spele.nepareizi}!`;
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

        pievienotRezultatu();
        ievadamieBurti.setAttribute('maxlength', spele.izveletaisVards.length);
        spele.atlikusieVardi=spelesVardi.length;
    }
}

