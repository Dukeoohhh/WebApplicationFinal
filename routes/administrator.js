var express = require("express");
var router = express.Router();
var database = require("../database");
const session = require("express-session");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/login', { title: 'Fat in Peace Administrator' });
});

router.get('/order', function(req, res, next) {
  const totalQueue = req.session.orderQueue || [];
  const totalQueuePay = req.session.totalPayQueue || [];
 const totalQueueMethod = req.session.methodQueue || [];

//  res.send(totalQueue);

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
          res.render("admin/order", {
            title: "Fat in Peace Administrator",
            flavors: flavor_result,
            toppings: topping_result,
            sauces: sauce_result,
            packages: package_result,
            totalQueue: totalQueue,
            totalQueuePay: totalQueuePay,
            totalQueueMethod: totalQueueMethod,
          });
        });
      });
    });
  });
});

router.post("/order/served", (req, res) => {
  const totalQueue = req.session.orderQueue || [];

  // Suppose you have an array named 'items' stored in the session's request body
  const indexToRemove = parseInt(req.body.deleteIndex); // Example index to remove

  // Retrieve the array from the session
  const items = totalQueue;

  // Use splice() to remove the element at the specified index
  items.splice(indexToRemove - 1, 1);

  // Update the session with the modified array
  req.session.cart = items;

  res.redirect("back");
});

router.get('/stock', function(req, res, next) {
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
          // res.send(package_result);

          // Render the EJS template with the query results
          res.render("admin/stock", {
            title: "Fat in Peace Administrator",
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

router.post("/stock/changeStatusPackage", (req, res) => {

  // res.send(req.body.package);

  const updateReady = "UPDATE PACKAGES SET package_status = 1 WHERE PACKAGES.package_id = ?";
  const updateNotReady = "UPDATE PACKAGES SET package_status = 0 WHERE PACKAGES.package_id = ?";

  const packageNum = req.body.package;

  if(req.body.submitBtn === "ready"){
    database.query(updateReady,[packageNum], (err, result) => {
      if(err) {res.send("Error to updata ready")}
      else {res.redirect('back')}
    });
  }

  if(req.body.submitBtn === "outStock"){
    database.query(updateNotReady,[packageNum], (err, result) => {
      if(err) {res.send("Error to updata not ready")}
      else {res.redirect('back')}
    });
  }
});

router.post("/stock/changeStatusFlavor", (req, res) => {

  // res.send(req.body.package);

  const updateReady = "UPDATE FLAVORS SET flavor_status = 1 WHERE FLAVORS.flavor_id = ?";
  const updateNotReady = "UPDATE FLAVORS SET flavor_status = 0 WHERE FLAVORS.flavor_id  = ?";

  const packageNum = req.body.flavor;

  if(req.body.submitBtn === "ready"){
    database.query(updateReady,[packageNum], (err, result) => {
      if(err) {res.send("Error to updata ready")}
      else {res.redirect('back')}
    });
  }

  if(req.body.submitBtn === "outStock"){
    database.query(updateNotReady,[packageNum], (err, result) => {
      if(err) {res.send("Error to updata not ready")}
      else {res.redirect('back')}
    });
  }
});

router.post("/stock/changeStatusTopping", (req, res) => {

  // res.send(req.body.package);

  const updateReady = "UPDATE TOPPINGS SET topping_status = 1 WHERE TOPPINGS.topping_id = ?";
  const updateNotReady = "UPDATE TOPPINGS SET topping_status = 0 WHERE TOPPINGS.topping_id  = ?";

  const packageNum = req.body.flavor;

  if(req.body.submitBtn === "ready"){
    database.query(updateReady,[packageNum], (err, result) => {
      if(err) {res.send("Error to updata ready")}
      else {res.redirect('back')}
    });
  }

  if(req.body.submitBtn === "outStock"){
    database.query(updateNotReady,[packageNum], (err, result) => {
      if(err) {res.send("Error to updata not ready")}
      else {res.redirect('back')}
    });
  }
});

router.post("/stock/changeStatusSauce", (req, res) => {

  // res.send(req.body.package);

  const updateReady = "UPDATE SAUCES SET sauce_status = 1 WHERE SAUCES.sauce_id = ?";
  const updateNotReady = "UPDATE SAUCES SET sauce_status = 0 WHERE SAUCES.sauce_id  = ?";

  const packageNum = req.body.sauce;

  if(req.body.submitBtn === "ready"){
    database.query(updateReady,[packageNum], (err, result) => {
      if(err) {res.send("Error to updata ready")}
      else {res.redirect('back')}
    });
  }

  if(req.body.submitBtn === "outStock"){
    database.query(updateNotReady,[packageNum], (err, result) => {
      if(err) {res.send("Error to updata not ready")}
      else {res.redirect('back')}
    });
  }
});

router.get('/add-menu', function(req, res, next) {
  res.render('admin/addMenu', { title: 'Fat in Peace Administrator' });
});


module.exports = router;
