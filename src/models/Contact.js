import mongoose from "mongoose";

const { Schema } = mongoose;

const contactSchema = new Schema({
  name: {
    type: String,
    required: [true, "الاسم مطلوب"],
    trim: true,
    minlength: [2, "يجب أن يحتوي الاسم على حرفين على الأقل"]
  },
  email: {
    type: String,
    required: [true, "البريد الإلكتروني مطلوب"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "البريد الإلكتروني غير صحيح"]
  },
  phone: {
    type: String,
    trim: true,
    default: ""
  },
  subject: {
    type: String,
    trim: true,
    default: ""
  },
  message: {
    type: String,
    required: [true, "الرسالة مطلوبة"],
    trim: true,
    minlength: [10, "يجب أن تحتوي الرسالة على 10 أحرف على الأقل"]
  }
}, { 
  timestamps: true 
});

export default mongoose.models.Contact || mongoose.model("Contact", contactSchema);

