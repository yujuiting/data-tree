"use strict";
var DataTree = (function () {
    function DataTree(data, parent) {
        this.data = data;
        this.parent = parent;
        this.children = [];
    }
    DataTree.prototype.add = function (child) {
        if (this.has(child)) {
            return false;
        }
        return this.children.push(child) > 0;
    };
    DataTree.prototype.remove = function (child) {
        var index = this.children.indexOf(child);
        if (index === -1) {
            return false;
        }
        this.children.splice(index, 1);
        return true;
    };
    DataTree.prototype.has = function (child) {
        return this.children.indexOf(child) !== -1;
    };
    DataTree.prototype.forEach = function (callback) {
        var queue = [this];
        var curr;
        while (queue.length > 0) {
            curr = queue.shift();
            curr.children.forEach(function (child) { return queue.push(child); });
            callback.call(this, curr);
        }
    };
    DataTree.prototype.filter = function (callback) {
        var _this = this;
        var result = [];
        this.forEach(function (child) {
            if (callback.call(_this, child)) {
                result.push(child);
            }
        });
        return result;
    };
    DataTree.prototype.find = function (callback) {
        var queue = [this];
        var curr;
        while (queue.length > 0) {
            curr = queue.shift();
            curr.children.forEach(function (child) { return queue.push(child); });
            if (callback.call(this, curr)) {
                return curr;
            }
        }
        return null;
    };
    DataTree.prototype.some = function (callback) {
        return this.find(callback) !== null;
    };
    DataTree.prototype.every = function (callback) {
        var queue = [this];
        var curr;
        while (queue.length > 0) {
            curr = queue.shift();
            curr.children.forEach(function (child) { return queue.push(child); });
            if (!callback.call(this, curr)) {
                return false;
            }
        }
        return true;
    };
    /**
     * It's will try to stringfiy data.
     */
    DataTree.prototype.toJSON = function () {
        return {
            children: this.children.map(function (child) { return child.toJSON(); }),
            data: toString.call(this.data)
        };
    };
    return DataTree;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DataTree;
//# sourceMappingURL=index.js.map