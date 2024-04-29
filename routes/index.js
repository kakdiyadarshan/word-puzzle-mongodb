var express = require('express');
var router = express.Router();

const multer = require('multer');
const admin = require('../controllers/adminController')

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

/* GET home page. */
router.post('/',admin.adminlogin );
router.get('/logout',admin.adminlogout );
router.post('/addcat', upload.single('cat_image'),admin.insertcat );
router.get('/viewcat',admin.getcat );
router.put('/updatecat/:id',admin.updatecat );
router.delete('/deletecat/:id',admin.deletecat );
router.post('/addpuzzle', upload.single('puz_image'),admin.insertpuzzle );
router.get('/viewpuzzle',admin.getpuzzle );
router.put('/updatepuzzle/:id',admin.updatepuzzle );
router.delete('/deletepuzzle/:id',admin.deletepuzzle );



module.exports = router;
