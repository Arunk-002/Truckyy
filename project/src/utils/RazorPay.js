import axiosInstance from "../axios/axios";
import { notifyError, notifyMessage } from "../toasts/toast";

const RazorpayGateWay = async (user,order) => {
    const options = {
      key: "rzp_test_ZKcJLyt29WoYex",
      amount: order.amount,
      currency: order.currency,
      name: "TruckY",
      description: "Thank you for shopping with us!",
      order_id: order.id,
      handler: async function (response) {
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        const result = await axiosInstance.post(
          "/payments/verify-payment",
          paymentData
        );
        if (result.data.success) {
          notifyMessage("Order Created");
        } else {
          notifyError("Error while creating order");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "7356943811",
      },
      theme: {
        color: "#AF6900",
      },
    };
    const razorpay = new Razorpay(options);
    razorpay.open();
  };

  export default RazorpayGateWay