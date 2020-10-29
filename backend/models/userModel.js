import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      default: "123456",
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    runs: [
      {
        runId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Run",
        },
      },
    ],
    profilePhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //ONLY IF password is being updated/created, then salt/encrypt updatedPassword
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
