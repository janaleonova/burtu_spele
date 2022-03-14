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