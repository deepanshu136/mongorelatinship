const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => {
    console.log("Error connecting to Mongo");
    console.log(err);
  });
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  addresses: [
    {
    
      street: String,
      city: String,
      state: String,
      Country: String,
    },
  ],
});

const User = mongoose.model("User", userSchema);

const makeUser = async () => {
  const u = new User({
    firstName: "Deepanshu",
    lastName: "Kumar",
  });
  u.addresses.push({
    street: "Roorkee Haridwar 123Block",
    city: "Roorkee",
    state: "Uttarakhand",
    country: "India",
  });
  const res = await u.save();
  console.log(res);
};

const addAddress = async (id) => {
  const user = await User.findById(id);
  user.addresses.push({
    street: "Roorkee Haridwar 12673Block",
    city: "Roorkee",
    state: "Uttarakhand",
    country: "India",
  });
  const res = await user.save();
  console.log(res);
};

makeUser();
addAddress('65e221141aea1e738f409f2b')