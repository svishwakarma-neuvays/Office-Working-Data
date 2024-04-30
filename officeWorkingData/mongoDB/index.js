const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/sample")
  .then(() => {
    console.log("connected to mongoDB!!");
  })
  .catch((err) => {
    console.log(err);
  });

const student = new mongoose.Schema({
  name: { type: String, require: true },
  workout: Boolean,
  height: Number,
});

const Student = new mongoose.model("Student", student);

const adder = async () => {
  //   const ss = await Student.create({
  //     name: "aa",
  //     workout: false,
  //     height: 44,
  //   });
//   const ss = await Student.find({height:{$eq:44}});
//   const ss = await Student.find({height:{$gte:5}});
//   const ss = await Student.find({height:{$lte:5}});
  const ss = await Student.find({height:{$in:[5,44]}});
  // const ss = await Student.find({height:{$nin:[5,44]}});
  console.log(ss);
};

adder();
