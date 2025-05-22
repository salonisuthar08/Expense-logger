
const form = document.getElementById("expense-logger");
const expenselist = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");


let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

// Load existing expenses on page load
window.addEventListener('DOMContentLoaded', () => {
  expenses.forEach(addExpenseToList);
  updateTotal();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();

const description = document.getElementById("description").value;
const amount = parseFloat(document.getElementById("Amount").value);
const date = document.getElementById("date").value;
const category = document.getElementById("category").value;

if (!description || !amount || !date) return;

const expense = {
    id: Date.now(), // unique ID
    description,
    amount,
    category,
    date
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  addExpenseToList(expense);
  updateTotal();

/*total += amount;
  updateTotal();*/

  
  form.reset();
});

function addExpenseToList(expense) {
const listItem = document.createElement("li");
listItem.textContent = `${expense.description} - ₹${expense.amount.toFixed(2)} - ${expense.category} on ${expense.date}`;


  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.addEventListener("click", () => {
    listItem.remove();
    expenses = expenses.filter(e => e.id !== expense.id);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    updateTotal();
  });

  listItem.appendChild(deleteBtn);
  expenselist.appendChild(listItem);
}
  
function updateTotal() {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalDisplay.textContent = total.toFixed(2);
}



