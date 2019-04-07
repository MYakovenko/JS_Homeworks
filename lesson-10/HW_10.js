/*Task1
Логирование поступающих сообщений в объекте log

- Задан массив сообщений и пустой объект log
- Далее, есть функция, отправляющая сообщения в случайном порядке 
в случайное время
Обратите внимание, что эта функция получает при вызове не только 
текст сообщения, но и кллбэк-функцию, которой нужно передать это 
сообщение
- С помощью кода:
    messages.forEach (
        message => sendMessage ( message, handler )
    )
инициируем отправку сообщений
- Ваша задача - напилить код функции handler, которая получает сообщение 
и заносит его в объект log в виде нового свойства, значение которого - текст 
поступившего сообщения, а ключ ( имя свойства ) - это время поступления 
сообщения ( в виде строки )
- В помощь вам уже есть функция, которая формирует ключ очередного сообщения.
На случай, если два сообщения поступят одновременно, функция getKey добавляет "[2]" 
к значению ключа ( иначе значения ключей двух сообщений будут совпадать )*/

let messages = [
    "backspace",
    "enter",
    "shift",
    "control",
    "delete",
    "space",
    "subtract"
]

var log = {}

var sendMessage = ( message, callback ) => 
    setTimeout (
        () => callback ( message ),
        Math.random () * 7000
    )

getKey = () => {
    var key = new Date().toLocaleString().split(", ")[1]
    return log [ key ] ? key + "[2]" : key
}

var handler = message => Object.defineProperty(log, getKey(), {
      value: message,
      configurable: true,
      writable: true,
      enumerable: true
})

messages.forEach (
    message => sendMessage ( message, handler )

log

/*Task 2
 Допилите код конструктора User, дополнив его акцессорами приватного свойства 
 presence так, чтобы после выполнения скрипта:

function User ( name ) {
    this.name = name
    var presence = false
    ...
}
let user = new User ( "Ivan" )
console.info ( user.presence )

в консоли было:
"Ivan is absent"

а после выполнения кода:
user.presence = "+"
console.info ( user.presence )

в консоли было:
"Ivan is present"*/

function User ( name ) {
    this.name = name
    var presence = false
    
    Object.defineProperty(this, 'presence', {
        get: function () { 
            return presence ? `${this.name} is present` : `${this.name} is absent`
        },
        set: function(message) {
            message ? presence = true : null 
        }
    })
}

let user = new User ( "Ivan" )
console.info ( user.presence )

user.presence = "+"
console.info ( user.presence )

/*Task 3
 Объявить функцию-конструктор User
 1. Конструктор должен принимать аргументы, описывающие юзера
 2. У конструктора должны быть следующие :warning: не наследуемые экземплярами 
 свойства и методы:
 avatars, admin, getAvatar
 3. Собственные свойства экземпляров:
 name ( имя пользователя ), email, photoURL ( URL фотографии пользователя )
    - Конструктор должен иметь дефолтные значения для всех аргументов
    - дефолтное значение URL фотографии пользователя должно быть результатом 
    работы статического метода getAvatar
4. Унаследованные свойства экземпляров:
неперечислимое неизменяемое свойство messageBox - элемент DOM
    - messageBox - это контейнер, куда будут выводиться сообщения всех пользователей и 
    admin
    - при выводе сообщения пользователя в messageBox должны отображаться его аватар 
    и имя
унаследованные методы write и read
    - запись осуществляется в messageBox, чтение - из messageBox
    
* Короче, юзеры пишут в messageBox из консоли:
    users[index].write ( text )
а вот админ - непосредственно вводит текст в messageBox
( т.е. при вводе в messageBox пишущий сообщение идентифицируется как админ, 
выводится его аватар и имя )*/

function User (_name,_email,_photoURL) {

    this.name = _name || "Vasya"
    this.email = _email || "vasiliy@gmail.com"
    this.photoURL = _photoURL || User.getAvatar()

}

User.avatars = [
    "https://pre00.deviantart.net/50f9/th/pre/i/2011/217/e/8/pikachu_2_by_nostalgiaattack-d45jd3i.png",
    "https://cdn.diversityavatars.com/wp-content/uploads/2018/01/Vector-Smart-Object-5.png",
    "https://cdn4.iconfinder.com/data/icons/user-avatar-flat-icons/512/User_Avatar-31-512.png",
    "http://icons.iconarchive.com/icons/hopstarter/face-avatars/256/Male-Face-L3-icon.png",
    "https://findicons.com/files/icons/1072/face_avatars/300/i05.png",
    "http://www.iconarchive.com/download/i51043/hopstarter/halloween-avatars/Gomez.ico",
    "http://icons.iconarchive.com/icons/hopstarter/halloween-avatars/256/Zombie-2-icon.png",
    "https://vignette.wikia.nocookie.net/yogscast/images/8/8a/Avatar_Turps_2015.jpg"
]

User.admin = {
    photoURL: "https://i.pinimg.com/originals/3d/47/4f/3d474f82ff71595e8081f9a120892ae8.gif",
    name: "admin"
 }

User.getAvatar = function () {
    return this.avatars.shift ()
}

User.prototype.messageBox = (function () {
    let container = document.body.appendChild ( document.createElement("div"))
    container.style = `
        position: relative;
        width: 400px;
        height: 250px;
        border: solid 3px #008080;
        background-color: #f0fff0;
        padding: 20px;
    `
    let img = container.appendChild ( document.createElement("img"))
    img.style = `
        width: 100px;
    `
    let name = container.appendChild ( document.createElement("span"))
    name.style = `
        color: #008080;
		font-weight: bold;
    `
    let message = container.appendChild ( document.createElement("input"))
    message.type = 'textarea'
    message.style = `
        position: absolute;
        left: 20px;
        bottom: 20px;
        width: 400px;
        height: 80px;
    `
    message.addEventListener ('input', function (event){
        document.querySelector('img').src = User.admin.photoURL
        document.querySelector('span').innerText = User.admin.name
    })

    return container
})()

User.prototype.write = function(text) {
    document.querySelector('img').src = this.photoURL
    document.querySelector('span').innerText = this.name
    document.querySelector('input').value = text
}

User.prototype.read = function(event) {
    let readedText = document.querySelector('div')
        .appendChild (document.createElement("p"))
    
    readedText.style = `
		position: absolute;
		right: 50px;
		bottom: 90px;
		width: 30px;
        color: #008080;
		font-style: italic;
        font-size: 12px;
    `
    document.querySelector('p').innerText = 'Прочитано'
}

document.querySelector('input').addEventListener('focus', User.prototype.read)
document.querySelector('input').addEventListener('blur', function () {
	document.querySelector('p').innerText = ''
})

var users = [
    new User ( "Иван" ),
    new User ( 'Alex', "alex@gmail.com" ),
    new User ( 'Bob', "bob777@gmail.com" ),
    new User ( 'Dima', "dima888@gmail.com" ),
    new User ( 'Fima', "fima999@gmail.com" )
]

var k = 1
users.forEach ( 
    function ( user ) {
        setTimeout ( 
            function () {
                user.write ( `Hello, I'm ${user.name}` )
            }, 3000 * k++
        )
    }
)

