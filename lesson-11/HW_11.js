/*Task1
Предварительная подготовка:
Создать файл с данными в формате JSON

Это должен быть массив объектов с двумя свойствами: title и ref

title - название картинки
ref - ссылка на картинку
Задание:
Загрузить данные из JSON-файла
Распарсить данные в массив
Вывести на страницу картинки и подписи к ним*/


// Ссылка на проект: https://myakovenko.github.io/FEA_HW11_Task1/

function getPictures (url) {
    return new Promise(
        function (resolve) {
            const request = new XMLHttpRequest
            request.open("GET", url)

            request.onreadystatechange = function (event) {
                event.target.readyState === 4 ? 
                    event.target.status === 200 ? 
                    resolve ( event.target.responseText ) : 
                        reject ( event.target.statusText ) : null
            }
            request.send()
        }
    )
}

getPictures("cities.json").then(
    responce => JSON.parse(responce).forEach(
        picture => {
            var div = document.body.appendChild(document.createElement("div"))
            div.appendChild(document.createElement("img")).src = picture.ref
            div.appendChild(document.createElement("span")).innerText = picture.title
        }
    )
)

var style = document.head.appendChild(document.createElement('style'))
style.innerText = `
    div {
        margin-bottom: 30px;
    }
    img {
        height: 200px;
        padding: 10px;
        border: solid 2px #008080;
    }
    span {
        display: block;
        color: #008080;
    }
`

/*Task 2 
Исходные данные
var messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]

messages.getKey = () => {
    var key = new Date().toLocaleString().split(", ")[1]
    return log [ key ] ? log [ key + "[2]" ] ? key + "[3]" : key + "[2]" : key
}

var log = {}

sendMessage
var sendMessage = message => new Promise (
    resolve => setTimeout (
        () => resolve ( message ),
        Math.random () * 7000
    )
)
Задача: напилить код, который вызывает функцию sendMessage для каждого элемента массива messages 
и логирует полученные сообщения в объекте log следующим образом:

log
{
    22:25:57: "backspace"
    22:25:58: "shift"
    22:25:59: "subtract"
    22:25:59[2]: "enter"
    22:25:59[3]: "delete"
    22:26:01: "control"
    22:26:01[2]: "space"
}
*/

var messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]

messages.getKey = () => {
    var key = new Date().toLocaleString().split(", ")[1]
    return log [ key ] ? log [ key + "[2]" ] ? key + "[3]" : key + "[2]" : key
}

var log = {}

var sendMessage = message => new Promise (
    resolve => setTimeout (
        () => resolve ( message ),
        Math.random () * 7000
    )
)

messages.forEach(
    (message, index, arr) => sendMessage(message)
        .then(
            responce => log[arr.getKey()] = message
        )
)

/*Task 3
Изменим условие предыдущего задания

Массив messages, объект log и функция sendMessage остаются теми же

Немного изменится метод getKey:

messages.getKey = () => new Date().toLocaleString().split(", ")[1]

Нужно напилить код рекурсивной функции recursive, которая вызывает sendMessage поочередно 
с каждым элементом массива messages, но только после того, как предыдущий месседж будет 
залогирован в объекте log

var sendAll = () => {
    var index = 0
    function recursive () {
        ...
    }
    recursive ()
}

sendAll()*/

var messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]

messages.getKey = () => new Date().toLocaleString().split(", ")[1]

var log = {}

var sendMessage = message => new Promise (
    resolve => setTimeout (
        () => resolve ( message ),
        Math.random () * 7000
    )
)

var sendAll = () => {
    var index = 0
    function recursive () {

        sendMessage(messages[index++])
            .then( responce => {
                if (index > messages.length) return
                log[messages.getKey()] = responce
                recursive()
            })
    }
    recursive ()
}

sendAll()