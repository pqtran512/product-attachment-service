import { Node } from "src/utils/node";

export class LinkedList<K, V> {
    head: Node<K, V> | null = null

    find(key: K): Node<K, V> | null {
        let cur = this.head
        while (cur) {
            if (cur.key === key) return cur
            cur = cur.next
        }
        return null
    }

    insertOrUpdate(key: K, value: V) {
        const node = this.find(key)
        if (node) {
            node.value = value
            return
        }
        this.head = new Node(key, value, this.head)
    }

    delete(key: K): boolean {
        let cur = this.head, 
        prev: Node<K, V> | null = null
        while (cur) {
            if (cur.key === key) {
                if (prev) 
                    prev.next = cur.next
                else 
                    this.head = cur.next
                return true
            }
            prev = cur
            cur = cur.next
        }
        return false
    }

    allKeys(): K[] {
        const res: K[] = []
        let cur = this.head
        while (cur) {
            res.push(cur.key)
            cur = cur.next
        }
        return res
    }

    allValues(): V[] {
        const res: V[] = []
        let cur = this.head
        while (cur) {
            res.push(cur.value)
            cur = cur.next
        }
        return res
    }

    allEntries(): [K, V][] {
        const res: [K, V][] = []
        let cur = this.head
        while (cur) {
            res.push([cur.key, cur.value])
            cur = cur.next
        }
        return res
    }
}