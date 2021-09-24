function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, tabActiveClass) {
    //Tabs
    // variables
    const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    //functions for tabs
    const hideTabContent = () => {
        tabsContent.forEach(tabContent => {
            tabContent.classList.add('hide');
            tabContent.classList.remove('show', 'fade');
        });

        tabs.forEach(tab => {
            tab.classList.remove(tabActiveClass);
        });
    };

    const showTabContent = (i = 0) => {
        tabsContent[i].classList.remove('hide');
        tabsContent[i].classList.add('show', 'fade'); //fade - CSS-animation
        tabs[i].classList.add(tabActiveClass);
    };

    hideTabContent();
    showTabContent();

    //tab switcher
    tabsParent.addEventListener('click', (e) => {
        let target = e.target; //to simplify the code

        if (target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((tab, i) => {
                if (target == tab) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;