/*Task1
Создайте массив tags с именами валидных тегов HTML5
Теперь создайте массив classes с именами классов
( число элементов в массиве classes должно быть не меньше, 
чем число элементов массива tags )
Создайте элемент style и вставьте его в head документа
Добавьте контент элемента style с описанием классов, имена которых находятся 
в массиве classes
Итерируйте массив tags, создавая соответствующие элементы и вставляя их 
на страницу, добавляя каждому элементу класс из массива classes*/

var tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
var classes = ['title', 'sub-title', 'bold-text', 'text', 'small-text', 'tiny-text']

var style = document.head.appendChild(document.createElement('style'))
style.innerText = `
    .title {
        font-family: monospace, Arial;
        font-size: 30px;
        letter-spacing: 0.05em ;
        color: orangered;
    }

    .sub-title {
        font-family: monospace, Arial;
        font-size: 25px;
        letter-spacing: 0.02em ;
        color: blue;
    }

    .bold-text {
        font-family: monospace, "Helvetica Neue";
        font-size: 20px;
        font-weight: bold;
        color: red;
    }
    .text {
        font-family: monospace, Arial;
        color: black;
        font-size: 16px;
    }

    .small-text {
        font-family: monospace, "Helvetica Neue";
        font-size: 10px;
        font-style: italic;
        color: green;
    }

    .tiny-text{
        font-family: monospace, Arial;
        font-size: 5px;
        text-decoration: underline;
        color: #35036e;
    }
`

for (var i = 0; i < tags.length; i++) {
    var tag = document.body.appendChild(document.createElement(tags[i]))
    tag.className = classes[i]
    tag.innerText = `Test font h${i+1}`
}

/*Task2
Результат должен быть аналогичен тому, что получится в предыдущем 
упражнении

Однако исходный массив tags должен быть массивом объектов, 
каждый из которых содержит не только имя тега элемента, но и 
его атрибуты, а так же хотя бы один обработчик события

Таким образом, массив classes нам уже не нужен, но кроме 
стилизации элементов нужно еще добавить их контент, используя 
как атрибуты тегов, так и свойства элементов DOM */

var tags = [
    {
      name: 'h1',
      attributes: {
          className: 'title'
      },
      text: 'Test font h1',
      style: `
        font-family: monospace, Arial;
        font-size: 30px;
        letter-spacing: 0.05em ;
        color: #c71585;
        `,
      changeColor: function(event) {
        document.querySelector('h1').style.color = '#008080'
      },
      setColorBack: function(event) {
        document.querySelector('h1').style.color = '#c71585'
      }
    },
    {
        name: 'h2',
        attributes: {
            className: 'sub-title'
        },
        text: 'Test font h2' ,
        style: `
            font-family: monospace, Arial;
            font-size: 25px;
            letter-spacing: 0.02em ;
            color: blue;
        `
    },
    {
        name: 'h3',
        attributes: {
            className: 'bold-text'
        },
        text: 'Test font h3',
        style: `
            font-family: monospace, "Helvetica Neue";
            font-size: 20px;
            font-weight: bold;
            color: red;
        `
    },
    {
        name: 'h4',
        attributes: {
            className: 'text'
        },
        text: 'Test font h4',
        style: `
            font-family: monospace, Arial;
            color: black;
            font-size: 16px;
        `
    },
    {
        name: 'h5',
        attributes: {
            className: 'small-text'
        },
        text: 'Test font h5',
        style: `
            font-family: monospace, "Helvetica Neue";
            font-size: 10px;
            font-style: italic;
            color: green;
        ` 
    },
    {
        name: 'h6',
        attributes: {
            className: 'tiny-text'
        },
        text: 'Test font h6',
        style: `
            font-family: monospace, Arial;
            font-size: 5px;
            text-decoration: underline;
            color: #35036f;
        `
    },
    {
        name: 'a',
        attributes: {
            className: 'link',
            href: 'https://fonts.google.com/'
        },
        text: 'Go to Google Fonts',
    },

]

for (var elem of tags) {
    var tag = document.body.appendChild(document.createElement(elem.name))
    if (elem.text) tag.innerText = elem.text
       
    for (var attr in elem.attributes) tag.setAttribute(attr, elem.attributes[attr])
    tag.style = elem.style
    
}

document.querySelector('h1').onmouseover = tags[0].changeColor
document.querySelector('h1').onmouseout = tags[0].setColorBack

/*Task3
 Напилить код, который выбирает все элементы-потомки body 
( warning: кроме элементов script ) и добавляет им класc:

.redBack {
    background-color: red!important;
}*/

var childrens = document.body.children

for (var elem of childrens) {
    if (elem.matches('script')) continue 
    elem.classList.add = 'redBack'
    elem.style = `background-color: red!important;`
}

/*Альтернативный вариант - выбрать все заранее заданные элементы:
var tags = [ "header", "footer", "main", "div", "p" ]
Запустить код в консоли любой страницы*/

var childrens = document.getElementsByTagName("*")

var tags = [ "header", "footer", "main", "div", "p" ]
for (var elem of childrens) {
    for (var tag of tags) {
    if (elem.matches(tag)) console.log(tag)
    }
}