const storage = require('node-persist');
storage.init( /* options ... */)
const cat = require('../models/categoryModel');
const puz = require('../models/puzzlerModel');

exports.adminlogin = async (req, res) => {
    const check = await storage.getItem('login');
    if (check == undefined) {
        if (req.body.email == process.env.EMAIL && req.body.password == process.env.PASSWORD) {
            await storage.setItem('login', true)
            res.status(200).json({
                status: 200,
                message: "Login successful..!",
            })
        } else {
            res.status(201).json({
                status: 201,
                message: "check email and password",
            })
        }
    }
    else {
        res.status(201).json({
            status: 201,
            message: "Amdin Already Login !",
        })
    }
}

exports.adminlogout = async (req, res) => {
    await storage.clear();
    res.status(201).json({
        status: 201,
        message: "Please Login !",
    })
}

exports.insertcat = async (req, res) => {
    const check = await storage.getItem('login');
    if (check != undefined) {
        req.body.cat_image = req.file.originalname;
        const data = await cat.create(req.body);
        res.status(200).json({
            status: 200,
            message: "Category added successfully..!",
            data
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "Please Login",
            data
        })
    }
}

exports.getcat = async (req, res) => {
    const check = await storage.getItem('login');
    if (check != undefined) {
        const data = await cat.find();
        res.status(200).json({
            status: 200,
            message: "Category Get successfully..!",
            data
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "Please Login",
            data
        })
    }
}

exports.updatecat = async (req, res) => {
    const check = await storage.getItem('login');
    if (check != undefined) {
        var id = req.params.id
        const data = await cat.findByIdAndUpdate(id, req.body);
        res.status(200).json({
            status: 200,
            message: "Category Update successfully..!",
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "Please Login",
            data
        })
    }
}

exports.deletecat = async (req, res) => {
    const check = await storage.getItem('login');
    if (check != undefined) {
        var id = req.params.id
        const data = await cat.findByIdAndDelete(id);
        res.status(200).json({
            status: 200,
            message: "Category Deleted successfully..!",
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "Please Login",
            data
        })
    }
}

// puzzle 

exports.insertpuzzle = async (req, res) => {
    const check = await storage.getItem('login');
    if (check != undefined) {

        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let result = req.body.puz_ans;
        let len = (16 - result.length)
        for (let i = 0; i < len; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        let arr = [];
        let val = "";
        for (let i = 0; i < 16; i++) {
            let ran = Math.floor(Math.random() * 16);
            if (arr.indexOf(ran) == -1) {
                arr.push(ran);
                val += result.charAt(ran);
            } else {
                i--;
            }
        }

        req.body.puz_image = req.file.originalname;
        req.body.skip_id = []
        req.body.win_id = [];
        req.body.puz_char = val;

        const data = await puz.create(req.body)
        res.status(200).json({
            status: 200,
            message: "Puzzle Added Successfully..!",
            // result,
            // val,
            data
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "Please Login !"
        })
    }
}

exports.getpuzzle = async (req, res) => {
    const check = await storage.getItem('login')
    if (check != undefined) {
        const data = await puz.find()
        res.status(200).json({
            status: 200,
            message: "View All Puzzle",
            data
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "Please Login !"
        })
    }
}

exports.updatepuzzle = async (req, res) => {
    const check = await storage.getItem('login')
    if (check != undefined) {
        var id = req.params.id
        const data = await puz.findByIdAndUpdate(id,req.body)
        res.status(200).json({
            status: 200,
            message: "Puzzle Updated Successfully..!",
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "Please Login !"
        })
    }
}

exports.deletepuzzle = async (req, res) => {
    const check = await storage.getItem('login')
    if (check != undefined) {
        var id = req.params.id
        const data = await puz.findByIdAndDelete(id)
        res.status(200).json({
            status: 200,
            message: "Puzzle Deleted Successfully..!",
        })
    }
    else {
        res.status(201).json({
            status: 201,
            message: "Please Login !"
        })
    }
}

