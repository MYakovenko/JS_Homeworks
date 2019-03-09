/*Task1
Объявите функцию без формальных параметров, которая выводит в консоль 
сама себя и все переданные ей аргументы
Вызовите эту функцию с аргументами 10, false, "google"*/

function showArguments () {
    console.log(arguments.callee);
    console.log(arguments);
}

showArguments(10, false, "google");


/*Task2
Объявите функцию userInfo, которая выводит в консоль:

свойство "Дата регистрации: " + свойство data контекста вызова, если свойство 
registered имеет значение true
сообщение "Незарегистрированный пользователь: " + свойство name в противном случае
( используйте переменные в литералах )

Создайте два объекта с одинаковым набором свойств:

name ( строка )
registered ( логическое значение )
data ( дата в формате "дд.мм.гг" )
Добавьте каждому объекту метод getInfo, который будет ссылкой на функцию userInfo

Вызовите каждый метод*/

function userInfo () {
    console.log( this.registred ? 
        `Дата регистрации: ${this.data}` : 
        `Незарегтстрированный пользователь ${this.name}`) 
}

var userJames = {
    name: "James",
    registred: true,
    data: new Date(2019, 0, 15).toLocaleString(),
    getInfo: userInfo
}

var userCatrine = {
    name: "Catrine",
    registred: false,
    data: new Date().toLocaleString(),
    getInfo: userInfo
}

userJames.getInfo();
userCatrine.getInfo();

/*Task3
Есть три объекта: users, posts и comments

Написать код функции getPostComments ( postId ),
которая возвращает массив всех комментариев к посту
с идентификатором postId
( с именем автора комментария и текстом комментария )*/

var users = {
    14587: {
            name: "Ivan",
            email: "ivan78@gmail.com"
    },
    28419: {
            name: "Georg",
            email: "georg.klep@gmail.com"
    },
    41457: {
            name: "Stephan",
            email: "stephan.borg@gmail.com"
    }
}
var posts = {
    7891451: {
            author: 14587,
            text: "Imagine we can encapsulate these secondary responsibilities in functions"
    },
    7891452: {
            author: 28419,
            text: `В конструкторе ключевое слово super используется как функция, вызывающая родительский конструктор. 
                    Её необходимо вызвать до первого обращения к ключевому слову this в теле конструктора. 
                    Ключевое слово super также может быть использовано для вызова функций родительского объекта`
    },
    7891453: {
            author: 28419,
            text: `DOM не обрабатывает или не вынуждает проверять пространство имен как таковое. 
                    Префикс пространства имен, когда он связан с конкретным узлом, не может быть изменен`
    },
    7891454: {
            author: 14587,
            text: "Ключевое слово super используется для вызова функций, принадлежащих родителю объекта"
    }
}
var comments = {
    91078454: {
            postId: 7891451,
            author: 28419,
            text: `The static String.fromCharCode() method returns a string created 
                    from the specified sequence of UTF-16 code units`
    },
    91078455: {
            postId: 7891451,
            author: 41457,
            text: `HTML элемент <template> — это механизм для отложенного рендера клиентского контента, 
                    который не отображается во время загрузки, но может быть инициализирован при помощи JavaScript`
    },
    91078457: {
            postId: 7891452,
            author: 41457,
            text: "Глобальный объект String является конструктором строк, или, последовательностей символов"
    },
    91078458: {
            postId: 7891452,
            author: 14587,
            text: `The Element.namespaceURI read-only property returns the namespace URI of the element, 
                    or null if the element is not in a namespace`
    }
}

function getCurrentPostComments ( postId ) {
    var res = [];

    for (var key in comments) {
        comments[key].postId === postId ? res.push(comments[key]) : null;
	};

	for (var commentKey in res) {
		res[commentKey].author = users[res[commentKey].author].name;
	};
   
    return res;
};

console.log ( getCurrentPostComments ( 7891451 ) );
