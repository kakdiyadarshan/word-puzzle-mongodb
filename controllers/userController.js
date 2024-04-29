const bcrypt = require("bcrypt");
const storage = require("node-persist");
storage.init(/* options ... */);
``;
const jwt = require("jsonwebtoken");
const user = require("../models/userModel");
const cat = require("../models/categoryModel");
const puz = require("../models/puzzlerModel");

exports.insertuser = async (req, res) => {
  var b_pass = await bcrypt.hash(req.body.password, 10);
  req.body.password = b_pass;
  const data = await user.create(req.body);
  res.status(200).json({
    status: 200,
    message: "User Registered Successfully..!",
    data,
  });
};

exports.login = async (req, res) => {
  const data = await user.find({ email: req.body.email });
  if (data.length == 1) {
    bcrypt.compare(
      req.body.password,
      data[0].password,
      async (error, result) => {
        if (result == true) {
          const getcat = await cat.find();
          await storage.setItem("login", data[0]);
          var token = jwt.sign({ id: data[0].id }, "token_key");
          res.status(200).json({
            status: 200,
            message: "Login Successfully..!",
            token,
            getcat,
          });
        } else {
          res.status(201).json({
            status: 201,
            message: "check Email & Password",
          });
        }
      }
    );
  } else {
    res.status(201).json({
      status: 201,
      message: "check Email & Password",
    });
  }
};

exports.viewpuzzle = async (req, res) => {
  const check = await storage.getItem("login");
  if (check != undefined) {
    var id = req.params.id;
    const data = await puz.find({ puz_cat: id });
    res.status(200).json({
      status: 200,
      message: "view puzzle",
      data,
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "Please Login !",
    });
  }
};

exports.startgame = async (req, res) => {
  const check = await storage.getItem("login");
  if (check != undefined) {
    var id = req.params.id;
    const data = await puz.findById(id);
    var obj = {
      puz_name: data.puz_name,
      puz_char: data.puz_char,
      puz_cat: data.puz_cat,
      puz_img: data.puz_image,
    };
    res.status(200).json({
      status: 200,
      message: "view single puzzle",
      obj,
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "Please Login !",
    });
  }
};

exports.checkans = async (req, res) => {
  const check = await storage.getItem("login");
  if (check != undefined) {
    var id = req.params.id;
    const data = await puz.findById(id);
    if (data.puz_ans == req.body.ans) {
      let arr = data.win_id;
      arr.push(check._id);
      await puz.findByIdAndUpdate(id, { win_id: arr });
      res.status(200).json({
        status: 200,
        message: "Correct The Answer",
      });
    } else {
      res.status(201).json({
        status: 201,
        message: "Not Correct The Answer",
      });
    }
  } else {
    res.status(201).json({
      status: 201,
      message: "Please Login !",
    });
  }
};

exports.skippuz = async (req, res) => {
  const check = await storage.getItem("login");
  if (check != undefined) {
    var id = req.params.id;
    const data = await puz.findById(id);
    let arr = data.skip_id;
    arr.push(check._id);
    await puz.findByIdAndUpdate(id, { skip_id: arr });
    res.status(200).json({
      status: 200,
      message: "Skip the puzzle",
    });
  } else {
    res.status(201).json({
      status: 201,
      message: "Please Login !",
    });
  }
};
