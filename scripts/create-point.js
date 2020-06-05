function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome")
  .then(res => res.json() )
  .then( states => {

    for (state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}

populateUFs()

function getCities(event) {
  const citySelect = document.querySelector("[name=city]")
  const stateInput = document.querySelector("[name=state]")

  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  // Ao escolher um novo estado, limpar o select de cidades, pois ao trocar de estado
  // estava mantendo as cidades do estado anterior em cache
  citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
  citySelect.disabled = true

  fetch(url)
    .then(res => res.json())
    .then(cities => {

      for ( const city of cities) {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
      }
      
      citySelect.disabled = false;

    })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities);

// Itens de coleta
// Todos os li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target
  // add or remove a class
  itemLi.classList.toggle("selected")

  const itemId = event.target.dataset.id

  
  // Check item selected
  // Get selected items
  // const alreadySelected = selectedItems.findIndex(item => item == itemId)
  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId
    return itemFound
  })

  console.log(alreadySelected)

  //If selected, unselect it
  if(alreadySelected >= 0) {
    // remove from selectdItems
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })

    selectedItems = filteredItems
  } else {
    // If unselected, add it to array
    selectedItems.push(itemId)

  }
  
  // Update hidden field with selected items
  collectedItems.value = selectedItems

  console.log(selectedItems)

}