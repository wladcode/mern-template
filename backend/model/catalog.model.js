import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { _id: false } // Disable _id for items
);

const catalogSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    items: [itemSchema],
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Catalog = mongoose.model("Catalog", catalogSchema);

export default Catalog;
