// import HashMap from "./hashmap.mjs";
import HashSet from "./hashset.mjs";

// const test = HashMap();

// test.set('apple', 'red')
// test.set('banana', 'yellow')
// test.set('carrot', 'orange')
// test.set('dog', 'brown')
// test.set('elephant', 'gray')
// test.set('frog', 'green')
// test.set('grape', 'purple')
// test.set('hat', 'black')
// test.set('ice cream', 'white')
// test.set('jacket', 'blue')
// test.set('kite', 'pink')
// test.set('lion', 'golden')

// console.log(test.entries());
// console.log('\n\n');

// test.set('moon', 'silver');
// console.log(test.entries());
// console.log('\n\n');

// test.set('grape', 'dark red');
// console.log(test.entries());
// console.log('\n\n');

// console.log(test.keys());
// console.log(test.values());

const testset = HashSet();

testset.set('apple');
testset.set('banana');
testset.set('carrot');
testset.set('dog');

console.log(testset.entries());

testset.set('dog');

console.log(testset.entries());