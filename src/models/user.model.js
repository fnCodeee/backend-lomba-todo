import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: Schema.Types.String,
    required: true
  }, 
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true
  },
  password: {
    type: Schema.Types.String,
    required:true
  }
})

const userModel = mongoose.model("User", userSchema);

export default userModel;