import moongose from "mongoose";

const orderSchema = new moongose.Schema(
  {
    orderitems: [
      {
        slug: { type: String, require: true },
        name: { type: String, require: true },
        quantity: { type: Number, require: true },
        Image: { type: String, require: true },
        price: { type: Number, require: true },
        product: {
          type: moongose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
      },
    ],
    shippingAddress: {
      fullName: { type: String, require: true },
      address: { type: String, require: true },
      city: { type: String, require: true },
      postalCode: { type: String, require: true },
      country: { type: String, require: true },
    },
    paymentMethod: { type: String, require: true },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, require: true },
    shippingPrice: { type: Number, require: true },
    taxPrice: { type: Number, require: true },
    totalPrice: { type: Number, require: true },
    user: { type: moongose.Schema.Types.ObjectId, ref: "User", require: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = moongose.model("Order", orderSchema);

export default Order;
