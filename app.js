const filmovi=[
    {
        "odgledan":true,
        "naziv":"Inception",
        "godina":2010,
        "drzava":"USA",
        "napomena":"Akcioni triler",
        "glumci":["Leonardo DiCaprio","Joseph Gordon-Levitt","Tom Hardy"]
    },
    {
        "odgledan":false,
        "naziv":"The tourist",
        "godina":2010,
        "drzava":"USA",
        "napomena":"",
        "glumci":["Johhny Depp","Angelina Jolie"]
    },
    {
        "odgledan":false,
        "naziv":"The Hangover",
        "godina":2009,
        "drzava":"USA",
        "napomena":"",
        "glumci":["Bradley Cooper","Ed Helms","Zach Galifianakis","Todd Philips"]
    }
];


function prikaziFilmove(){
    let moviesTableBody=document.getElementById('moviesTableBody');
    let moviesNiz=[];
    filmovi.forEach((film,index)=>{
        let glumci='';
        for(let i=0;i<film.glumci.length-1;i++){
            glumci+=`${film.glumci[i]}, `;
        }
        glumci+=`${film.glumci[film.glumci.length-1]}`;
        let row=`<tr style="background-color:#F8D7DA;" id='film_${index}'>
                    <td><label for='odgledan_${index}'><input type="checkbox" id='odgledan_${index}' onclick='promijeniCheck("film_${index}","odgledan_${index}",${index})'>DA</label></td>
                    <td>${film.naziv}</td>
                    <td>${film.godina}</td>
                    <td>${film.drzava}</td>
                    <td>${film.napomena}</td>
                    <td>${glumci}</td>
                </tr>`;
        moviesNiz.push(row);
    });
    moviesTableBody.innerHTML=moviesNiz.join('');
    provjeriCheck();
}


function promijeniCheck(film,odgledan,index){
    if(document.getElementById(odgledan).checked==true){
        document.getElementById(film).style.backgroundColor='#D1E7DD';
        filmovi[index].odgledan=true;
    }else{
        document.getElementById(film).style.backgroundColor='#F8D7DA';
        filmovi[index].odgledan=false;
    }   
}

function provjeriCheck(){
    filmovi.forEach((film,index)=>{
        if(film.odgledan==true){
            document.getElementById(`film_${index}`).style.backgroundColor='#D1E7DD';
            document.getElementById(`odgledan_${index}`).checked=true;
        }else{
            document.getElementById(`film_${index}`).style.backgroundColor='#F8D7DA';
            document.getElementById(`odgledan_${index}`).checked=false;
        }
    });
}


function uzmiInpute(){
    let odgledanDA=document.getElementById('noviFilmOdgledanDA');
    let odgledanNE=document.getElementById('noviFilmOdgledanNE');
    let odgledan;
    if(odgledanDA.checked==true){
        odgledanNE.checked=false;
        odgledan=true;
    }else{
        odgledanDA.checked=false;
        odgledan=false;
    }
    let naziv=document.getElementById('noviFilmNaziv').value;
    let godina=document.getElementById('noviFilmGodina').value;
    let drzava=document.getElementById('noviFilmDrzava').value;
    let napomena=document.getElementById('noviFilmNapomena').value;
    let glumci=document.getElementById('noviFilmGlumci').value.split(',');
    document.getElementById('noviFilmNaziv').classList.remove('border-danger');
    document.getElementById('noviFilmGlumci').classList.remove('border-danger');
    return {
        odgledan:odgledan,
        naziv:naziv,
        godina:godina,
        drzava:drzava,
        napomena:napomena,
        glumci:glumci
    };
}

function provjeriRequired(){
    if(document.getElementById('noviFilmNaziv').value==''){
        document.getElementById('noviFilmNaziv').placeholder="Morate unijeti naziv filma"
        document.getElementById('noviFilmNaziv').classList.add('border-danger');
        return false;
    }else if(glumci=document.getElementById('noviFilmGlumci').value==''){
        glumci=document.getElementById('noviFilmGlumci').placeholder='Morate unijeti makar jednog glumca';
        glumci=document.getElementById('noviFilmGlumci').classList.add('border-danger');
        return false;
    }else{
        return true;
    }
}

function ukloniInpute(){
    let inputi=document.querySelectorAll('.noviFilmInput');
    // for (let i=0;i<inputi.length;i++) {
    //     let input=inputi[i];
    //     input.value='';
        
    // }
    for(let i of inputi){
        i.value='';
    }
    document.getElementById('noviFilmOdgledanDA').checked=false;
    document.getElementById('noviFilmOdgledanNE').checked=true;
}


function dodajFilm(){
    if(provjeriRequired()){
        let noviFilm=uzmiInpute();
        filmovi.push(noviFilm);
        prikaziFilmove();
        provjeriCheck();
        ukloniInpute();
    }
}

document.getElementById('dodajFilmDugme').addEventListener('click',dodajFilm);

prikaziFilmove();