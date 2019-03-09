/*Task1
Создайте объект, свойства которого описывают содержимое дамской сумочки
Создайте метод объекта, позволяющий удалить что-то из сумочки
Создайте метод объекта, позволяющий положить что-то в сумочку*/

var handbag = {
        money: 2000,
        cosmetics: ['lipstick', 'mascara', 'powder'],
        mobilephone: true,
        removeItem: function (item) {
                        item ? delete this[item] : console.log('Недопустимый тип данных');
        },
        addItem: function (item, value) {
                        item ? this[item] = value : console.log('Недопустимый тип данных');  
        }
}

handbag.addItem('stationary', 'pen');
handbag.removeItem('mobilephone');


/*Task2
Объявить конструктор LibraryBook, с помощью которого можно создавать и редактировать объекты, 
хранящие информацию о книгах в библиотеке*/

function LibraryBook (title = 'Мастер и Маргарита', author = 'Михаил Булгаков', year = 2000) {
     var title = title;
     var author = author;
     var year = year;
     var readerName = "";
     var readerData = "";

     function giveTheBook ( client ) {
        readerName = client;
        readerData = new Date().toLocaleString();
        return title;
     }

    this.getBookInfo = function () {
          return console.log (readerName === "" ? `Книга есть в наличии` :  
                `Книга выдана ${readerData}`);
    } 

    this.getTheBook = function ( client ) {
        return readerName === "" ? giveTheBook ( client ) : console.log('Книги нет в наличии');
    }

    this.returnBook = function () {
        readerName = "";
        readerData = "";  
    }
} 

var books = []
books[0] = new LibraryBook('Цветы для Элджернона', 'Даниел Киз', 2010);
books[1] = new LibraryBook('Анна Каренина', 'Лев Толстой', 2005);

books[0].getBookInfo();
books[0].getTheBook('Иван Карась');
books[0].returnBook();

/*Task3
Объявите конструктор, который создает экземпляры с унаследованным методом addProperty
Метод addProperty должен принимать два аргумента:
- имя свойства
- значение свойства
и добавлять экземпляру новое свойство с указанным именем и значением*/

function UserConstructor (firstName = 'Вася', secondName = 'Иванов', age = 18) {
        this.firstName = firstName;
        this.secondName = secondName;
        this.age = age;
};

UserConstructor.prototype.addProperty = function (propertyName, value) {
        this[propertyName] = value;
}

var newUser = new UserConstructor('Леся', 'Васильченко', 20);
newUser.addProperty('hobby', 'GYM');