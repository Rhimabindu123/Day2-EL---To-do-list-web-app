const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const countSpan = document.getElementById('count');
const clearBtn = document.getElementById('clear-completed');

let todos = [];

function render() {
  list.innerHTML = '';

  todos.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = 'todo-item';

    const span = document.createElement('span');
    span.className = 'task-text' + (t.done ? ' completed' : '');
    span.textContent = t.text;
    span.addEventListener('click', () => toggleDone(idx));

    const remove = document.createElement('button');
    remove.className = 'remove-btn';
    remove.textContent = '✕';
    remove.addEventListener('click', () => removeTodo(idx));

    li.appendChild(span);
    li.appendChild(remove);
    list.appendChild(li);
  });

  updateCount();
}

function updateCount() {
  const remaining = todos.filter(t => !t.done).length;
  countSpan.textContent = `${remaining} item${remaining !== 1 ? 's' : ''} remaining`;
}

function addTodo(text) {
  const trimmed = text.trim();
  if (!trimmed) return;
  todos.unshift({ text: trimmed, done: false });
  render();
}

function toggleDone(index) {
  todos[index].done = !todos[index].done;
  render();
}

function removeTodo(index) {
  todos.splice(index, 1);
  render();
}

form.addEventListener('submit', e => {
  e.preventDefault();
  addTodo(input.value);
  input.value = '';
  input.focus();
});

clearBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.done);
  render();
});

// Sample tasks
todos = [
  { text: 'Learn DOM manipulation', done: false },
  { text: 'Build a To-Do app', done: true }
];

render();
