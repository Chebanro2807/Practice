window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.nav'),
    menuItem = document.querySelectorAll('.nav_link_wrap'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        let hamburgerChildren = hamburger.children;
        for (let i=0, child; child=hamburgerChildren[i]; i++){
            child.classList.toggle('hamburger_active');
        }
        // hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('nav_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('nav_active');
        })
    })
})