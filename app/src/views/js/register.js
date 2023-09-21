let error = document.querySelector('#text-error');
let username = document.querySelector('#txtUsername');
let name = document.querySelector('#txtName');
let email = document.querySelector('#txtEmail');
let password = document.querySelector('#txtPassword');

let btnRegister = document.querySelector('#btnRegister');

btnRegister.addEventListener('click', () => {
    validateInputs();
});

const formSubmit = (event) => {
    event.preventDefault();
    register();
    return false;
}

const register = () => {
    if (!(username.value == '' || name.value == '' || email.value == '' || password.value == '')) {
        const data = {
            username: username.value,
            name: name.value,
            email: email.value,
            password: password.value
        };

        window.ipcRender.send('register', data);
        
        window.location.href = 'login.html';
    }
}


// Función modificada para manejar errores y mensajes de éxito
const showMessage = (message, isError = true) => {
    error.innerHTML = message;
    if (isError) {
        error.classList.remove('text-muted');
        error.classList.add('text-danger');
    } else {
        error.classList.remove('text-danger');
        error.classList.add('text-muted'); // O algún otro estilo que represente un mensaje positivo
    }

    username.value = '';
    name.value = '';
    email.value = '';
    password.value = '';
    username.focus();
}

const validateInputs = () => {
    if (username.value == '') {
        showMessage('Ingresá tú nombre de usuario.');
    } else if (name.value == '') {
        showMessage('Ingresá tú nombre.');
    } else if (email.value == '') {
        showMessage('Ingresá tú dirección de correo electrónico.');
    } else if (password.value == '') {
        showMessage('Ingresá tú contraseña.');
    }
}

// Listener para el evento 'register-response'
window.ipcRender.on('register-response', (event, response) => {
    // Mostrar un mensaje basado en la respuesta del proceso principal
    showMessage(response.message, !response.success);
});