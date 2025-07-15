document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-tarea');
    const input = document.getElementById('input-tarea');
    const lista = document.getElementById('lista-tareas');

    const tareasGuardadas = JSON.parse(localStorage.getItem('tareas')) || [];

    tareasGuardadas.forEach(tarea => {
        crearTarea(tarea.texto, tarea.hecha);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const textoTarea = input.value.trim();
        if (textoTarea === '') return;

        crearTarea(textoTarea, false);
        input.value = '';
    });

    function crearTarea(texto, hecha) {
        const li = document.createElement('li');

        const spanTexto = document.createElement('span');
        spanTexto.textContent = texto;
        li.appendChild(spanTexto);

        if (hecha) li.classList.add('hecha');

        const btnHecha = document.createElement('button');
        btnHecha.innerHTML = '<img src="img/check.png" alt="Hecha" width="18">';
        btnHecha.className = 'btn-hecha';
        btnHecha.addEventListener('click', () => {
            li.classList.toggle('hecha');
            guardarTareas();
        });

        const btnBorrar = document.createElement('button');
        btnBorrar.innerHTML = '<img src="img/tacho-de-reciclaje.png" alt="Borrar" width="18">';
        btnBorrar.className = 'btn-hecha';
        btnBorrar.addEventListener('click', () => {
            li.classList.add('borrando');
            setTimeout(() => {
                li.remove();
                guardarTareas();
            }, 6000);
        });

        li.appendChild(btnHecha);
        li.appendChild(btnBorrar);

        lista.appendChild(li);
        guardarTareas();
    }

    function guardarTareas() {
        const tareas = [];
        lista.querySelectorAll('li').forEach(li => {
            const texto = li.querySelector('span')?.textContent || '';
            const hecha = li.classList.contains('hecha');
            tareas.push({texto, hecha});
            });

        localStorage.setItem('tareas', JSON.stringify(tareas));
    }
});