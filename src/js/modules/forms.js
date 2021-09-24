import {showStatusModal} from './modal.js';
import {postData} from '../services/services.js';

function forms(formSelector, modalSelector, modalTimer) {
    //variables
    const forms = document.querySelectorAll(formSelector);
    
    //Sending forms to server via Fetch API and showing status messages to user
    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        fail: 'Что-то пошло не так...'
    };

    forms.forEach(form => { //для каждой формы вызываем функцию bindPostData
        bindPostData(form);
    });
    
    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); //убираем стандартное поведение браузера при отправке формы

            //создаем блок для значка загрузки
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                padding-top: 10px;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage); //выводим блок в конце формы

            const formData = new FormData(form); //переформатируем данные формы в FormData
            const json = JSON.stringify(Object.fromEntries(formData.entries())); //formData переводим в формат JSON

            postData('http://localhost:3000/requests', json)
            .then(data => { //действия при успешности запроса
                console.log(data); //показываем полученный от сервера ответ для проверки
                statusMessage.remove();
                showStatusModal(modalSelector, message.success, modalTimer);
            })
            .catch(() => { //действия при неуспешности запроса
                showStatusModal(modalSelector, message.fail, modalTimer);
            })
            .finally(() => { //действия при любом исходе запроса
                form.reset(); //очистка формы на странице
            });

        });
    }
}

export default forms;