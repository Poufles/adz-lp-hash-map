import LinkedList from "./linkedlist.mjs";

export default function HashSet() {
    let map = [];
    let loadFactor = 0;
    let capacity = 16;

    // Initialise map's linked lists
    for (let index = 0; index < capacity; index++) {
        const linkedList = LinkedList();

        map.push(linkedList);
    };

    /**
     * Resizes the hash map and
     * rehashes the elements.
     */
    function resize() {
        const newMap = [];
        const entriesArr = entries();

        capacity *= 2;

        // Populate the new map with new linked lists
        for (let index = 0; index < capacity; index++) {
            const linkedList = LinkedList();

            newMap.push(linkedList);
        };

        // Populate the new map
        for (let index = 0; index < entriesArr.length; index++) {
            const entry = entriesArr[index]; // Retrieve entries
            const hashKey = hash(entry) % capacity; // Rehash entries
            const linkedList = newMap[hashKey]; // Assign entries to new buckets

            linkedList.append({
                key: entry,
            });
        };

        map = newMap; // Redefine map
    };

    /**
     * Sets a new value in the hash map.
     * @param {string} key 
     * @param {string} value 
     */
    const set = (key) => {
        if (loadFactor >= 0.75) resize();

        const hashKey = hash(key) % capacity;
        const linkedList = map[hashKey];

        // Check if key already exists
        if (linkedList.contains(key)) return;

        linkedList.append({ key });

        loadFactor = length() / capacity;
    };

    /**
     * Retrieves key's value if it exists.
     * @param {string} key 
     * @returns {string | null}
     */
    const get = (key) => {
        const hashKey = hash(key) % capacity;
        const linkedList = map[hashKey];

        if (linkedList.contains(key)) {
            const index = linkedList.find(key);

            return linkedList.at(index).key;
        };

        return null;
    };

    /**
     * Checks if key exists.
     * @param {string} key 
     * @returns {boolean}
     */
    const has = (key) => {
        const hashKey = hash(key) % capacity;
        const linkedList = map[hashKey];

        return linkedList.contains(key);
    };

    /**
     * Removes an element.
     * @param {string} key 
     * @returns {boolean}
     */
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

    /**
     * Retrieve the size of the hash map.
     * @returns {Number}
     */
    const length = () => {
        let count = 0;

        for (let index = 0; index < capacity; index++) {
            const linkedlist = map[index];

            count += linkedlist.size();
        };

        return count;
    };

    /**
     * Clear the whole hash map.
     */
    const clear = () => {
        for (let index = 0; index < capacity; index++) {
            map[index] = LinkedList();
        };
    };

    /**
     * Retrieves all entries of the hash map.
     * @returns {Array} An array of entries.
     */
    const entries = () => {
        const entry = [];

        for (let index = 0; index < capacity; index++) {
            const linkedList = map[index];
            const size = linkedList.size();

            if (size > 0) {

                for (let jndex = 0; jndex < size; jndex++) {
                    entry.push(linkedList.at(jndex).key);
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
        entries
    };
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