const md5 = require("md5");
const qs = require("qs");
const axios = require("axios");
const Order = require("../../models/Orders"); // Adjust path as needed
const PAYFAST_MERCHANT_ID = "102"; // Replace with your PayFast Merchant ID
const PAYFAST_SECURED_KEY = "zWHjBp2AlttNu1sK"; // Replace with your Secured Key
const PAYFAST_GET_TOKEN_URL =
  "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/GetAccessToken";
const PAYFAST_TRANSACTION_URL =
  "https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction";
const RETURN_URL = "http://localhost:5173/shop/payment-success"; // Adjust as needed
const CANCEL_URL = "http://localhost:5173/shop/payment-cancel"; // Adjust as needed
const NOTIFY_URL = "http://yourdomain.com/api/payfast/notify"; // Your Notify URL (HTTPS is recommended)

const generateSignature = ({
  merchantId,
  securedKey,
  basketId,
  transAmount,
  currencyCode,
}) => {
  const rawString = `${merchantId}${basketId}${securedKey}${transAmount}${currencyCode}`;
  const signature = md5(rawString);
  console.log(`Generated Signature: ${signature}`);
  return signature;
};

// Controller to get access token for PayFast
const getPayFastAccessToken = async (req, res) => {
  try {
    const { orderId, amount, currencyCode } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const merchantId = PAYFAST_MERCHANT_ID;
    const securedKey = PAYFAST_SECURED_KEY;
    const basketId = orderId; // Using orderId as basketId
    const transAmount = parseFloat(amount).toFixed(2);
    const currency = currencyCode || "PKR"; // Default to PKR if not provided

    if (!merchantId || !securedKey || !basketId || !transAmount || !currency) {
      return res
        .status(400)
        .json({ error: "Missing required fields for token generation" });
    }

    const signature = generateSignature({
      merchantId,
      securedKey,
      basketId,
      transAmount,
      currency,
    });

    console.log("Sending GetAccessToken Request:", {
      MERCHANT_ID: merchantId,
      SECURED_KEY: securedKey,
      BASKET_ID: basketId,
      TXNAMT: transAmount,
      CURRENCY_CODE: currency,
    });

    const response = await axios.post(
      PAYFAST_GET_TOKEN_URL,
      qs.stringify({
        MERCHANT_ID: merchantId,
        SECURED_KEY: securedKey,
        BASKET_ID: basketId,
        TXNAMT: transAmount,
        CURRENCY_CODE: currency,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    console.log("response",response);

    if (response.data && response.data.ACCESS_TOKEN) {
      res.json({
        ACCESS_TOKEN: response.data.ACCESS_TOKEN,
        SIGNATURE: signature,
      });
    } else {
      console.error("Error fetching PayFast token:", response.data);
      res.status(500).json({ error: "Failed to get PayFast access token" });
    }
  } catch (error) {
    console.error(
      "Error in getPayFastAccessToken:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to get PayFast access token" });
  }
};

// Controller to handle PayFast return URL (you'll need to adapt verification)
const handlePayFastReturn = async (req, res) => {
  console.log("PayFast Return:", req.query);
  // You'll likely need to verify the transaction using the returned token
  // by calling PayFast's GetTransactionResult API.
  res.redirect("/shop/payment-success"); // Adjust as needed
};

// Controller to handle PayFast notify URL (you'll need to adapt verification)
const handlePayFastNotify = async (req, res) => {
  console.log("PayFast Notify:", req.body);
  // You'll need to implement server-side verification of the transaction details
  // sent by PayFast. This might involve using the token or other parameters.
  res.status(200).send("OK");
};

module.exports = {
  getPayFastAccessToken,
  handlePayFastReturn,
  handlePayFastNotify,
};
