let inventory = [
    { productId: "P001", name: "Laptop", price: 1200, quantity: 5, category: "Electronics" },
    { productId: "P002", name: "Smartphone", price: 800, quantity: 10, category: "Electronics" },
    { productId: "P003", name: "Headphones", price: 150, quantity: 25, category: "Accessories" },
    { productId: "P004", name: "Office Chair", price: 300, quantity: 3, category: "Furniture" },
    { productId: "P005", name: "Monitor", price: 200, quantity: 7, category: "Electronics" },
    { productId: "P006", name: "Keyboard", price: 50, quantity: 15, category: "Accessories" }
];

// Function to add a new product to the inventory
function addProduct() {
    const id = document.getElementById('productId').value;
    const name = document.getElementById('productName').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const category = document.getElementById('productCategory').value;

    if (!id || !name || price <= 0 || quantity < 0 || !category) {
        alert("Please provide valid input for all fields.");
        return;
    }

    inventory.push({ productId: id, name: name, price: price, quantity: quantity, category: category });
    displayInventory();
}

// Function to display the inventory in a table
function displayInventory() {
    const productList = document.getElementById('productList');
    productList.innerHTML = '';  // Clear previous list

    inventory.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.productId}</td>
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.quantity}</td>
            <td>${product.category}</td>
        `;
        productList.appendChild(row);
    });
}

// Initial inventory display
window.onload = function() {
    displayInventory();
};

// Sorting by price (Descending)
function sortPrice() {
    inventory.sort((a, b) => b.price - a.price);
    displayInventory();
}

// Sorting by name (Alphabetical)
function sortName() {
    inventory.sort((a, b) => a.name.localeCompare(b.name));
    displayInventory();
}

// Sorting by quantity (Ascending)
function sortQuantity() {
    inventory.sort((a, b) => a.quantity - b.quantity);
    displayInventory();
}

// Recursive Binary Search by Product ID
function searchProductById() {
    const searchId = document.getElementById('searchId').value;
    const result = binarySearch(inventory, searchId, 0, inventory.length - 1);
    const searchResult = document.getElementById('searchResult');
    if (result !== -1) {
        searchResult.textContent = `Product Found: ${inventory[result].name}, Price: $${inventory[result].price}, Quantity: ${inventory[result].quantity}`;
    } else {
        searchResult.textContent = "Product not found!";
    }
}

function binarySearch(arr, id, left, right) {
    if (right >= left) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid].productId === id) {
            return mid;
        } else if (arr[mid].productId > id) {
            return binarySearch(arr, id, left, mid - 1);
        } else {
            return binarySearch(arr, id, mid + 1, right);
        }
    }
    return -1;
}
