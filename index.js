class Node {
    constructor(data = null, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right; 
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
    sortAndRemoveDupes(array) {
        let noDupesandSortedArr = [...new Set(array)].sort((a,b) =>  a - b);
        return noDupesandSortedArr;
    }
    buildTree(array) {
        let sortedArr = this.sortAndRemoveDupes(array);
        if (sortedArr.length === 0) {
            return null;
        }
        const mid = parseInt(sortedArr.length / 2);
        const root = new Node(
            sortedArr[mid],
            this.buildTree(sortedArr.slice(0, mid)),
            this.buildTree(sortedArr.slice(mid + 1))
        );
        return root;
    }
    insert(value, temp = this.root) {
        if (temp === null) {
            return new Node(value);
        } else if (temp.data < value) {
            temp.right = this.insert(value, temp.right); 
        } else if (temp.data > value) {
            temp.left = this.insert(value, temp.left)
        }
        return temp
    }
    minValue(root) {
        let minv = root.data;
        while (root.left != null) {
          minv = root.left.data;
          root = root.left;
        }
        return minv;
      }
    delete(value, currNode = this.root) {
        if (currNode === null) {
            return currNode;
        }
        if (currNode.data < value) { 
            currNode.right = this.delete(value, currNode.right);
        } else if (currNode.data > value) { 
            currNode.left = this.delete(value, currNode.left);
        } else {
          if (currNode.left === null) {
            return currNode.right;
          }
          else if (currNode.right === null) {
            return currNode.left;
          } else {
            currNode.data = this.minValue(currNode.right);
            currNode.right = this.delete(currNode.data, currNode.right);
          }
        }
        return currNode;
    }
    find(value, temp = this.root) {
      if (temp === null || temp.data === value) {
        return temp;
      }
      if (value < temp.data) {
        return this.find(value, temp.left);
      } else if (value > temp.data) {
        return this.find(value, temp.right); 
      }
    }
    levelOrder(arr = [], queue = [], temp = this.root) {
        if ( temp === null ) {
            return;
        }
        arr.push(temp.data);
        queue.push(temp.left);
        queue.push(temp.right);
        while (queue.length) {
            const level = queue[0];
            queue.shift();
            this.levelOrder(arr, queue, level);
        }
        return arr;
    }
    inorder(arr = [], temp = this.root) {
        if (temp === null) {
            return;
        } 
        if (temp.left) {
            this.inorder(arr, temp.left);
        }
        arr.push(temp.data);
        if (temp.right) {
            this.inorder(arr, temp.right);
        }
        return arr;
    }
    preorder(arr = [], temp = this.root) {
      if (temp === null) {
        return;
    } 
    arr.push(temp.data);
    if (temp.left) {
        this.inorder(arr, temp.left);
    }
    
    if (temp.right) {
        this.inorder(arr, temp.right);
    }
    return arr;
    }
    postorder(arr = [], temp = this.root) {
      if (temp === null) {
        return;
    } 
  
    if (temp.left) {
        this.inorder(arr, temp.left);
    }
    
    if (temp.right) {
        this.inorder(arr, temp.right);
    }
    arr.push(temp.data);
    return arr;
    }
    height(currNode = this.root) {
      if (currNode === null) {
        return -1;
      }
    const leftHeight = this.height(currNode.left);
    const rightHeight = this.height(currNode.right);
    return Math.max(leftHeight, rightHeight) + 1;
    }
    depth(node, root = this.root, level = 0) {
      if (!node) {
        return null;
      }
      if (root === null) {
        return 0;
      }
      if (root.data === node.data) {
        return level;
      
      }
       let count = this.depth(node, root.left, level + 1);
       if (count !== 0) {
        return count;
       }
       return this.depth(node, root.right, level + 1);
    }
    isBalanced(node = this.root) {
      if (node === null) {
        return true;
      }
      const heightDiff = Math.abs(
        this.height(node.left) - this.height(node.right)
      );
      return (
        heightDiff <= 1 && this.isBalanced(node.left) && this.isBalanced(node.right)
      );
    }
    rebalance() {
    if (this.root === null) {
      return;
    }
      const sorted = [...new Set(this.inorder().sort((a, b) => a - b))];
      this.root = this.buildTree(sorted);
    }
}



let tree = new Tree([14, 38, 22, 59]);
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
tree.insert(120);
tree.insert(54);
tree.insert(67);
tree.insert(153);
tree.insert(80);
tree.insert(34);
tree.insert(71);
tree.insert(159);
tree.insert(133);
tree.insert(129);
tree.insert(135);
tree.insert(65);

  tree.delete(120);
  tree.delete(59);
  tree.delete(153);

 console.log(tree.find(34));
 console.log(tree.find(8));
prettyPrint(tree.root);

console.log(tree.levelOrder());
console.log(tree.inorder());
console.log(tree.preorder());
console.log(tree.postorder());

console.log(tree.height(tree.find(135)));
console.log(tree.height(tree.find(80)));
console.log(tree.height(tree.find(159)));
console.log(tree.height(tree.find(34)));
console.log(tree.height(tree.find(65)));
console.log(tree.height(tree.find(38)));

console.log(tree.depth(tree.find(135)));
console.log(tree.depth(tree.find(80)));
console.log(tree.depth(tree.find(159)));
console.log(tree.depth(tree.find(34)));
console.log(tree.depth(tree.find(65)));
console.log(tree.depth(tree.find(38)));

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
prettyPrint(tree.root);
