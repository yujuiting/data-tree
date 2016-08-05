export type DataTreeIterator = (child: DataTree) => void;

export interface DataTreeJSON {
  children: DataTreeJSON[];
  data: any;
}

export class DataTree {

  children: DataTree[] = [];

  get isRoot(): boolean { return this.parent === null; }

  get isLeaf(): boolean { return this.children.length === 0; }

  constructor(public data: any,
              public parent: DataTree = null) {
    if (parent !== null) {
      parent.add(this);
    }
  }

  isolate(): boolean {
    if (this.parent !== null && !this.parent.remove(this)) {
      return false;
    }
    return true;
  }

  move(newParent: DataTree):boolean {
    if (!this.isolate()) {
      return false;
    }
    if (!newParent.add(this)) {
      return false;
    }
    return true;
  }

  add(newChild: DataTree, deeplyCheck = true): boolean {
    if (this === newChild || this.has(newChild)) {
      return false;
    }
    if (deeplyCheck && this.some( child => child === newChild)) {
      return false;
    }
    this.children.push(newChild);
    newChild.parent = this;
    return true;
  }

  remove(child: DataTree): boolean {
    let index = this.children.indexOf(child);
    if (index === -1) {
      return false;
    }
    this.children.splice(index, 1);
    child.parent = null;
    return true;
  }

  has(child: DataTree): boolean {
    return this.children.indexOf(child) !== -1;
  }

  forEach(callback: DataTreeIterator): void {
    let queue: DataTree[] = [this];
    let curr: DataTree;
    while (queue.length > 0) {
      curr = queue.shift();
      curr.children.forEach(child => queue.push(child));
      callback.call(this, curr);
    }
  }

  filter(callback: DataTreeIterator): DataTree[] {
    let result: DataTree[] = [];
    this.forEach( child => {
      if (callback.call(this, child)) {
        result.push(child);
      }
    });
    return result;
  }

  find(callback: DataTreeIterator): DataTree | null {
    let queue: DataTree[] = [this];
    let curr: DataTree;
    while (queue.length > 0) {
      curr = queue.shift();
      curr.children.forEach(child => queue.push(child));
      if (callback.call(this, curr)) {
        return curr;
      }
    }
    return null;
  }

  some(callback: DataTreeIterator): boolean {
    return this.find(callback) !== null;
  }

  every(callback: DataTreeIterator): boolean {
    let queue: DataTree[] = [this];
    let curr: DataTree;
    while (queue.length > 0) {
      curr = queue.shift();
      curr.children.forEach(child => queue.push(child));
      if (!callback.call(this, curr)) {
        return false;
      }
    }
    return true;
  }

  /**
   * It's will try to stringfiy data.
   */
  toJSON(): DataTreeJSON {
    return {
      children: this.children.map( child => child.toJSON()),
      data: toString.call(this.data)
    };
  }

}
