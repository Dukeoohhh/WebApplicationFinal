var express = require("express");
var router = express.Router();
var database = require("../database");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("th/home", { title: "Fat in Peace EN" });
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
          res.render("th/order", {
            title: "Fat in Peace EN",
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

  // Add item to cart
  req.session.cart.push(item);

  // Redirect back to the page where the item was added
  // res.send(req.session.cart);
  res.redirect("http://localhost:3000/th/order/cart");
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
          res.render("th/cart", {
            title: "Cart",
            flavors: flavor_result,
            toppings: topping_result,
            sauces: sauce_result,
            packages: package_result,
            cartItems: items
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

  res.redirect('back');

});

router.post("/order/cart/confirm-order", (req, res) => {
  const item = req.body;

  req.session.totalPay = item;

  res.redirect("http://localhost:3000/th/order/payment");
});

router.get("/order/payment", (req, res) => {
  res.render('th/payment', {title: "Payment"});
});

router.get("/order/payment/cash", (req, res) => {
  const totalPay = req.session.totalPay;

  res.render('th/paymentList/cash', {title: "Pay with cash", totalPay: totalPay});
});

router.get("/order/payment/qrcode", (req, res) => {
  const totalPay = req.session.totalPay;

  res.render('th/paymentList/qrcode', {title: "Pay with qrcode", totalPay: totalPay});
});

router.get("/order/payment/point", (req, res) => {
  const totalPay = req.session.totalPay;

  res.render('th/paymentList/point', {title: "Pay with truemoney", totalPay: totalPay});
});

router.get("/order/collectpoint", (req, res) => {
  const totalPay = req.session.totalPay;

  res.render('th/collectpoint', {title: "Collecting point", totalPay: totalPay});
});

module.exports = router;
