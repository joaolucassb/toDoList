function main() {

const inputTarefa = document.querySelector('.input-tarefa');
const btnTarefa = document.querySelector('.btn-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}

inputTarefa.addEventListener('keypress', function(e) {
    if(e.keyCode === 13) {
        if (!inputTarefa.value) return;
        criaTarefa(inputTarefa.value);
    }
});

function criaBotaoApagar(li) {
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Delete';
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
        } else {
            el.classList.remove('task-done');
            salvarTarefas();
        }
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for(let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Delete', '').trim();
        listaDeTarefas.push(tarefaTexto);
    }

    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}

adicionaTarefasSalvas();

}

main();