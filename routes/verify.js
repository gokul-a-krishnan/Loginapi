const router = require("express").Router();
const verify = require("./token_verification");
const User = require("../model/User");

router.use("/", verify, async (req, res) => {
  return res.send({
    valid:true,
    status: 200,
    error: null
  });
});

module.exports = router;
