/**
 * Creates a list node.
 * @param {any} data - Data to be stored. 
 * @returns {{
 * value: any,
 * nextNode: ListNode
 * }}
 */
function ListNode(data) {
    let value = data
    let nextNode = null;

    return {
        get value() { return value },
        set value(data) { value = data },
        get nextNode() { return nextNode },
        set nextNode(next) { nextNode = next }
    };
};

/**
 * Creates a linked list. 
 */
function LinkedList() {
    let size = 0;
    let head = null, tail = null;

    function findAt(index, node) {
        let pointer = node

        if (index === 0) return pointer;

        return findAt(index - 1, node.nextNode);
    };

    // =========== // METHODS // =========== //

    /**
     * Appends a new node in the list.
     * @param {any} value Value to be appended in the list 
     */
    const append = (value) => {
        const newNode = ListNode(value);

        // Verifies if the head is null
        if (!head) {
            head = newNode;
            head.nextNode = tail;
            size++;

            return;
        };

        // Verifies if the tail is null
        if (!tail) {
            tail = newNode;
            head.nextNode = tail;
            size++;

            return;
        };

        tail.nextNode = newNode; // Link the current tail to the new node
        tail = newNode; // Redefine tail to the new node
        size++;
    };

    /**
     * Prepends a new node in the list.
     * @param {any} value Value to be prepended in the list 
     */
    const prepend = (value) => {
        const newNode = ListNode(value);

        // Verifies if the head is null
        if (!head) {
            head = newNode;
            head.nextNode = tail;
            size++;

            return;
        };

        newNode.nextNode = head; // Link new node to the current head node
        head = newNode; // Redefine head node to the new node
        size++;
    };

    /**
     * Inserts a new node to a specific place.
     * @param {any} value Any value for the node to be inserted
     * @param {Number} index The index to insert to.
     */
    const insertAt = (value, index) => {
        if (index > size) {
            console.error(`Index is out of bounds. Current size: ${size}`);
            return;
        };

        // Verifies if the index is less than -1
        if (index < 0) {
            console.error(`Index is out of bounds. Negatives are not accepted.`);
            return;
        };

        // Verifies if the node should be prepended.
        if (index === 0) {
            prepend(value);
            return;
        };

        // Verifies if the node should be appended.
        if (index === size) {
            append(value);
            return;
        };

        const beforeNode = findAt(index - 1, head); // Find the node before the given index
        const newNode = ListNode(value); // Create a new node

        newNode.nextNode = beforeNode.nextNode; // Link the next node of the before node to the new node
        beforeNode.nextNode = newNode; // Redefine before node's next node to the new node
        size++
    };

    /**
     * Removes a node in a specific index.
     * @param {Number} index The index of the node to be removed. 
     */
    const removeAt = (index) => {
        // Verify if index is undefined
        if (index === undefined) {
            console.error('Index is undefined.');
            return;
        };

        // Verify if the list is empty or out of bounds
        if (index < 0 || index >= size) {
            console.error('Index out of bounds.');
            return;
        };

        // Verify if the index is the starting index
        if (index === 0) {
            head = head.nextNode; // Redefine head to the node next to head
            size--;

            return;
        };

        const beforeNode = findAt(index - 1, head); // Find the node before the node to be deleted
        const nodeToDelete = beforeNode.nextNode; // Retrieve the to be deleted node from the before node
        const afterNode = nodeToDelete.nextNode; // Retrieve the next node of the to be deleted node

        beforeNode.nextNode = afterNode; // Redefine the next node of the before node
        size--;
    };

    const at = (index) => {
        if (index >= size) {
            console.error(`Index is out of bounds. Current size: ${size}`);
            return;
        };

        return findAt(index, head).value;
    };

    /**
     * Pops the last node
     */
    const pop = () => {
        // Verify if there is only one node left.
        if (size === 1) {
            head = null;
            tail = null;
            size--;

            return;
        };

        const newTailNode = findAt(size - 2, head); // Find the node before the to be deleted node

        newTailNode.nextNode = null; // Redefine the before node's next node
        tail = newTailNode; // Redefine tail to the before node
        size--;
    };

    /**
     * Checks if the given value exists in the list.
     * @param {any} key 
     * @returns A boolean value.
     */
    const contains = (key) => {
        let pointer = head;

        // Verifies if the list is empty
        if (!pointer) return false;

        while (pointer.value.key !== key) {
            pointer = pointer.nextNode;

            if (!pointer) return false;
        };

        return true;
    };

    /**
     * Finds the index of the given value.
     * @param {any} key  
     * @returns The index if it exists and -1 if not.
     */
    const find = (key) => {
        let index = 0;
        let pointer = head;

        // Verifies if the list is empty
        if (!pointer) return -1;

        while (pointer.value.key !== key) {
            pointer = pointer.nextNode;
            index++

            if (!pointer) return -1;
        };

        return index;
    };

    /**
     * Creates a string of the node list in the console.
     */
    const toString = () => {
        let string = '(head) => ';
        let pointer = head;

        // Verifies if the list is empty
        if (!pointer) {
            console.log(string += '(null)');
            return;
        };

        while (pointer) {
            string += `(Key: ${pointer.value.key} || Value: ${pointer.value.value}) => `;
            pointer = pointer.nextNode;
        };

        string += '(null)';

        console.log(string);
    };

    return {
        size: () => size,
        head: () => head,
        tail: () => tail,
        append,
        prepend,
        insertAt,
        pop,
        removeAt,
        at,
        contains,
        find,
        toString
    };
};

export default LinkedList;