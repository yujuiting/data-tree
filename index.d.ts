export declare type DataTreeIterator = (child: DataTree) => void;
export interface DataTreeJSON {
    children: DataTreeJSON[];
    data: any;
}
export default class DataTree {
    data: any;
    parent?: DataTree;
    children: DataTree[];
    constructor(data: any, parent?: DataTree);
    add(child: DataTree): boolean;
    remove(child: DataTree): boolean;
    has(child: DataTree): boolean;
    forEach(callback: DataTreeIterator): void;
    filter(callback: DataTreeIterator): DataTree[];
    find(callback: DataTreeIterator): DataTree | null;
    some(callback: DataTreeIterator): boolean;
    every(callback: DataTreeIterator): boolean;
    /**
     * It's will try to stringfiy data.
     */
    toJSON(): DataTreeJSON;
}
