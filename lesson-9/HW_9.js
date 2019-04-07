/*Task1
Завершите код функции typeMessage так, чтобы на страницу выводился 
один символ в секунду*/

function typeMessage ( message, velocity ) {
    var container = document.getElementById ( "demo" ) ?
        document.getElementById ( "demo" ) :
        document.body.appendChild (
            document.createElement ( "h3" )
        )
    container.style = `color: magenta;`
	
	message.split("").forEach(
		(item, index) => setTimeout(
			() => container.textContent += item,
			1000 * index * velocity
		)
	)
}

typeMessage ( `Welcome to the hell`, 1 )

/*Task2
Напилите код методов setUserPresent, showPresent и showAbsent

После запуска кода результат в консоли должен быть таким:
Иван
Дмитрий
Степан
Михаил

а после выполнения кода:
users.setUserPresent( "Иван", "+" )
users.setUserPresent( "Михаил", "присутствовал" )
users.setUserPresent( "Степан", true )

users.showPresent()

результат в консоли должен быть таким:
Иван
Степан
Михаил*/

var users = (
    function ( list ) {
        var users = []
        for ( var user of list )
            users.push ({
                name: user,
                present: false
            })

        return {
            setUserPresent ( userName, present ) {
                users.find (
                    user => user.name !== userName ? null :
                        !present ? null : user.present = true
                )
            },
            showPresent () {
                return users.filter(user => user.present)
                    .map(presentUser => presentUser.name)
            },
            showAbsent () {
                return users.filter(user => !user.present)
                    .map(absentUser => absentUser.name)
            }
        }
    }
)( [ "Иван", "Дмитрий", "Степан", "Михаил" ] )

users.showAbsent()

/*Task 3
Допилите код функции changeClass, которая парсит все стили 
страницы в поисках заданного класса, а затем меняет атрибуты стиля 
этого класса 

После вызова функции в консоли страницы, где есть элементы с классом second-level-menu, 
у всех элементов этого класса цвет фона должен измениться на красный*/

let changeClass = ( classname, styleString ) => Array.from(document.styleSheets)
    .filter(
         sheet => !sheet.href
    ).forEach(
        sheet => Array.from(sheet.cssRules)
            .filter(
                rule => rule.selectorText === classname
            ).forEach(
                rule => rule.style[styleString.split(':')[0]] = styleString.split(':')[1]
            )
    )

changeClass ( "second-level-menu", "background-color: red" )