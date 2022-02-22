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