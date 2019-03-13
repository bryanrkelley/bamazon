# Bamazon

# Node.js & MySQL Skills Being Hilighted

## Overview

What I have created is an Amazon-like storefront with MySQL and Node skills. The app will take in orders from customers and deplete stock from the store's inventory. As a bonus, you can run your program as a manager to track what inventory is low, add more stock, or add totally new items!

### Challenge #1: Customer View 

   ![bamazonCustomer.gif](/assets/gifs/Code_Gifs/bamazonCustomer.gif)

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)


4. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

5. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

6. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.

- - -

### Challenge #2: Manager View (Next Level)


* Create a new Node application called `bamazonManager.js`. Running this application will:

  * List a set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.

   ![bamazonCustomer.gif](/assets/gifs/Code_Gifs/bamazonManager_readall.gif)


  * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.

     ![bamazonCustomer.gif](/assets/gifs/Code_Gifs/bamazonManager_lowstock.gif)

  * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.

       ![bamazonCustomer.gif](/assets/gifs/Code_Gifs/bamazonManager_addstock.gif)

  * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.

       ![bamazonCustomer.gif](/assets/gifs/Code_Gifs/bamazonManager_addnewstock.gif)


- - -

**Have Fun!**
