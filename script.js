const body = document.body;
const colorButtons = document.querySelectorAll('.color-btn:not(.random-btn)');
const randomButton = document.getElementById('randomColor');
const todoInput = document.getElementById('todoInput');
const addButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const totalSpan = document.getElementById('totalCount');
const completedSpan = document.getElementById('completedCount');

colorButtons.forEach(button => {
    button.addEventListener('click', function() {
        const color = this.dataset.color;
        body.style.backgroundColor = color;
    });
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

randomButton.addEventListener('click', function() {
    const randomColor = getRandomColor();
    body.style.backgroundColor = randomColor;
});

let todos = [];

function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        alert('Please enter a task!');
        return;
    }

    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };

    todos.push(todo);
    renderTodos();
    todoInput.value = '';
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
    renderTodos();
}

function updateStats() {
    const total = todos.length;
    const completed = todos.filter(todo => todo.completed).length;
    
    totalSpan.textContent = total;
    completedSpan.textContent = completed;
}


function renderTodos() {
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', todo.id);
        
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'todo-checkbox';
        checkbox.checked = todo.completed;
        
        
        const span = document.createElement('span');
        span.textContent = todo.text;
        
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        
        
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        
        todoList.appendChild(li);
    });
    
    updateStats();
}

addButton.addEventListener('click', addTodo);

todoInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});
const sampleTodos = [
    { id: 1, text: 'Learn DOM manipulation', completed: false },
    { id: 2, text: 'Build a fun project', completed: true },
    { id: 3, text: 'Practice JavaScript', completed: false }
];

todos = sampleTodos;
renderTodos();