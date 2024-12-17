import { useState } from 'react';

// Binary Tree Node
class TreeNode {
  constructor(fruit, price) {
    this.fruit = fruit;
    this.price = price;
    this.left = null;
    this.right = null;
  }
}

// Binary Tree to represent Fruits and their Prices
class FruitTree {
  constructor() {
    this.root = null;
  }

  // Insert fruit into the tree (simple binary insertion based on fruit name)
  insert(fruit, price) {
    const newNode = new TreeNode(fruit, price);
    if (this.root === null) {
      this.root = newNode;
    } else {
      this._insertRec(this.root, newNode);
    }
  }

  _insertRec(node, newNode) {
    if (newNode.fruit < node.fruit) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this._insertRec(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this._insertRec(node.right, newNode);
      }
    }
  }

  // Traverse the tree in-order and return fruits and prices in an array
  inOrderTraversal() {
    const fruits = [];
    this._inOrder(this.root, fruits);
    return fruits;
  }

  _inOrder(node, fruits) {
    if (node !== null) {
      this._inOrder(node.left, fruits);
      fruits.push({ fruit: node.fruit, price: node.price });
      this._inOrder(node.right, fruits);
    }
  }
}

// Stack implementation for the cart
class CartStack {
  constructor(maxSize) {
    this.stack = [];
    this.maxSize = maxSize;
  }

  push(item) {
    if (this.stack.length < this.maxSize) {
      this.stack.push(item);
      return true;
    }
    return false; // Stack full
  }

  pop() {
    return this.stack.pop();
  }

  isFull() {
    return this.stack.length === this.maxSize;
  }

  isEmpty() {
    return this.stack.length === 0;
  }

  getItems() {
    return [...this.stack];
  }

  clear() {
    this.stack = [];
  }
}

const Shop = () => {
  const [cartStack] = useState(new CartStack(4)); // Stack instance
  const [cart, setCart] = useState([]); // Used to trigger re-renders
  const [isPurchased, setIsPurchased] = useState(false);

  // Initialize the fruit tree
  const fruitTree = new FruitTree();
  fruitTree.insert('Apple', 20);
  fruitTree.insert('Orange', 15);
  fruitTree.insert('Strawberry', 20);
  fruitTree.insert('Cherry', 25);
  fruitTree.insert('Mango', 10);
  fruitTree.insert('Peach', 40);
  fruitTree.insert('Kiwi', 50);

  // Get all fruits in the tree
  const fruitsInShop = fruitTree.inOrderTraversal();

  // Function to add fruit to the cart (stack)
  const addToCart = (fruit, price) => {
    if (!isPurchased) {
      const isAdded = cartStack.push({ fruit, price });
      if (isAdded) {
        setCart(cartStack.getItems()); // Update cart for re-render
      } else {
        alert('Your cart is full. You can only add 4 fruits.');
      }
    }
  };

  // Function to handle buying fruits
  const buyFruits = () => {
    if (!cartStack.isEmpty()) {
      alert('Fruits bought successfully!');
      setIsPurchased(true); // Disable buy button and Add to Cart buttons
    } else {
      alert('No fruits in the cart.');
    }
  };

  // Calculate total price
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  // Manually group fruits into rows (1 fruit in first row, 2 in second row, 3 in third row)
  const getFruitsInRows = () => {
    const rows = [
      fruitsInShop.slice(0, 1),  // First row: 1 fruit
      fruitsInShop.slice(1, 3),  // Second row: 2 fruits
      fruitsInShop.slice(3, 6),  // Third row: 3 fruits
    ];
    return rows;
  };

  const rows = getFruitsInRows(); // Get the rows of fruits

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans">
      <h2 className="text-3xl font-bold mb-4 text-cente text-whiter underline text-white">.     Welcome to the Shop     .</h2>
      <p className="text-center mb-8 text-white">Browse through the fruits and add them to your cart!</p>

      {/* Cart Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-8">
        <h3 className="text-2xl font-semibold mb-4">Your Cart</h3>
        <div className="space-y-2">
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.fruit}</span> <span>Rs. {item.price}</span>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <strong>Total Price: Rs. {totalPrice}</strong>
        </div>
        <button
          onClick={buyFruits}
          disabled={isPurchased} // Disable button after purchase
          className={`w-full py-2 mt-4 text-white font-semibold rounded-lg ${isPurchased ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 hover:bg-green-400'}`}
        >
          {isPurchased ? 'Purchased' : 'Buy Fruits'}
        </button>
      </div>

      {/* Fruit Tree Display */}
      <h3 className="text-2xl font-semibold mb-4 underline text-white underline-offset-4">.      Fruits Available      .</h3>
      <div className="space-y-6">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-6">
            {row.map((fruitItem, fruitIndex) => (
              <div key={fruitIndex} className="bg-white p-4 rounded-lg shadow-md text-center">
                <div className="text-lg font-semibold mb-2">{fruitItem.fruit}</div>
                <div className="mb-4">Rs. {fruitItem.price}</div>
                <button
                  onClick={() => addToCart(fruitItem.fruit, fruitItem.price)}
                  disabled={isPurchased || cartStack.isFull()} // Disable after purchase or when cart is full
                  className={`w-full py-2 text-white font-semibold rounded-lg ${isPurchased || cartStack.isFull() ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-400'}`}
                >
                  {isPurchased ? 'Purchased' : cartStack.isFull() ? 'Cart Full' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        ))}
        <div className=" w-32 h-96 bg-white justify-center"></div>
      
      </div>
    </div>
  );
};

export default Shop;
