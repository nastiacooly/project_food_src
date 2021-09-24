function calc() {
    //variables
    const calcResult = document.querySelector('.calculating__result span');

    // Calculator
    let sex, height, weight, age, ratio, formula;
    let previousGenderChoice = localStorage.getItem('gender');
    let previousRatioChoice = localStorage.getItem('ratio');

    if (previousGenderChoice) {
        sex = previousGenderChoice;
    }

    if (previousRatioChoice) {
        ratio = previousRatioChoice;
    }

    function highlightStoredInputs(parentSelector, activeClass) {
        const parent = document.querySelector(parentSelector);
        // adding active class for inputs stored in local storage
        if (previousGenderChoice && parentSelector === "#gender") {
            let input = parent.querySelector(`#${previousGenderChoice}`);
            input.classList.add(activeClass);
        }

        if (previousRatioChoice && parentSelector === "#activity") {
            let input = parent.querySelector(`[data-ratio="${previousRatioChoice}"]`);
            input.classList.add(activeClass);
        }
    }

    highlightStoredInputs('#gender', 'calculating__choose-item_active');
    highlightStoredInputs('#activity', 'calculating__choose-item_active');


    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            // if user did not fill any of the required inputs, calculation cannot be performed
            calcResult.textContent = "____";
            return;
        }

        if (sex === "female") {
            formula = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
        } else if (sex === "male") {
            formula = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
        }

        // calculating result and rendering to DOM
        calcResult.textContent = Math.ceil((formula) * ratio);
    }

    calcTotal();


    function getStaticInputsData(parentSelector, activeClass) {
        const parent = document.querySelector(parentSelector);
        const staticInputs = parent.querySelectorAll('div');
        
        parent.addEventListener('click', (e) => {
            if (e.target === parent) {
                // clicking on a parent should not do anything
                return;
            }
            
            if (e.target.dataset.ratio) {
                // for inputs with activity ratio
                ratio = +e.target.dataset.ratio;
                localStorage.setItem('ratio', ratio);
            } else {
                // for inputs with female/male choice
                sex = e.target.id;
                localStorage.setItem('gender', sex);
            }

            // removing active class from all static inputs except the clicked one
            staticInputs.forEach(input => {
                input.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);

            calcTotal();
        });

    }

    getStaticInputsData('#gender', 'calculating__choose-item_active');
    getStaticInputsData('#activity', 'calculating__choose-item_active');


    function getDynamicInputsData(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            // highlighting input in red in case of non-digit input, otherwise - in green
            if (input.value.match(/\D/g)) {
                input.classList.add('calculating__choose-item_highlighted-error');
                input.classList.remove('calculating__choose-item_highlighted-success');
            } else {
                input.classList.remove('calculating__choose-item_highlighted-error');
                input.classList.add('calculating__choose-item_highlighted-success');
            }
            
            // getting user input
            switch(input.id) {
                case 'height': 
                    height = +input.value;
                    break;
                case 'weight': 
                    weight = +input.value;
                    break;
                case 'age': 
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInputsData("#height");
    getDynamicInputsData("#weight");
    getDynamicInputsData("#age");
    // end of calculator
}

export default calc;