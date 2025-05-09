import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import img from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { createNewOrder } from "@/store/shop/order-slice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import axios from "axios";

const PAYFAST_MERCHANT_ID = "102";
const PAYFAST_TRANSACTION_URL ="https://ipguat.apps.net.pk/Ecommerce/api/Transaction/PostTransaction";
const RETURN_URL = "http://localhost:5173/shop/payment-success";
const CANCEL_URL = "http://localhost:5173/shop/payment-cancel";

const ShoppingCheckout = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { toast } = useToast();

  console.log(currentSelectedAddress, "currentSelectedAddress");

  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  const handleInitiatePayFastPayment = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map((singleCartItem) => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price:
          singleCartItem?.salePrice > 0
            ? singleCartItem?.salePrice
            : singleCartItem?.price,
        quantity: singleCartItem?.quantity,
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes,
      },
      orderStatus: "pending",
      paymentMethod: "payfast",
      paymentStatus: "pending",
      totalAmount: totalCartAmount,
      orderDate: new Date(),
      orderUpdateDate: new Date(),
      paymentId: "",
      payerId: "",
    };

    try {
      const response = await dispatch(createNewOrder(orderData));
      if (response?.payload?.success) {
        setIsPaymemntStart(true);
        const orderId = response?.payload?.orderId;

        // Call your backend to get the PayFast access token and signature
        const tokenResponse = await axios.post(
          "http://localhost:5000/api/shop/payfast/get-access-token",
          {
            orderId: orderId,
            amount: totalCartAmount,
            currencyCode: "PKR", // Adjust if needed
          }
        );

        if (
          tokenResponse.data &&
          tokenResponse.data.ACCESS_TOKEN &&
          tokenResponse.data.SIGNATURE
        ) {
          const accessToken = tokenResponse.data.ACCESS_TOKEN;
          const signature = tokenResponse.data.SIGNATURE;

          // Create and submit the form to PayFast
          const form = document.createElement("form");
          form.method = "POST";
          form.action = PAYFAST_TRANSACTION_URL;

          const formDataToSend = {
            CURRENCY_CODE: "PKR", // Adjust if needed
            MERCHANT_ID: PAYFAST_MERCHANT_ID,
            MERCHANT_NAME: "Demo Merchant", // Replace with your actual merchant name
            BASKET_ID: orderId,
            TXNAMT: parseFloat(totalCartAmount).toFixed(2),
            ORDER_DATE: new Date().toISOString(),
            SUCCESS_URL: RETURN_URL,
            FAILURE_URL: CANCEL_URL,
            CHECKOUT_URL: window.location.origin, // Or a specific checkout URL
            EMAIL_ADDRESS: user?.email || "guest@example.com", // Get user email
            MOBILE_NO: currentSelectedAddress?.phone || "03XXXXXXXXX", // Get phone
            VERSION: "MERCHANT-CART-0.1", 
            TXNDESC: "Payment for order", 
            PROCCODE: "00",
            TRAN_TYPE: "ECOMM_PURCHASE",
            TOKEN: accessToken,
            SIGNATURE: signature,
          };

          for (const key in formDataToSend) {
            if (formDataToSend.hasOwnProperty(key)) {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = formDataToSend[key];
              form.appendChild(input);
            }
          }

          document.body.appendChild(form);
          form.submit();
        } else {
          setIsPaymemntStart(false);
          toast({
            title: "Failed to get PayFast token",
            description: tokenResponse.data?.error || "Something went wrong.",
            variant: "destructive",
          });
        }
      } else {
        setIsPaymemntStart(false);
      }
    } catch (error) {
      toast({
        title: "An error occurred",
        description: error.message,
        variant: "destructive",
      });
      setIsPaymemntStart(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} key={item?.productId} />
              ))
            : null}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">Rs.{totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full h-full ">
            <form onSubmit={(e) => e.preventDefault()}>
              <Button
                onClick={handleInitiatePayFastPayment}
                className="w-full mt-4"
                disabled={isPaymentStart}
              >
                {isPaymentStart
                  ? "Processing Payment..."
                  : "Checkout with PayFast"}
              </Button>

              <Button className="w-full mt-4" onClick={() => setOpen(true)}>
                Checkout with Cash on Delivery
              </Button>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Important Notice</DialogTitle>
                    <DialogDescription>
                      <ul>
                        <li>
                          1️⃣ ⚠️ No returns or replacements after delivery.
                        </li>
                        <li>
                          2️⃣ 💵 Pay exact cash; change may not be available.
                        </li>
                        <li>
                          3️⃣ 🚚 Be available to receive and pay on delivery.
                        </li>
                        <li>4️⃣ 📞 Order may require phone verification.</li>
                        <li>5️⃣ ❌ No cancellations after shipping.</li>
                      </ul>
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        setOpen(false);
                        // Implement your Cash on Delivery logic here
                        toast({
                          title: "Cash on Delivery initiated",
                          description:
                            "Your order will be processed for cash on delivery.",
                        });
                      }}
                    >
                      Proceed
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  return <ShoppingCheckout />;
};

export default CheckoutPage;

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Button } from "@/components/ui/button"; // Adjust this import if necessary
// import { useToast } from "@/hooks/use-toast"; // Adjust this import if necessary
// import img from "../../assets/account.jpg"; // Path to your image
// import Address from "@/components/shopping-view/address"; // Path to Address component
// import UserCartItemsContent from "@/components/shopping-view/cart-items-content"; // Path to Cart Items Content
// import { createNewOrder } from "@/store/shop/order-slice"; // Your redux action for creating a new order
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";

// // Stripe-related imports
// import {
//   CardElement,
//   useStripe,
//   useElements,
//   Elements,
// } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

// // Load Stripe outside the component to avoid recreating the object on every render
// const stripePromise = loadStripe(
//   "pk_test_51QfL3NDbAFY0XAAOq8SSugIbjXWiLmsS2fMPeJxlptppFzXkJYnbd7tVbdjwt1We2LFj98h2vpgFBfYrWWaOYzb8003QLgGLB0"
// );

// const ShoppingCheckout = () => {
//   const { cartItems } = useSelector((state) => state.shopCart);
//   const { user } = useSelector((state) => state.auth);
//   const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
//   const [isPaymentStart, setIsPaymemntStart] = useState(false);
//   const [open, setOpen] = useState(false);
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   const stripe = useStripe();
//   const elements = useElements();

//   console.log(currentSelectedAddress, "currentSelectedAddress");

//   const totalCartAmount =
//     cartItems && cartItems.items && cartItems.items.length > 0
//       ? cartItems.items.reduce(
//           (sum, currentItem) =>
//             sum +
//             (currentItem?.salePrice > 0
//               ? currentItem?.salePrice
//               : currentItem?.price) *
//               currentItem?.quantity,
//           0
//         )
//       : 0;

//   const handleInitiateStripePayment = async () => {
//     if (cartItems.length === 0) {
//       toast({
//         title: "Your cart is empty. Please add items to proceed",
//         variant: "destructive",
//       });
//       return;
//     }

//     if (currentSelectedAddress === null) {
//       toast({
//         title: "Please select one address to proceed.",
//         variant: "destructive",
//       });
//       return;
//     }

//     const orderData = {
//       userId: user?.id,
//       cartId: cartItems?._id,
//       cartItems: cartItems.items.map((singleCartItem) => ({
//         productId: singleCartItem?.productId,
//         title: singleCartItem?.title,
//         image: singleCartItem?.image,
//         price:
//           singleCartItem?.salePrice > 0
//             ? singleCartItem?.salePrice
//             : singleCartItem?.price,
//         quantity: singleCartItem?.quantity,
//       })),
//       addressInfo: {
//         addressId: currentSelectedAddress?._id,
//         address: currentSelectedAddress?.address,
//         city: currentSelectedAddress?.city,
//         pincode: currentSelectedAddress?.pincode,
//         phone: currentSelectedAddress?.phone,
//         notes: currentSelectedAddress?.notes,
//       },
//       orderStatus: "pending",
//       paymentMethod: "stripe",
//       paymentStatus: "pending",
//       totalAmount: totalCartAmount,
//       orderDate: new Date(),
//       orderUpdateDate: new Date(),
//       paymentId: "",
//       payerId: "",
//     };

//     try {
//       const response = await dispatch(createNewOrder(orderData));
//       if (response?.payload?.success) {
//         setIsPaymemntStart(true);
//         const clientSecret = response?.payload?.clientSecret;

//         const cardElement = elements.getElement(CardElement);
//         const { error, paymentIntent } = await stripe.confirmCardPayment(
//           clientSecret,
//           {
//             payment_method: {
//               card: cardElement,
//             },
//           }
//         );

//         if (error) {
//           toast({
//             title: "Payment failed",
//             description: error.message,
//             variant: "destructive",
//           });
//         } else if (paymentIntent.status === "succeeded") {
//           toast({
//             title: "Payment successful",
//             variant: "success",
//           });

//           window.location.href = "/shop/payment-success";

//           // You can redirect the user to a confirmation page or handle further logic
//         }
//       } else {
//         setIsPaymemntStart(false);
//       }
//     } catch (error) {
//       toast({
//         title: "An error occurred",
//         description: error.message,
//         variant: "destructive",
//       });
//       setIsPaymemntStart(false);
//     }
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="relative h-[300px] w-full overflow-hidden">
//         <img src={img} className="h-full w-full object-cover object-center" />
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
//         <Address
//           selectedId={currentSelectedAddress}
//           setCurrentSelectedAddress={setCurrentSelectedAddress}
//         />
//         <div className="flex flex-col gap-4">
//           {cartItems && cartItems.items && cartItems.items.length > 0
//             ? cartItems.items.map((item) => (
//                 <UserCartItemsContent cartItem={item} />
//               ))
//             : null}
//           <div className="mt-8 space-y-4">
//             <div className="flex justify-between">
//               <span className="font-bold">Total</span>
//               <span className="font-bold">${totalCartAmount}</span>
//             </div>
//           </div>
//           <div className="mt-4 w-full h-full ">
//             <form onSubmit={(e) => e.preventDefault()}>
//               <CardElement />
//               <Button
//                 onClick={handleInitiateStripePayment}
//                 className="w-full mt-4"
//               >
//                 {isPaymentStart
//                   ? "Processing Stripe Payment..."
//                   : "Checkout with Stripe"}
//               </Button>

//               <Button className="w-full mt-4" onClick={() => setOpen(true)}>
//                 Checkout with Cash on Delivery
//               </Button>

//               <Dialog open={open} onOpenChange={setOpen}>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Important Notice</DialogTitle>
//                     <DialogDescription>
//                       <ul>
//                         <li>
//                           1️⃣ ⚠️ No returns or replacements after delivery.
//                         </li>
//                         <li>
//                           2️⃣ 💵 Pay exact cash; change may not be available.
//                         </li>
//                         <li>
//                           3️⃣ 🚚 Be available to receive and pay on delivery.
//                         </li>
//                         <li>4️⃣ 📞 Order may require phone verification.</li>
//                         <li>5️⃣ ❌ No cancellations after shipping.</li>
//                       </ul>
//                     </DialogDescription>
//                   </DialogHeader>

//                   <DialogFooter>
//                     <Button variant="outline" onClick={() => setOpen(false)}>
//                       Cancel
//                     </Button>
//                     <Button
//                       onClick={() => {
//                         setOpen(false);

//                       }}
//                     >
//                       Proceed
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Wrap the entire Checkout component in the <Elements> provider
// const CheckoutPage = () => {
//   return (
//     <Elements stripe={stripePromise}>
//       <ShoppingCheckout />
//     </Elements>
//   );
// };

// export default CheckoutPage;
