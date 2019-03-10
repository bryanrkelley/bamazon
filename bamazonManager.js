//Load the NPM inquirer package
const inquirer = require('inquirer');
const mysql = require('mysql');

//TODO: Hide my password....
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '93PennyDog!',
    database: 'bamazonDB',
    port: 3306
});

connection.connect(function (err) {
    if (err) throw err;
    runSearch();
});

//List a menu for the manager
function runSearch() {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'View Products',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Exit the program'
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case 'View Products':
                    readAll();
                    break;

                case 'View Low Inventory':
                    lowInventory();
                    break;

                case 'Add to Inventory':
                    addInventory();
                    break;

                case 'Add New Product':
                    addNewInput();
                    break;

                case 'Exit the program':
                    connection.end();
                    break;
            }
        })
};
//-----------------------END PROMPT------------------

//--------------------START FUNCTIONS----------------

//Show all current items, their price and quantity.
function readAll() {
    console.log('Searching Stock...\n');
    var query = 'SELECT * FROM products'
    connection.query(query,
        function (err, res) {
            if (err) throw err;

            console.table(res);

            runSearch();
        });
};

//Check to see what is in low stock and has less than 5 units
function lowInventory() {
    console.log('We are low on the following...\n');
    var query = 'SELECT * FROM products WHERE stock_quantity < 5'
    connection.query(query,
        function (err, res) {
            if (err) throw err;

            console.table(res);

            runSearch();
        });
};

//Add additional inventory to the products on the list
function addInventory() {
    console.log('Adding...\n');
    var query = 'SELECT * FROM products'
    connection.query(query,
        function (err, res) {
            if (err) throw err;

            inquirer
                .prompt([{
                        name: 'choice',
                        type: 'rawlist',
                        choices: function () {
                            let choicesArray = [];
                            for (let i = 0; i < res.length; i++) {
                                choicesArray.push(res[i].product_name);
                            }
                            return choicesArray;
                        },
                        message: 'What item would you like to add more stock to?'
                    },
                    {
                        name: 'numStock',
                        type: 'input',
                        message: 'How much would you like to add?',
                        validate: function (value) {
                            if (isNaN(value) === false) {
                                return true;
                            }
                            return false;
                        }
                    }
                ])
                .then(function (answer) {
                    var chosenItem;
                    for (var i = 0; i < res.length; i++) {
                        if (res[i].product_name === answer.choice) {
                            chosenItem = res[i];
                        }
                    }
                    let newStock = parseInt(answer.numStock) + chosenItem.stock_quantity;
                    var query = 'UPDATE products SET ? WHERE ?';
                    connection.query(query, [{
                                stock_quantity: newStock
                            },
                            {
                                product_name: answer.choice
                            }
                        ],
                        function (err) {
                            if (err) throw err;
                            console.log('Stock has been updated!');

                            runSearch();
                        })
                })
            console.table(res);
        });
};

//Input for the new item to be added
function addNewInput() {
    inquirer
        .prompt([{
                type: 'input',
                message: 'What is the product?',
                name: 'product_name'
            },
            {
                type: 'input',
                message: 'What is the department?',
                name: 'department_name'
            },
            {
                type: 'input',
                message: 'What is the price of the product?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
                name: 'price'
            },
            {
                type: 'input',
                message: 'How much of the product do you want to stock initially?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                },
                name: 'stock_quantity'
            },
            // Here we ask the user to confirm.
            {
                type: 'confirm',
                message: 'Are you sure:',
                name: 'confirm',
                default: true
            }
        ])
        .then(function (inquirerResponse) {
            // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
            if (inquirerResponse.confirm) {
                //console.log(inquirerResponse);
                addNew(inquirerResponse);
            } else {
                console.log("\nThat's okay, come again when you are more sure.\n");
            }
        });
}

//Add a new product to the list of wares
function addNew(products) {
    console.log('Adding a new item...\n');
    var query = 'INSERT INTO products SET ?';
    connection.query(query, {
            product_name: products.product_name,
            department_name: products.department_name,
            price: products.price,
            stock_quantity: products.stock_quantity
        },
        function (err, res) {
            if (err) throw err;

            console.log(`The ${products.product_name} in the ${products.department_name} department has been added.  You have added ${products.stock_quantity} at $${products.price} each.\n`);

            runSearch();
        });
};