import HashMap from "./hashmap.mjs";

const test = HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

console.log(test.entries());
console.log('\n\n');

test.set('moon', 'silver');
console.log(test.entries());
console.log('\n\n');

test.set('grape', 'dark red');
console.log(test.entries());
console.log('\n\n');

console.log(test.keys());
console.log(test.values());