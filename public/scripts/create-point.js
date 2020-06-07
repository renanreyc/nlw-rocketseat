
function populateUFs() { 
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
     //.then( () => { return res.json() }) //forma maior
    .then( res => res.json() )    
    .then( states => {

        for( const state of states ) {
            //ufSelect.innerHTML = ufSelect.innerHTML + `<option value="1">Valor</option>`  //forma maior
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")


    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" //limpando o campo
    citySelect.disabled = true //bloqueando novamente o campo

    fetch(url)
   .then( res => res.json() )    
   .then( cities => {

        for( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false
   } )
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)
    

//Ítens de coleta
//pegar todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}
//atualizar o campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

//hidden ~ itens selecionados
let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    
    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
  
    const itemId = itemLi.dataset.id


    //verificar se existem itens selecionados, se sim,
    //pegar os itens selecionados

    //const alreadySelected = selectedItems.findIndex( item => item == itemId) //versão reduzida
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId  //isso será true ou false
        return itemFound
    })

    //se já estiver selecionado,
    if( alreadySelected >= 0 ) {
        // tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
            //se não estiver selecionado, adicionar à seleção
            selectedItems.push(itemId)
    }
    console.log(selectedItems)

    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems


}

