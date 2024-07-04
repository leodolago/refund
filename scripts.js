// Seleciona os elementos do formulário.
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")
const form = document.querySelector("form")

// Seleciona os elementos da lista.
const expenseList = document.querySelector("ul")

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

    // Adiciona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo)
    // Adiciona o item na Lista
    expenseList.append(expenseItem)


  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas")
    console.log(error)
  }
}

