const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var bcrypt = require('bcryptjs');
var session = require('express-session')



const app = express();
app.use(session({
  secret: 'oI2oS8nT8qZ9vV8j',
  resave: false,
  saveUninitialized: true,
}));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

//connection with mongodb
const mongoose = require('mongoose');
mongoose.connect(
  'mongodb://localhost/Biz2Cr', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  () => {
    console.log('Connect to Mongodb');
  }
);
// end

let regModel = require('./db/register');
let loginModel = require('./db/register');
let newuserModel=require('./db/newuser');


app.post('/api/registration', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pn= req.body.pn;
    let pass = req.body.pass;
    console.log(email);
    pass =bcrypt.hashSync(req.body.pass,10);
    req.session.name=name;

    // insert data
    let ins = new regModel({
      name: name,
      email: email,
      pn: pn,
      pass: pass,
    });
    ins.save(err => {
      if (err) {} else {
        res.json({
          msg: 'Data Stored'
        });
      }
    });
  });
  app.post('/api/userlogin', (req, res) => {
    let email = req.body.email;
    let pass = req.body.pass;
    console.log(email);
    pass =bcrypt.hashSync(req.body.pass,10);  
    loginModel.findOne({
      'email': email,
      'pass': pass
    }, (err, data) => {
      if (err) {} else if (data == null) {
        res.json({
          'err': 1,
          'msg': 'Email Or Password Not Correct'
        });
      } else {
        res.json({
          'err': 0,
          'msg': 'Login Successfully',
          'uid': email
        });
      }
    });
  });

  app.post('/api/createnewuser', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let pn= req.body.pn;
    let pass = req.body.pass;
    console.log(email);
    pass =bcrypt.hashSync(req.body.pass,10);
        // insert data
        let ins = new newuserModel({
          name: name,
          email: email,
          pn: pn,
          pass: pass,
        });
        ins.save(err => {
          if (err) {} else {
            res.json({
              msg: 'Data Stored'
            });
          }
      });
  });
  app.get('/api/userlist', (req, res) => {
    newuserModel.find({}, (err, data) => {
      if (err) {} else {
        res.json({
          err: 0,
          cdata: data
        });
      }
    });
  });
app.post('/api/datadelete', (req, res) => {
  let cid = req.body.cid;
  console.log(cid)
  newuserModel.deleteOne({
      _id: cid
    },
    err => {
      if (err) {} else {
        res.json({
          err: 0,
          msg: 'Data Deleted'
        });
      }
    }
  );
});   
app.post("/api/dataedit", (req, res) => {
  let name = req.body.name;
  let email = email.body.email;
  let pn = pn.body.pn;
  let cid = req.body.cid;
  console.log(pn);
  newuserModel.updateMany({
    _id: cid
  }, {
    $set: {
      name: name,
      email:email,
      pn:pn
    }
  }, (err) => {
if (err) {} else {
  res.json({
    'err': 0,
    'msg': 'Data Updated'
  });
}
});
});

app.listen(8899, () => {
    console.log('Project work on 8899');
  });
