/*Task1
Напилите код, выводящий на страницу текущее время в течение 100 секунд
Подсказка: создайте элемент, в котором будет отображаться текущее время
Контент элемента должен обновляться каждую секунду*/

var clock = document.body.appendChild(
	document.createElement('h1')
)

clock.innerText = new Date().toLocaleString().split(", ")[1]

clock.style = `
	width: 160px;
	background-color: #fff8dc;
	border: solid 2px #008080;
	box-shadow: 5px 3px 3px 2px #00808090;
	color: #008080;
	font-style: italic;
	font-family: "Comic Sans MS", sans-serif;
	padding: 30px 40px;
`

for (var i = 0; i < 100; i++) {
	(function (num) {
		return function () {
			setTimeout(
				() => clock.innerText = new Date().toLocaleString().split(", ")[1], 
				1000*num
			)
		}
	})(i)()
}

/*Task2
Завершите код рекурсивной функции typeMessage так, чтобы при 
ее вызове на страницу выводился один символ в секунду*/

var typeMessage = ( function ( velocity ) {
    let container = document.getElementById ( "demo" ) ?
        document.getElementById ( "demo" ) :
        document.body.appendChild (
            document.createElement ( "h3" )
        )
    container.style = `color: magenta;`
    var index = 0
   
	return function ( message ) {
		var num = index
		setTimeout(
			() => container.textContent += message[num],
			1000 * num * velocity
		)
		while(index++ < message.length-1) arguments.callee(message)
    }
})( 1 )

typeMessage ( `Welcome to the hell` )

/*Task3
Нужно сделать так, чтобы у всех экзепляров, созданных конструктором User, 
был унаследованный метод counter(), который считает созданные 
конструктором экземпляры

Каждый вызов конструктора увеличивает счетчик экземпляров на 1 и 
помещать новое значение счетчика в свойство id созданного экземпляра

После выполнения кода:
users[1].id = users[1].counter()
свойство id экземпляра не должно измениться, так же, как и значение счетчика*/

function User ( name ) {
    this.name = name
    this.id = this.counter()
}

User.prototype.counter = (function (){
	var counter = 0
	return function () {
		return typeof this.id === 'number' ? this.id : counter += 1
	}
})()

var users = [
    new User ( "Семен" ),
    new User ( "Антон" ),
    new User ( "Демьян" ),
    new User ( "Василий" )
]