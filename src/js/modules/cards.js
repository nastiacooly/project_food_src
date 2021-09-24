import {getResource} from '../services/services.js';

function cards() {
    //Class for menu items and rendering with GET-requests
    class MenuItem {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes; //через Rest-оператор, чтобы в будущем передавать неограниченное число классов
            this.parent = document.querySelector(parentSelector);
            this.transfer = 74;
            this.changeToRUB();
        }

        changeToRUB() {
            this.price = this.price * this.transfer;
        }

        render() { //метод для создания верстки экземпляра класса
            const menuItemElement = document.createElement('div');

            if (this.classes.length === 0) { //this.classes=[] (из-за Rest-оператора), если ничего не передано
                this.classes = 'menu__item';
                menuItemElement.classList.add(this.classes);
                //добавляем CSS-класс по умолчанию, если через JS-класс они не будут переданы
            } else {
                this.classes.forEach(className => menuItemElement.classList.add(className)); 
                //добавляем переданные через JS-класс CSS-классы элементу
            }
            
            menuItemElement.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                    </div>
            `;
            this.parent.append(menuItemElement); //добавляем верстку внутрь родителя
        }
    }

    getResource('http://localhost:3000/menu') //получаем данные с JSON-сервера про меню
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => { //деструктурируем объекты из массива menu db.json
            new MenuItem( //передаем классу в качестве аргументов ключи объектов menu db.json
                img, 
                altimg, 
                title, 
                descr, 
                price, 
                ".menu__field > .container"
            ).render(); //метод класса для верстки
        }); //можно также создавать верстку не через класс, а через обычные команды, которые мы прописали в render()
    });

    /* axios.get('http://localhost:3000/menu') //get-запрос при помощи библиотеки axios
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) => {
            new MenuItem(
                img, 
                altimg, 
                title, 
                descr, 
                price, 
                ".menu__field > .container"
            ).render();
        });
    }); */
}

export default cards;