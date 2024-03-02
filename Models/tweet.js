const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://localhost:27017/relationshipDemo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongo connectio is open");
  })
  .catch((err) => {
    console.log("Mongo connection error");
    console.log(err);
  });

  const userSchema=new Schema({
     username:String,
     age:Number
  })
  const tweetSchema=new Schema({
     text:String,
     likes:Number,
     user: {
        type: Schema.Types.ObjectId,
        ref:'User'
     }
  })

  const User=mongoose.model('User',userSchema);
  const Tweet=mongoose.model('Tweet',tweetSchema);

  //const makeTweets= async()=>{
    // const user=new User({
    //     username:'Harihar Binwal',
    //     age:23
    // })
   // const user=await User.findOne({username:'Harihar Binwal'})
    // const tweet1=new Tweet({
    //     text:" You look Marvelous",
    //     likes:0
    // })
    //const tweet2= new Tweet({text:'Nice looks',likes:1000 })
    //tweet2.user=user;
    // user.save();(not sving user here i simply finding the same user another tweet)
    //tweet2.save();
 // }
 // makeTweets()

 const findTweet= async()=>{
    const t=await Tweet.find({}).populate('user')
    console.log(t);
 }

 findTweet()