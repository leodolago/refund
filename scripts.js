// Seleciona os elementos do formulário.
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")
const expenseQuantity = document.querySelector("aside header p span")
const expenseTotal = document.querySelector("aside header h2")

amount.oninput = () => {
  // Obtém o valor atual do input e remove os caracteres não numéricos.
  let value = amount.value.replace(/\D/g, "")
  // Atualiza o valor do input.
  amount.value = formatcurrencyBRL(value)
}

function formatcurrencyBRL(value)  {
  // Tranforma o valor em centavos
  value = Number(value) / 100

  // Formata o valor no padrão BRL (Real Brasileiro)
  value = value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})

  return value
}

// Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
  // Previne o comportamento padrão de recarregar a página.
  event.preventDefault()

  // Cria um objeto com os detalhes da nova despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date(),
  }

  // Chama a função que ira adicionar o item na lista.
  expenseAdd(newExpense)
}

// Adiciona novo item na lista.
function expenseAdd(newExpense) {
  try {
    // Cria o elemento li para adicionar o item na lista.
    const expenseItem = document.createElement("li")
    expenseItem.classList.add("expense")

    // Cria o icone da categoria.
    const expenseIcon = document.createElement("img")
    expenseIcon.setAttribute("src", `./img/${newExpense.category_id}.svg`)
    expenseIcon.setAttribute("alt", newExpense.category_name)

    // Cria a info da despesa.
    const expenseInfo = document.createElement("div")
    expenseInfo.classList.add("expense-info")

    // Cria o nome da despesa.
    const expenseName = document.createElement("strong")
    expenseName.textContent = newExpense.expense

    // Cria a categoria da despesa.
    const expenseCategory = document.createElement("span")
    expenseCategory.textContent = newExpense.category_name

    // Adiciona nome e categoria na div das informações da despesa.
    expenseInfo.append(expenseName, expenseCategory)

    // Cria o valor da despesa.
    const expenseAmount = document.createElement("span")
    expenseAmount.classList.add("expense-amount")
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase().replace("R$", "")}`

    // Cria o icone de remover
    const removeIcon = document.createElement("img")
    removeIcon.classList.add("remove-icon")
    removeIcon.setAttribute("src", "./img/remove.svg")
    removeIcon.setAttribute("alt", "remover")

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
    // Adiciona o item na Lista
    expenseList.append(expenseItem)

    // Limpa o formulário
    formClear()

    // Atualiza os totais.
    updateTotals()

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}

// Atualiza totais.
function updateTotals() {
  try {
    // Recupera todos os itens da lista.
    const items = expenseList.children

    // Atualiza a quantidade de itens da lista.
    expenseQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`

    // Variavel para incrementar o total.
    let total = 0
    // Percore cada item da lista
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount")

      //Remover caracteres não numéricos e substituir a vírgula por ponto.
      let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",", ".")

      value = parseFloat(value)
      
      // Verifica se é um número válido.
      if(isNaN(value)) {
        return alert(
          "Não foi possível calcular o total. O valor não parece ser um número"
        )
      }   
     
     // Incrementa o valor total.
     total += Number(value)
    }

    // Cria a small para adicionar o R$
    symbolBRL = document.createElement("small")
    symbolBRL.textContent =  "R$"

    total = formatcurrencyBRL(total).toUpperCase().replace("R$", "")

    expenseTotal.innerHTML = ""
    expenseTotal.append(symbolBRL, total)

  } catch (error) {
    console.log(error)
    alert("Não foi possível atualizar os totais.")
  }
}

// Evento que captura o clique nos itens da lista.
expenseList.addEventListener("click", function (event) {
  // Verifica se o elemento clicado é o ícone de remover.
  if(event.target.classList.contains("remove-icon")){
    // Obtém a li pai do elemento clicado.
    const item = event.target.closest(".expense")

    // Remove o item.
    item.remove()
  }

  updateTotals()
})

function formClear() {
  expense.value = ""
  category.value = ""
  amount.value = ""

  expense.focus()
}

