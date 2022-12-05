'use strict'

const menu = document.getElementById('menu-burguer-container')

function menuAction (){
    menu.classList.toggle('show')
}

menu.addEventListener('click', menuAction)