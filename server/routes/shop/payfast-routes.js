const express = require("express");
const {
  getPayFastAccessToken,
  handlePayFastReturn,
  handlePayFastNotify,
} = require("../../controllers/shop/payfast-controller"); // Adjust path

const router = express.Router();
router.post("/get-access-token", getPayFastAccessToken);
router.get("/return", handlePayFastReturn);
router.post("/notify", handlePayFastNotify);

module.exports = router;
