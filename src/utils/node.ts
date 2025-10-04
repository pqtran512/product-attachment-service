export class Node<K, V> {
  constructor(
    public key: K,
    public value: V,
    public next: Node<K, V> | null = null
  ) { }
}