//Modal window open/close function
function toggleModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    modal.classList.toggle('hide');
    modal.classList.toggle('show');
    if (modal.classList.contains('show')) {
        document.body.style.overflow = 'hidden'; //unscroll window while modal is on
    } else {
        document.body.style.overflow = ''; //default value
    }

    if (modalTimer) {
        clearInterval(modalTimer); //to stop setTimeout after first opening of modal
    }
    
}


// Shows modal with status messages
function showStatusModal(modalSelector, message, modalTimer) {
    const prevModalDialog = document.querySelector('.modal__dialog'),
        modal = document.querySelector(modalSelector);
    
    prevModalDialog.classList.add('hide');

    if (modal.classList.contains('hide')) {
        //opens modal on the page to show status message (when form was filled directly on the page without modal) 
        toggleModal(modal, modalTimer);
    }

    const thanksModalDialog = document.createElement('div');
    thanksModalDialog.classList.add('modal__dialog');
    thanksModalDialog.innerHTML = `
    <div class="modal__content">
        <div data-modal="close" class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
    </div>
    `;
    modal.append(thanksModalDialog);

    setTimeout( () => {
        thanksModalDialog.remove();
        prevModalDialog.classList.remove('hide');
        prevModalDialog.classList.add('show');
        if (modal.classList.contains('show')) {
            //closes modal if user hasn't clicked x-button himself
            toggleModal(modalSelector);
        }
    }, 4000); //returns previous modal after 4s
}


// General modal function
function modal(modalSelector, modalButtonSelector, modalTimer) {
    //variables
    const openModalButtons = document.querySelectorAll(modalButtonSelector),
        modal = document.querySelector(modalSelector);

    openModalButtons.forEach(btn => {
        btn.addEventListener('click', () => toggleModal(modalSelector, modalTimer));
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-modal') == 'close') { 
            //clicking on a background of modal or x-button to close modal
            toggleModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { //pressing Esc when modal is open
            toggleModal(modalSelector);
        }
    });

    const openModalByScroll = () => { //opens modal when page is scrolled to its bottom
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            toggleModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', openModalByScroll); //not to open every time at the bottom
        }
    };

    window.addEventListener('scroll', openModalByScroll);
}


export default modal;
export {toggleModal, showStatusModal};