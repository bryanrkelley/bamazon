//Load the NPM inquirer package
require('dotenv').config();

const inquirer = require('inquirer');
const mysql = require('mysql');

var keys = require("./keys.js");


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: keys.secret,
    database: 'bamazonDB',
    port: 3306
});

connection.connect(function (err) {
    if (err) throw err;
    readAll();
});


//Show All products available to customer
function readAll() {
    console.log('Searching Stock...\n');
    var query = 'SELECT * FROM products'
    connection.query(query,
        function (err, res) {
            if (err) throw err;

            console.table(res);

            userPrompt();
        })
};

//-----------------------------PROMPT------------------------------------

function userPrompt() {
    inquirer.prompt([{
                name: 'id',
                type: 'input',
                message: 'What is the number ID of the product you want to buy?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'How many units of the product would you like to buy?',
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: 'confirm',
                type: 'confirm',
                message: 'Are you sure:',
                default: true
            }
        ])
        .then(function (search) {
            if (search.confirm) {
                searchInventory(search.id, search.quantity);
            } else {
                console.log('\n That is okay.  Let us know when you are ready to purchase!')
            }
        })
}

//--------------FUNCTIONS------------

//Searches inventory and and takes items if there is enough quantity
function searchInventory(id, quantity) {
    var query = 'SELECT * FROM products';
    connection.query(query,
        function (err, res) {
            if (err) throw err;
            var itemId = parseInt(id);
            var quantityItem = parseInt(quantity);
            var pickedItem;
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === itemId) {
                    pickedItem = res[i];
                }
            }
            //If there isn't enough quantity it will tell them to start over
            if (pickedItem.stock_quantity < quantityItem) {
                console.log('We do not have enough of those in stock!')
                userPrompt();
            } else {
                submitOrder(pickedItem, quantityItem);
            }
        });
};


//Upon submitting the amount and confirming it will tally up the total cost to the customer
function submitOrder(pickedItem, quantityItem) {
    let newStock = pickedItem.stock_quantity - quantityItem;
    let totalPrice = pickedItem.price * quantityItem;
    var query = 'UPDATE products SET ? WHERE ?'
    connection.query(query, [{
            stock_quantity: newStock
        },
        {
            item_id: pickedItem.item_id
        }
    ], function (err) {
        if (err) throw err;
        console.log(`You bought ${quantityItem} units of the ${pickedItem.product_name}.  You spent $${totalPrice}.`);
        connection.end();
    })
};