import mongoose from 'mongoose';

const { Schema } = mongoose

const counterSchema = new Schema({
  _id: String,
  seq: Number
});

export default mongoose.models.Counter || mongoose.model("Counter", counterSchema)