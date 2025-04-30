const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    image: { type: String, required: true },
    isNew: { type: Boolean, default: false },
    isBestseller: { type: Boolean, default: false },
    isOnSale: { type: Boolean, default: false },
    categories: [{ type: String }],
    contents: [{ type: String }],
    soldCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", itemSchema);
