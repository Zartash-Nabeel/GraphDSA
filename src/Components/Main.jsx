import { useState, useEffect } from "react";
import ConnectedDivs from "./ConnectedDivs"; 
import Shop from "./Shop"; 
import Library from "./Library"; 

// Graph class to store nodes and directed edges
class Graph {
  constructor() {
    this.nodes = {};
  }

  addNode(node) {
    if (!this.nodes[node]) {
      this.nodes[node] = [];
    }
  }

  // Add directed edge
  addEdge(node1, node2, weight) {
    this.addNode(node1);
    this.addNode(node2);
    this.nodes[node1].push({ node: node2, weight });
  }

  // Dijkstra's algorithm to find the shortest path
  dijkstra(start, end) {
    let distances = {};
    let previous = {};
    let pq = new PriorityQueue();

    // Initialize distances and pq
    for (let node in this.nodes) {
      distances[node] = node === start ? 0 : Infinity;
      previous[node] = null;
      pq.enqueue(node, distances[node]);
    }

    while (!pq.isEmpty()) {
      let currentNode = pq.dequeue().element;
      if (currentNode === end) break;

      for (let neighbor of this.nodes[currentNode]) {
        let alt = distances[currentNode] + neighbor.weight;
        if (alt < distances[neighbor.node]) {
          distances[neighbor.node] = alt;
          previous[neighbor.node] = currentNode;
          pq.enqueue(neighbor.node, distances[neighbor.node]);
        }
      }
    }

    // Backtrack to get the path
    let path = [];
    let current = end;
    while (previous[current]) {
      path.unshift(current);
      current = previous[current];
    }
    if (path.length) path.unshift(start);

    return path;
  }
}

// Priority Queue for Dijkstra's algorithm
class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(element, priority) {
    this.queue.push({ element, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.queue.shift();
  }

  isEmpty() {
    return this.queue.length === 0;
  }
}

const Main = () => {
  const graph = new Graph();

  // Add nodes and directed edges
  graph.addEdge("My House", "Friend House", 3);
  graph.addEdge("My House", "Library", 8);
  graph.addEdge("Friend House", "Shop", 4);    // Ensure Friend House -> Shop
  graph.addEdge("Friend House", "Library", 8); // Friend House -> Library
  graph.addEdge("Friend House", "My House", 2); // One-way edge
  graph.addEdge("Shop", "Library", 7);         // Ensure Shop -> Library
  graph.addEdge("Library", "Friend House", 6); // One-way edge

  // Initializing state for current place
  const [currentPlace, setCurrentPlace] = useState("My House");
  const [path, setPath] = useState([]);
  const [divcolor, setDivColor] = useState(1);

  // Map current place to a number (1: My House, 2: Shop, 3: Friend House, 4: Library)
  const updateDivColor = (place) => {
    switch (place) {
      case "My House":
        setDivColor(1);
        break;
      case "Shop":
        setDivColor(2);
        break;
      case "Friend House":
        setDivColor(3);
        break;
      case "Library":
        setDivColor(4);
        break;
      default:
        setDivColor(1);
        break;
    }
  };

  // Get all places except the current place
  const getAllOtherPlaces = (current) => {
    return Object.keys(graph.nodes).filter(place => place !== current);
  };

  // Handle the movement through intermediate locations with delay
  const moveTo = (start, destination) => {
    let shortestPath = [];


    // Hardcoding path through Shop for Friend House to Library
    if (start === "Friend House" && destination === "Library") {
      shortestPath = ["Friend House", "Shop", "Library"];
    } else {
      // Use Dijkstra's algorithm for shortest path
      shortestPath = graph.dijkstra(start, destination);
    }

    setPath(shortestPath);
  };

  useEffect(() => {
    if (path.length > 0) {
      let currentIndex = 0;

      const move = () => {
        setCurrentPlace(path[currentIndex]);
        updateDivColor(path[currentIndex]); // Update the divcolor state based on the path
        currentIndex++;

        if (currentIndex < path.length) {
          setTimeout(move, 1000); // Delay of 1 second between each move
        }
      };

      move(); // Start the movement sequence
    }
  }, [path]);

  // Trigger movement when clicking a button (e.g., to go to Shop)
  const handleMove = (destination) => {
    moveTo(currentPlace, destination);
  };

  // Get all other places except the current place
  const otherPlaces = getAllOtherPlaces(currentPlace);

  return (
    <div className="flex flex-wrap items-center justify-center">
      <div className="w-[38%] flex  h-[600px] flex-col pl-8 justify-center">
        <div className="text-xl mb-4 w-[36%]">
          <strong className="text-nowrap underline decoration-2 underline-offset-2 text-[28px] ">Current Place: </strong> 
          <span className="text-white underline decoration-white text-nowrap font-bold text-2xl">{currentPlace}</span>
        </div>

        <div className="w-full">
          <h3 className="text-lg font-semibold text-white underline decoration-white">Available Places to Move:</h3>
          <div className="flex flex-col items-start mt-4">
            {otherPlaces.length > 0 ? (
              otherPlaces.map((place, index) => (
                <button
                  key={index}
                  onClick={() => handleMove(place)}
                  className={`px-4 py-2 m-2 rounded ${place === currentPlace ? 'bg-gray-300' : 'bg-blue-500'} text-white`}
                >
                  Go to {place}
                </button>
              ))
            ) : (
              <p>No available moves from here.</p>
            )}
          </div>
        </div>
      </div>

      <ConnectedDivs divcolor={divcolor} />

      {/* Conditionally render the Shop and Library components based on current place */}
      {currentPlace === "Shop" && <Shop />}
      {currentPlace === "Library" && <Library />}
    </div>
  );
};

export default Main;
