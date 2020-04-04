const router = require("express").Router();
const verify = require("./token_verification");
const User = require("../model/User");

router.get("/", verify, async (req, res) => {
  return res.send({
    valid:true,
    data: "This is Home Page cant be accessed without credential",
    status: 200,
    error: null
  });
});

module.exports = router;
