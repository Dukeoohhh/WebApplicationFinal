var express = require("express");
var router = express.Router();
var database = require("../database");
const session = require("express-session");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("en/home", { title: "Fat in peace" });
});

router.get("/order", function (req, res, next) {
  const flavor_query = "SELECT * FROM flavors";
  const topping_query = "SELECT * FROM toppings";
  const sauce_query = "SELECT * FROM sauces";
  const package_query = "SELECT * FROM packages";

  database.query(flavor_query, (err, flavor_result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }

    database.query(topping_query, (err, topping_result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error executing query");
        return;
      }

      database.query(sauce_query, (err, sauce_result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).send("Error executing query");
          return;
        }

        database.query(package_query, (err, package_result) => {
          if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Error executing query");
            return;
          }

          // Render the EJS template with the query results
          res.render("en/order", {
            title: "Fat in peace",
            flavors: flavor_result,
            toppings: topping_result,
            sauces: sauce_result,
            packages: package_result,
          });
        });
      });
    });
  });
});

router.post("/order/add-to-cart", (req, res, err) => {
  const item = req.body;

  // If cart doesn't exist in session, initialize it
  if (!req.session.cart) {
    req.session.cart = [];
  }

  // res.send(item);

  // Add item to cart
  req.session.cart.push(item);

  // // Redirect back to the page where the item was added
  // // res.send(req.session.cart);
  res.redirect("http://localhost:3000/en/order/cart");
});

// Route to display the items in the cart
router.get("/order/cart", (req, res) => {
  const items = req.session.cart || [];

  const flavor_query = "SELECT * FROM flavors";
  const topping_query = "SELECT * FROM toppings";
  const sauce_query = "SELECT * FROM sauces";
  const package_query = "SELECT * FROM packages";

  database.query(flavor_query, (err, flavor_result) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Error executing query");
      return;
    }

    database.query(topping_query, (err, topping_result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error executing query");
        return;
      }

      database.query(sauce_query, (err, sauce_result) => {
        if (err) {
          console.error("Error executing query:", err);
          res.status(500).send("Error executing query");
          return;
        }

        database.query(package_query, (err, package_result) => {
          if (err) {
            console.error("Error executing query:", err);
            res.status(500).send("Error executing query");
            return;
          }

          // Render the EJS template with the query results
          res.render("en/cart", {
            title: "Fat in peace",
            flavors: flavor_result,
            toppings: topping_result,
            sauces: sauce_result,
            packages: package_result,
            cartItems: items,
          });
        });
      });
    });
  });
});

// Route for the homepage to display cart data
router.post("/order/cart/delete", (req, res) => {
  const cartItems = req.session.cart || [];

  // Suppose you have an array named 'items' stored in the session's request body
  const indexToRemove = parseInt(req.body.deleteIndex); // Example index to remove

  // Retrieve the array from the session
  const items = cartItems;

  // Use splice() to remove the element at the specified index
  items.splice(indexToRemove - 1, 1);

  // Update the session with the modified array
  req.session.cart = items;

  res.redirect("back");
});

router.post("/order/cart/confirm-order", (req, res) => {
  const item = req.body;

  req.session.totalPay = item;

  // res.send(item);

  if (item.totalPrice > 0) {
    res.redirect("http://localhost:3000/en/order/payment");
  } else {
    res.redirect("back");
  }
});

router.get("/order/payment", (req, res) => {
  res.render("en/payment", { title: "Fat in peace" });
});

router.get("/order/payment/cash", (req, res) => {
  const totalPay = req.session.totalPay;
  req.session.method = "Cash";

  res.render("en/paymentList/cash", {
    title: "Fat in peace",
    totalPay: totalPay,
  });
});

router.get("/order/payment/qrcode", (req, res) => {
  const totalPay = req.session.totalPay;
  req.session.method = "qrCode";

  res.render("en/paymentList/qrcode", {
    title: "Fat in peace",
    totalPay: totalPay,
  });
});

router.get("/order/payment/point", (req, res) => {
  const totalPay = req.session.totalPay;
  req.session.method = "Point";

  res.render("en/paymentList/point", {
    title: "Fat in peace",
    totalPay: totalPay,
  });
});

router.get("/order/collectpoint", (req, res) => {
  const totalPay = req.session.totalPay;

  res.render("en/collectpoint", {
    title: "Fat in peace",
    totalPay: totalPay,
  });
});

router.post("/order/submit", (req, res) => {
  const cartItems = req.session.cart || [];
  const AllPay = req.session.totalPay || [];
  const method = req.session.method || [];

  if (!req.session.orderQueue) {
    req.session.orderQueue = [];
  }
  if (!req.session.totalPayQueue) {
    req.session.totalPayQueue = [];
  }
  if (!req.session.methodQueue) {
    req.session.methodQueue = [];
  }

  req.session.orderQueue.push(cartItems);
  req.session.totalPayQueue.push(AllPay);
  req.session.methodQueue.push(method);

  let Pay = AllPay.totalPrice;
  let unitPayTemp = AllPay.unitPrice;
  let points = Pay / 50;

  let unitPay = unitPayTemp.split(",");

  // res.send(unitPay);

  const tel = req.body;

  const telCheckQuery = "SELECT * FROM CUSTOMERS WHERE customer_tel	= ?";

  const newCustomer = "INSERT INTO CUSTOMERS VALUES (?, ?)";
  const oldCustomer = "UPDATE CUSTOMERS SET customer_point = customer_point + ? where customer_tel = ?";

  const orderQuery = "INSERT INTO ORDERS (order_price, customer_tel) VALUES (?, ?)";
  const orderNotMemQuery = "INSERT INTO ORDERS (order_price) VALUES (?)";

  const paymentQuery = "INSERT INTO PAYMENTS (payment_method, payment_amount, order_id) VALUES (?, ?, ?)"

  const orderItemQuery = "INSERT INTO ORDER_ITEMS (order_id, order_item_price) VALUES (?, ?)"


  if (tel.tel_num != "") {
    database.query(telCheckQuery, [tel.tel_num], (err, result) => {
      if (err) {
        res.send(err);
      }

      if (result.length === 0) {
        // Query Customer Table
        database.query(newCustomer, [tel.tel_num, points], (err, result) => {
          if (err) { res.send(err); }

          // Query Order Table
          database.query(orderQuery, [Pay, tel.tel_num], (err, result) => {
            if(err){ res.send(err); } 

            const orderID = result.insertId;

            // Query Payment Table
            database.query(paymentQuery, [method, Pay, orderID], (err, result) => {
              if(err){ res.send(err); } 
            });

            // Query Order Items Table
            for(var i = 0; i < unitPay.length; i++){
              database.query(orderItemQuery, [orderID, unitPay[i]], (err, result) => {
                if(err){ res.send(err); } 
                else { res.render('lastpage', {title: "Fat in peace", orderID: orderID}) }
              });
            }

          });
        });
      } else {

        database.query(oldCustomer, [points, tel.tel_num], (err, result) => {
          if (err) { res.send(err); }
          
          database.query(orderQuery, [Pay, tel.tel_num], (err, result) => {
            if(err){ res.send(err); } 
            
            const orderID = result.insertId;

            database.query(paymentQuery, [method, Pay, orderID], (err, result) => {
              if(err){ res.send(err); } 
            });

            for(var i = 0; i < unitPay.length; i++){
              database.query(orderItemQuery, [orderID, unitPay[i]], (err, result) => {
                if(err){ res.send(err); } 
                else { res.render('lastpage', {title: "Fat in peace", orderID: orderID}) }
              });
            }
          });
        });
      }
    });

  } else {

    database.query(orderNotMemQuery, [Pay], (err, result) => {
      if(err){ res.send(err); } 

      const orderID = result.insertId;

      // Query Payment Table
      database.query(paymentQuery, [method, Pay, orderID], (err, result) => {
        if(err){ res.send(err); } 
      });

      // Query Order Items Table
      for(var i = 0; i < unitPay.length; i++){
        database.query(orderItemQuery, [orderID, unitPay[i]], (err, result) => {
          if(err){ res.send(err); } 
          else { res.render('lastpage', {title: "Fat in peace", orderID: orderID}) }
        });
      }
    });

  }
});

router.post("/order/success", (req, res) => {
  req.session.cart = [];
  req.session.totalPay = [];
  req.session.method = [];
  res.render('thankyou', {title: "Fat in peace"});
});

module.exports = router;
