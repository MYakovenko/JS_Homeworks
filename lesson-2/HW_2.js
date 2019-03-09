/*Task1
Создайте пустой массив letters
Создайте строку из нескольких слов, например "Backend As A Service"
Напилите код, который разбивает эту строку на массив слов и пушит в массив letters первый символ каждого слова
Выведите результат в консоль
Объедините все элементы массива letters в одну строку и выведите ее в консоль*/

function getLetters(string){
    var letters = [];
    var arr = string.split(" ");
    var i = 0;
    while ( i < arr.length){
        letters.push(arr[i].charAt(0));
        i++;
    };
    console.log(letters);
    return letters.join("");
}

var originalString = "Backend As A Service";
getLetters(originalString);


/*Task2
Объявите функцию с одним формальным параметром, которая проверяет тип данных переданного аргумента и:
 - если это число, возвращает текущую дату в формате "20.02.2019, 13:21:51"
 - в противном случае возвращает строку "Неверный тип данных"
Вызовите функцию*/

function getDate (param) {
    var date = ""
       typeof param === "number" ? 
           date = new Date().toLocaleString().split (', ')[0] :
           console.log ("Неверный тип данных");
     return date
}

/*Task3
Откройте Chrome DevTools
В панели навигации найдите файл index01.js ( в папке js/ )
Установите breakpoint на строке вызова функции insertUserText ( строка 10 )
Перезагрузите страницу
Теперь обратите внимание на функцию testUserText
Ваша задача: обезопасить свою страницу от внедрения вредоносного кода с помощью 
функции валидации testUserText
функция должна вывести на страницу текст пользователя безопасным способом
( т.е. текст должен быть выведен "as is" ( как есть ), но код не должен быть 
выполнен ) */

function testUserText ( userText ) {
    return userText.split("<").join("&lt;")
}
function insertUserText ( userText ) {
    var x = document.createElement ( 'div' )
    x.innerHTML = testUserText ( userText )
    document.body.appendChild ( x )
}

insertUserText (`<svg/onload='document.write("Looser");
                document.body.style.backgroundColor="black";
                document.body.style.color="red";
                document.body.style.fontSize="50px";
                document.body.style.fontWeight="bold";
                document.body.style.textAlign="center";
                document.body.style.paddingTop="45%";'>`)