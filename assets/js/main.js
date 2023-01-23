function main() {

const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', e => {
    if(e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function criaBotaoApagar(li) {
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = '🗑';
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Delete this task')
    li.insertAdjacentElement('beforeend', botaoApagar);
}

function criaBotaoDone(li) {
    const btnDone = document.createElement('input');
    btnDone.setAttribute('type', 'checkbox');
    btnDone.setAttribute('class', 'btn-done');
    li.insertAdjacentElement('afterbegin', btnDone);
}

function limpaInput() {
    inputTarefa.value = '';
    inputTarefa.focus();
}

function criaSpan() {
    const span = document.createElement('span');
    span.setAttribute('contenteditable', true);
    span.setAttribute('class', 'nome-tarefa');
    return span;
}

function criaTarefa(textoInput) {
    const li = criaLi();
    const span = criaSpan();
    span.innerText = textoInput;
    li.appendChild(span);
    tarefas.appendChild(li);
    limpaInput();
    criaBotaoDone(li);
    criaBotaoApagar(li);
    salvarTarefas();
}

btnTarefa.addEventListener('click', function() {
    if (!inputTarefa.value) return;
    criaTarefa(inputTarefa.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;

    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        salvarTarefas();
    }
});

document.addEventListener('change', function(e) {
    const btn = e.target;
    const el = btn.nextSibling;

    if(btn.checked) {
            el.classList.add('task-done');
            salvarTarefas();
            salvarChecked();
        } else {
            el.classList.remove('task-done');
            salvarTarefas();
            salvarChecked();
        }
});

function salvarChecked() {
    const btnsChange = tarefas.querySelectorAll('input');
    const listaDeBtns = [];

    for(let btn of btnsChange) {
        let checkeds = btn.checked;
        listaDeBtns.push(checkeds);
    }

    const checkedJSON = JSON.stringify(listaDeBtns);
    localStorage.setItem('checked', checkedJSON);
}

function salvarTarefas() {
    const ulTarefas = document.querySelector('.tarefas');
    const listaDeTarefas = [];
    let tarefaHTML = ulTarefas.innerHTML;
    listaDeTarefas.push(tarefaHTML);
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}


function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    const ulTarefas = document.querySelector('.tarefas');
    ulTarefas.innerHTML = listaDeTarefas;

    const btnsChecked = localStorage.getItem('checked');
    const checkedList = JSON.parse(btnsChecked);
    const checkboxInput = document.querySelectorAll('.btn-done');
    
    for(let btn of checkboxInput) {
        btn.checked = checkedList.shift();
    }
}

adicionaTarefasSalvas();
}

main();