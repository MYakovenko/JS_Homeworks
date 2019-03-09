// вывести в консоль все числа больше 50

var numbers = [ 254, 115, 78, 25, 91, 45, 37 ];

for (i=0; i < numbers.length; i++) {
    if (numbers[i] < 50) continue
    console.log(numbers[i]) 
};