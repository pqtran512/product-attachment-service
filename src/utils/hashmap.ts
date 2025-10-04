import { LinkedList } from "src/utils/linkedlist";

export class HashMap<K extends string, V> {
    private buckets: Array<LinkedList<K, V>>
    private capacity: number

    constructor(capacity = 16) {
        this.capacity = capacity
        this.buckets = Array.from({ length: capacity }, () => new LinkedList<K, V>())
    }

    private hash(key: K): number {
        let h = 0;
        for (let i = 0; i < key.length; i++) {
            h = (h * 31 + key.charCodeAt(i)) % this.capacity
        }
        return h
    }

    set(key: K, value: V) {
        this.buckets[this.hash(key)].insertOrUpdate(key, value)
    }

    get(key: K): V | undefined {
        const node = this.buckets[this.hash(key)].find(key)
        return node ? node.value : undefined
    }

    delete(key: K): boolean {
        return this.buckets[this.hash(key)].delete(key)
    }

    has(key: K): boolean {
        return this.get(key) !== undefined
    }

    keys(): K[] {
        return this.buckets.flatMap(b => b.allKeys())
    }

    values(): V[] {
        return this.buckets.flatMap(b => b.allValues())
    }

    entries(): [K, V][] {
        return this.buckets.flatMap(b => b.allEntries())
    }
}