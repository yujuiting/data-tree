export type DataTreeIterator = (child: DataTree) => void;
export type DataTreeFilter = (child: DataTree) => boolean;

export interface DataTreeJSON {
  children: DataTreeJSON[];
  data: any;
}

export class DataTree {

  children: DataTree[] = [];

  get isRoot(): boolean { return this.parent === null; }

  get isLeaf(): boolean { return this.children.length === 0; }

  static parse(src: DataTreeJSON): DataTree {
    let dataTree = new DataTree(JSON.parse(src.data));

    src.children.forEach(childSrc => dataTree.add(DataTree.parse(childSrc)));

    return dataTree;
  }

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

  move(newParent: DataTree): boolean {
    this.isolate();

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

  filter(filter: DataTreeFilter): DataTree[] {
    let result: DataTree[] = [];
    this.forEach( child => {
      if (filter.call(this, child)) {
        result.push(child);
      }
    });
    return result;
  }

  find(filter: DataTreeFilter): DataTree | null {
    let queue: DataTree[] = [this];
    let curr: DataTree;
    while (queue.length > 0) {
      curr = queue.shift();
      curr.children.forEach(child => queue.push(child));
      if (filter.call(this, curr)) {
        return curr;
      }
    }
    return null;
  }

  findParent(filter: DataTreeFilter): DataTree | null {
    let queue: DataTree[] = [this];
    let current: DataTree;
    while (queue.length > 0) {
      current = queue.shift();
      if (!!current.parent) {
        queue.push(current.parent);
      }
      if (filter(current)) {
        return current;
      }
    }
  }


  some(filter: DataTreeFilter): boolean {
    return this.find(filter) !== null;
  }

  every(filter: DataTreeFilter): boolean {
    let queue: DataTree[] = [this];
    let curr: DataTree;
    while (queue.length > 0) {
      curr = queue.shift();
      curr.children.forEach(child => queue.push(child));
      if (!filter.call(this, curr)) {
        return false;
      }
    }
    return true;
  }

  toJSON(): DataTreeJSON {
    return {
      children: this.children.map( child => child.toJSON()),
      data: JSON.stringify(this.data)
    };
  }

}
