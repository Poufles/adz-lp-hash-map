import LinkedList from "./linkedlist.mjs";

export default function HashMap() {
    let map = [];
    let loadFactor = 0;
    let capacity = 16;

    for (let index = 0; index < capacity; index++) {
        const linkedList = LinkedList();

        map.push(linkedList);
    };

    const set = (key, value) => {
        if (loadFactor >= 0.75) {
            const newMap = [];
            const entriesArr = entries();

            capacity *= 2;

            for (let index = 0; index < capacity; index++) {
                const linkedList = LinkedList();

                newMap.push(linkedList);
            };

            for (let index = 0; index < entriesArr.length; index++) {
                const entry = entriesArr[index];
                const hashKey = hash(entry[0]) % capacity;
                const linkedList = newMap[hashKey];

                linkedList.append({
                    key: entry[0],
                    value: entry[1]
                });
            };

            map = newMap;
        };

        const hashKey = hash(key) % capacity;
        const linkedList = map[hashKey];

        if (linkedList.contains(key)) {
            const index = linkedList.find(key);

            linkedList.insertAt({ key, value }, index);
            linkedList.removeAt(index + 1);

            return;
        };

        linkedList.append({ key, value });

        loadFactor = length() / capacity;
    };

    const get = (key) => {
        const hashKey = hash(key) % capacity;
        const linkedList = map[hashKey];

        if (linkedList.contains(key)) {
            const index = linkedList.find(key);

            return linkedList.at(index).value;
        };

        return null;
    };

    const has = (key) => {
        const hashKey = hash(key) % capacity;
        const linkedList = map[hashKey];

        return linkedList.contains(key);
    };

    const remove = (key) => {
        const hashKey = hash(key) % capacity;
        const linkedList = map[hashKey];

        if (linkedList.contains(key)) {
            const index = linkedList.find(key);

            linkedList.removeAt(index);

            return true;
        };

        return false;
    };

    const length = () => {
        let count = 0;

        for (let index = 0; index < capacity; index++) {
            const linkedlist = map[index];

            count += linkedlist.size();
        };

        return count;
    };

    const clear = () => {
        for (let index = 0; index < capacity; index++) {
            map[index] = LinkedList();
        };
    };

    const keys = () => retrieve(entries, 0);
    
    const values = () => retrieve(entries, 1);

    const entries = () => {
        const entry = [];

        for (let index = 0; index < capacity; index++) {
            const linkedList = map[index];
            const size = linkedList.size();

            if (size > 0) {

                for (let jndex = 0; jndex < size; jndex++) {
                    const pair = [];

                    pair.push(linkedList.at(jndex).key);
                    pair.push(linkedList.at(jndex).value);

                    entry.push(pair);
                };

            };
        };

        return entry;
    };

    return {
        set,
        get,
        has,
        remove,
        length,
        clear,
        keys,
        values,
        entries
    };
};

function retrieve(entries, pos) {
    const keysArr = [];
    const entriesArr = entries();

    for (let index = 0; index < entriesArr.length; index++) {
        keysArr.push(entriesArr[index][pos]);
    };

    return keysArr;
};

/**
* Creates a hash from the given key.
* @param {String} key String value to be hashed
* @returns A hashed value in numbers.
*/
function hash(key) {
    /**
     * THIS HASH FUNCTION IS NOT GREAT OR ANYTHING REVOLUTIONARY
     * I SIMPLY WANT TO CREATE MY OWN FUNCTION AND SEE IF I UNDE
     * RSTOOD HOW IT WORKS.
     */
    const PRIMENUMBER = 31;
    const PREMIER = key.slice(0, 1);
    const MILIEU = key.charAt(Math.floor(key.length / 2));
    const DERNIER = key.charAt(key.length - 1);
    const NEWSTRING = PREMIER + MILIEU + DERNIER + key;
    const LENGTH = NEWSTRING.length;

    let firstTour = 0;
    for (let index = 0; index < LENGTH; index++) {
        firstTour = PRIMENUMBER * firstTour + NEWSTRING.charCodeAt((LENGTH - 1) - index);
    };

    let secondTour = 0;
    for (let index = 0; index < LENGTH; index++) {
        secondTour = (PRIMENUMBER * secondTour) + (NEWSTRING.charCodeAt(index));
    };

    let hashCode = Math.ceil(Math.sqrt(firstTour + secondTour) / PRIMENUMBER);

    return hashCode;
};