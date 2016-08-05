/// <reference path="./typings.d.ts" />
import { DataTree } from './';
describe('Class: DataTree', () => {

  let data = '12345';

  let node: DataTree;

  beforeEach(() => node = new DataTree(data));

  it('should create an instance', () => {
    expect(node instanceof DataTree).toBeTruthy();
  });

  describe('Property: isRoot', () => {

    it('should be true if no parent', () => {
      expect(node.isRoot).toBeTruthy();
    });

    it('should be false if has parent', () => {
      let child = new DataTree('child', node);
      expect(child.isRoot).toBeFalsy();
    });

  });

  describe('Property: isLeaf', () => {

    it('should be true if no children', () => {
      expect(node.isLeaf).toBeTruthy();
    });

    it('should be false if has any child', () => {
      new DataTree('child', node);
      expect(node.isLeaf).toBeFalsy();
    });

  });

  describe('Property: data', () => {

    it('can be setup when construct', () => {
      expect(node.data).toBe(data);
    });

  });

  describe('Method: isolate', () => {

    it('should let node isolated', () => {
      let child = new DataTree('child', node);
      expect(child.parent).toBe(node);
      expect(child.isRoot).toBeFalsy();

      child.isolate();
      expect(child.parent).toBeFalsy();
      expect(child.isRoot).toBeTruthy();
    });

  });

  describe('Method: move', () => {

    it('should move child from parent to anothers', () => {
      let parent = new DataTree('parent');
      let anothers = new DataTree('anothers');
      parent.add(node);
      expect(node.parent).toBe(parent);

      node.move(anothers);
      expect(node.parent).toBe(anothers);
      expect(parent.isLeaf).toBeTruthy();
    });

  });

});
