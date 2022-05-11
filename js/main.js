const search = document.getElementById('search')
const matchList = document.getElementById('match-list') // aici o sa fie output ul datelor


// ========== Search states.json and filter it 
const searchStates = async searchText => {
    const res = await fetch('../data/states.json')
    const states = await res.json()

    // console.log(states) // primim toate datele din fila json

// ========== Get matches to current text input 
    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi')// ^ mean start with, searchText e orice text pus de noi in input
        // 'gi inseamna ca o sa mearga si cu litera mica si cu litera mare'
        return state.name.match(regex) || state.abbr.match(regex)

    }) // returneaza un array bazat pe conditii


// ==========  Cream o conditie  astfel incat daca nu avem nimic scris in input sa nu se afiseze nimic
    if(searchText.length===0) {
        matches = []
        matchList.innerHTML= ''
    }

    console.log(matches)// primim in consola doar acele rezultate care incep cu litera pe care oscriem noi

    outputHtml(matches)
}

// ========== Cream o functie care sa ni le afiseze in html

const outputHtml = matches => {
    if(matches.length > 0) {
        const html = matches.map( match => `
        <div>
            <h4>${match.name}  (${match.abbr}) 
                <span>${match.capital}</span>
            </h4>
            <small> Lat: ${match.lat} / Long: ${match.long}</small>
        </div>
        `).join('')
    //console.log(html)// obtinem string-ul de html in consola
    matchList.innerHTML = html
    }
}

/////// avem nevoie de un event ca de fiecare data cand scriem in input box sa se activeze o functie

search.addEventListener('input', () => searchStates(search.value))

