function vardaParbaude(){
    ievadamieBurti.style.borderWidth='5px';
    if(ievadamieBurti.value == spele.izveletaisVards){
        ievadamieBurti.style.borderColor='green';
        spele.rezultats++;
        ievadamieBurti.disabled = true;
        btn.style.display='block';
        btn.textContent = 'Nākamais vārds';
     
       
    }else{
        ievadamieBurti.style.borderColor = 'red';
        ievadamieBurti.value = '';
        ievadamieBurti.focus();
        spele.nepareizi++;
    }
    pievienotRezultatu();
}