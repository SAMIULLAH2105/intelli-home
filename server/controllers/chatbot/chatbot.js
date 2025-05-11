const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const myChatbot = async (req, res) => {
  const userMessage = req.body.message;

  const keywords = {
    // IntelliHome-specific keywords
    price:
      "Our smart home gadgets range from $10 to $500, depending on the features and brand. Check product pages for exact pricing.",
    warranty:
      "We offer a 1-year standard warranty on all products, and optional extended warranties are available at checkout.",
    shipping:
      "We provide free shipping on orders above $50. Orders are typically delivered within 3-7 business days.",
    return:
      "We offer a 30-day hassle-free return policy. Just make sure the item is in original condition and packaging.",
    support:
      "Need help? Reach out to support@intellihome.com or use our live chat on the website for quick assistance.",
    hours:
      "Our support team is available Monday to Friday, from 9 AM to 6 PM (excluding public holidays).",
    stock:
      "We try to maintain healthy stock levels. If a product is unavailable, you'll see a restock date on its page.",
    payment:
      "We accept Visa, MasterCard, PayPal, Apple Pay, Google Pay, and major debit cards.",
    discounts:
      "We offer seasonal sales and promo codes. Subscribe to our newsletter for exclusive discount updates.",
    compatibility:
      "Our smart devices support major platforms like Alexa, Google Home, Apple HomeKit, and work with Android/iOS.",
    installation:
      "Most products come with plug-and-play setup. For complex devices, we offer video tutorials and manuals.",
    smart_features:
      "Our devices feature automation, scheduling, remote control, energy monitoring, and voice command support.",
    mobile_app:
      "Download our IntelliHome app from the App Store or Google Play to control and monitor your smart gadgets.",
    energy_saving:
      "Our smart plugs, lights, and thermostats help you save on energy bills by learning and optimizing usage.",
    safety:
      "Our products undergo strict testing and are certified for electrical and network safety.",
    connectivity:
      "Devices use secure Wi-Fi, Zigbee, or Bluetooth connectivity to communicate and integrate seamlessly.",
    bundle:
      "Check out our smart home starter kits that include lights, plugs, and sensors at discounted prices.",

    // General keywords
    hello: "Hello! 👋 Welcome to IntelliHome. How can I help you today?",
    help: "Sure! You can ask me about prices, product compatibility, returns, shipping, support, and more.",
    thank:
      "You're welcome! 😊 Let me know if there’s anything else I can assist you with.",
    bye: "Goodbye! Hope to see you again at IntelliHome. Stay smart!",
    "store policy":
      "Our policy includes 30-day returns, 1-year warranty, and free shipping over $50. View full policy on our website.",
    "refund policy":
      "Return eligible items within 30 days for a full refund. Refunds are processed within 5–7 business days.",
    "order status":
      "You can track your order by logging into your account and visiting the 'My Orders' section.",
    "store locations":
      "We're an online-exclusive store, but we ship nationwide. Our HQ is based in San Francisco, CA.",
    "working hours":
      "Support operates Monday to Friday, 9 AM to 6 PM. Live chat is available during these hours too.",
    "contact us":
      "Email support@intellihome.com or use our chat widget for quick questions during business hours.",
    feedback:
      "We’d love to hear from you! Email feedback@intellihome.com or leave a review on your product page.",
    FAQ: "Visit www.intellihome.com/faq for answers to common questions about our products, orders, and services.",
    "product details":
      "Product pages include specs, features, installation guides, and customer reviews. Let me know which product you need info on!",
  };

  // Check if the message matches any keyword
  for (let keyword in keywords) {
    if (userMessage.toLowerCase().includes(keyword)) {
      return res.json({ response: keywords[keyword] });
    }
  }

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generateText", // Correct Gemini API URL
      {
        prompt: { text: userMessage },
        max_tokens: 50,
      },
      {
        headers: {
          Authorization: `Bearer ${GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const aiResponse =
      response.data.candidates?.[0]?.output ||
      "Sorry, I couldn't generate a response.";
    res.json({ response: aiResponse });
  } catch (error) {
    console.error("Error:", error.message);
    res
      .status(500)
      .json({ response: "Sorry, I couldn't connect to the AI service." });
  }
};

module.exports = { myChatbot };
