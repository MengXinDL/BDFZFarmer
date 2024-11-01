export declare class TreeNode {
    children: TreeNode[];
    parents: TreeNode[];
    isRoot: boolean;
    constructor();
    appendChild(child: TreeNode): void;
    deleteChild(child: TreeNode): void;
    get root(): TreeNode;
}
