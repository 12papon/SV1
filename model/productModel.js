import mongoose from "mongoose";
import slugify from "slugify";

const prductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    slug: { type: String, trim: true },
  },
  { timestamps: true },
);

//pre-hook
prductSchema.pre("save", async function () {
  if (this.isModified("name")) {
    this.slug = slugify(this.name, { lower: true, strict: true, trim: true });
  }
  this.updatedAt = Date.now();
});
//post hook
prductSchema.post("save", async function (doc) {
  console.log(doc);
});

export default mongoose.model("Product", prductSchema);
