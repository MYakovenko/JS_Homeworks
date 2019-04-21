/*Task1
Захостить на гитхабе приложение, которое:
- читает куки на клиенте, и если там есть дата последнего посещения,
выводит ее на страницу
- пишет в куки на клиенте текущую дату посещения*/

// Ссылка на проект https://myakovenko.github.io/FEA_HW12_Task1/

var res = {}

document.cookie.split('; ')
    .map(
        item => Object.assign( {}, 
            {[item.split('=')[0]]: item.split('=')[1]}
        )
    ).forEach(
        item => Object.assign(res, item)
    )

for (item in res) {
    item === 'last_visit' ?
        document.body.appendChild(
            document.createElement('p')
        ).innerText = res[item] : null
}

document.cookie = `last_visit = ${new Date().toLocaleString().split(', ')[0]}`

/*Task 2
localStorage
- Объявить функцию, которая будет вызываться в момент изменения хэш-части адреса 
страницы
- и сохранять в localStorage клиента hash-часть адреса страницы как pageId
и время входа ( в секундах ) как startTime
- Назначить эту функцию обработчиком события hashchange объекта window
- Желательно, чтобы при изменении хеш-части адреса происходило обновление 
контента страницы без перезагрузки
( например, изменялся заголовок и картинка, чтобы создать иллюзию перехода на новую страницу )
- Отслеживать в панели разработчика изменения в localStorage*/

//Ссылка на проект https://myakovenko.github.io/FEA_HW12_Task2/

let addElement = (tagName) => document.body.appendChild(
    document.createElement(tagName)
)

let title = addElement('h3')
title.innerText = "What is your favorite picture?"
title.style = `
    color: #008080;
    margin-left: 20px;
`

let img = addElement('img')
img.src = 'https://res.cloudinary.com/jerrick/image/upload/f_auto,fl_progressive,q_auto,c_fit,w_680/rc40bk5defzal8gqedo8'
img.style = `
    height: 200px;
    border: solid 2px #008080;
    padding: 10px;
    margin-left: 20px;
    margin-bottom: 20px;
`

let button = addElement('button')
button.innerText = 'Next picture'
button.style = `
    display: block;
    padding: 10px;
    background-color: #008080;
    margin-left: 100px;
`

let index = 1
button.onclick = function(){
    location.hash = `#${index++}`
}

let historyArr = []
function setLocalStorage (event) {
   
    let pageHash = {
        pageId: location.hash,
        startTime: new Date()
    }
 historyArr.push(pageHash)

    localStorage.setItem(
        'history', 
        JSON.stringify(historyArr)
 )
    
    console.log('hash was changed')
    console.log(localStorage.getItem ( "history" ))

    contentChange ()
}

window.addEventListener('hashchange', setLocalStorage)

function contentChange () {
    location.hash === '#1'? img.src = 'https://image.shutterstock.com/image-photo/couple-holding-hands-wooden-toy-260nw-1131088085.jpg':
        location.hash === '#2' ? img.src = 'https://images.pexels.com/photos/1116302/pexels-photo-1116302.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500':
            location.hash === '#3' ? img.src = 'https://c2.thejournal.ie/media/2018/01/declutter-your-friendships-752x501.jpg':
                location.hash === '#4' ? img.src = 'https://www.shethepeople.tv/wp-content/uploads/2018/04/girl-friends-levi-guzman-268866-unsplash.jpg':
                    location.hash === '#5' ? img.src = 'https://essays-experts.com/media/uploads/blog/21.11.Essay-about-life-and-friendship.jpg':
                        title.innerText = 'No more pictures here'
}

/*Task 3

Напилить код, который:
- вставляет кнопку на страницу
- добавляет обработчика события click кнопки

Обработчик события click:
- вычисляет случайное целое число от 1 до 20000 и помещает его в переменную winner
- добавляет :point_right: картинку
- ждет 4 секунды
- плавно изменяет непрозрачность картинки до 0, в процессе изменяя src картинки на новое значение
- плавно изменяет непрозрачность картинки до 1
- ждет еще 2 секунды, и делает fetch-запрос на гитхабовский API, чтобы получить данные юзера 
под номером winner
- при получении ответа изменяет src картинки на аватарку юзера, а так же вставляет логин юзера 
под фотографией
- ждет еще 10 секунд и удаляет картинку и подпись
- На время показа картинок кнопку лучше прятать*/

//Ссылка на проект https://myakovenko.github.io/FEA_HW12_Task3/

const addElem = (tagName) => document.body.appendChild(
    document.createElement(tagName)
)

const btn = addElem('button')
btn.innerText = "Let's go!"

const timeOut = time => new Promise(
    resolve => setTimeout( () => resolve(), time)
)

btn.onclick = function (event) {
    event.target.style.display = 'none'
    let winner = Math.round(Math.random()*20000)
    
    const picture = addElem('img')
    picture.src = "https://thumbs.gfycat.com/LivelyObviousAnhinga-size_restricted.gif"
    picture.style.height = "300"
    picture.style.transition = "all 1s"

    const login = addElem('h3') 
    
    timeOut(4000)
        .then( () => picture.style.opacity =0)
    timeOut(5000)
        .then( () => picture.src = "https://thumbs.gfycat.com/OddWideHookersealion-small.gif")
    timeOut(6000)
        .then( () => picture.style.opacity =1)
    timeOut(8000)
        .then( () => fetch (`https://api.github.com/users?since=${winner}`)
              .then( response => response.json()
                    .then (users => {
                        picture.src = users[0].avatar_url
                        login.innerText = users[0].login
                    })
              )
        )
    timeOut(15000)
        .then(
            () => {
                picture.remove()
                login.remove()
                event.target.style.display = 'block'
            }
        )
}