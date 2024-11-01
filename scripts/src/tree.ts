export class TreeNode {
    children: TreeNode[] = [];
    parents: TreeNode[] = [];
    isRoot: boolean = true;
    constructor() {}
    appendChild(child: TreeNode) {
        this.children.push(child);
        child.parents.push(this);
        child.isRoot = false;
    }
    deleteChild(child: TreeNode) {
        let index = this.children.indexOf(child);
        if (index !== -1) {
            child.parents.splice(child.parents.indexOf(this), 1);
            this.children.splice(index, 1);
            child.isRoot = child.parents.length === 0;
        }
    }
    get root(): TreeNode {
        return this.isRoot ? this : this.parents[0].root;
    }
}