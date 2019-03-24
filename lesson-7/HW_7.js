/*Task1
- Создайте элемент 'p', при клике на котором появляется картинка 
размером 100px
- При наведении указателя мышки на картинку ее размер должен плавно 
увеличиваться до 200px
- При клике на картинке она должна исчезать*/

var elem = document.body.appendChild(document.createElement('p'))
elem.innerText = 'Click me'

var img = document.createElement('img')

function showPicture (event) {
    document.body.appendChild(img)
    img.src = 'https://pbs.twimg.com/profile_images/933655771811680256/UwA6ymLd_400x400.jpg'
    img.width = 100
}

function changeSize (event) {
    event.target.width = 200
}

function hidePicture (event) {
    event.target.parentNode.removeChild(event.target)
}

elem.addEventListener('click', showPicture)
img.addEventListener('mouseenter', changeSize)
img.addEventListener('click', hidePicture)

/*Task2
- Создайте коллекцию вложенных друг в друга html-элементов с 
обработчиками событий click, mouseover, mouseout
- Установите атрибуты стиля width и height такие, чтобы 
вложенные элементы были меньше размером, чем родитель
- Установите значение #ff00ff50 атрибута background-color каждому 
элементу
- Установите значение dotted 1px yellow; атрибута border каждому 
элементу
- При наступлении события mouseover значение атрибута 
background-color должно меняться на #ffff0050
- При наступлении события mouseout атрибуту background-color 
должно устанавливаться исходное значение
- При наступлении события click элемент должен быть удален
- При наведении мышки на элемент должна появляться подсказка с 
его именем ( "first", "second", "third", "fourth" )*/

var collection = []

function over ( event ) {
    event.target.style.backgroundColor = '#ffff0050'
}
function out ( event ) {
    event.target.style.backgroundColor = '#ff00ff50'
}
function clickHandler ( event ) {
    event.stopPropagation()
    event.target.parentNode.removeChild (event.target)
}

["first", "second", "third", "fourth"].forEach (
    function (tag, index, arr) {
        var elem
        index === 0 ? 
            elem = collection [0] = document.body
                .appendChild(document.createElement('div')) :
            elem = collection[index] = collection[index-1]
                .appendChild (document.createElement('div'))

        elem.innerText = tag
        elem.title = tag
        elem.style = `
            width: ${300 - index * 50}px;
            height: ${300 - index * 50}px;
        	background-color: #ff00ff50;
        	border: dotted 1px yellow;
        	text-align: center;
		`

        elem.addEventListener('mouseover', over)
        elem.addEventListener('mouseout', out)
        elem.addEventListener('click', clickHandler)
    }
)

/*Task3
Условия предыдущего задания изменить так:

var collection = []
function enter ( event ) {
    ...
}
function leave ( event ) {
    ...
}
function clickHandler ( event ) {
    ...
}

[ 1, 2, 3, 4, 5, 6, 7 ].forEach (
    ...
)
:warning: при удалении элемента его потомки должны оставаться */

var collection = []

function enter ( event ) {
    event.target.style.backgroundColor = '#ffff0050'
}
function leave ( event ) {
    event.target.style.backgroundColor = '#ff00ff50'
}
function clickHandler ( event ) {
    event.target.children.length ? 
        event.target.parentNode
            .appendChild(event.target.children[0]) : null 

    event.target.remove()
}

[ 1, 2, 3, 4, 5, 6, 7 ].forEach (
    function (tag, index, arr  ) {
        var elem
        index === 0 ? 
            elem = collection [0] = document.body
                .appendChild(document.createElement('div')) :
            elem = collection[index] = collection[index-1]
                .appendChild ( document.createElement('div'))
        
        elem.innerText = tag
        elem.title = tag
        elem.style = `
            width: ${400 - index * 50}px;
            height: ${400 - index * 50}px;
            background-color: #ff00ff50;
            border: dotted 1px yellow;
            text-align: center;
        `

        elem.addEventListener('mouseenter', enter)
        elem.addEventListener('mouseleave', leave)
        elem.addEventListener('click', clickHandler)
    }
)