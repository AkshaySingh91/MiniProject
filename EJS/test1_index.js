const { faker} = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override');
const { type } = require('os');
const { log } = require('console');
const { writeFile } = require('fs');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test',
  password: "@sqlpassword9191"
});
// to overide method in form altough we can do everything from one get req also
app.use(methodOverride("_method"));
// to find ejs file from view folder even if server run from diff path
app.set('views', path.join(__dirname, "./views"));

function user(req, resp, next) {
  let query = "select uname,email,id  from user";
  connection.query(query, (err, res) => {
    if (err) console.log(err);
    else {
      req.data = res;
    }
    next();
  })
}
app.get('/', user, (req, res, next) => {
  res.render("test1_index.ejs", {
    data: req.data
  });
})

app.use(express.urlencoded({ extended: true }));

function edit(req, resp, next) {
  let { pass, newEmail, newPass } = req.body;
  let query = `select password from user where id = "${req.params.id}"`
  try {
    connection.query(query, (err, res) => {
      if (err) console.log(err.message);
      else {
        let realPass = res[0];
        if (realPass.password == pass) {
          query = `update user set email = "${newEmail}" , password = "${newPass}" where id = "${req.params.id}"`

          connection.query(query, (err, res) => {
            if (err) console.log(err);
            else {
              next();
            }
          })
        }
        else {
          resp.send("wrong password")
        }
      }
    })
  } catch (e) {
    console.log(e);
  }
}
app.get('/:id/edit/', (req, resp) => {
  let q = `select email, password from user where id = "${req.params.id}"`;
  connection.query(q, (err, res) => {
    try {
      if (err) console.log(err.message);
      else {
        resp.render("test1_form.ejs", {
          id: req.params.id,
          email: res[0].email,
          pass : res[0].password
        });
      }
    } catch (e) { console.log(e); }
  })
})

app.patch('/:id/edit', edit, (req, res) => {
  res.redirect('/')
})

function add(req, resp, next) {
  let { name, email, pass } = req.body;
  let q = `insert into user values ("${createRandomUser()[0]}", "${email}", "${name}", "${pass}")`
  try {
    connection.query(q, (err, res) => {
      if (err) console.log(err.message);
      else {
        next()
      }
    })
  } catch (e) { console.log(e); }

}
app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, "/test1_regis.html"))
})

app.post('/registration', add, (req, res) => {
  res.redirect('/');
})

app.get('/:id/delete', (req, resp) => {
  let q = `select email, password from user where id = '${req.params.id}'`
  try {
    connection.query(q, (err, res) => {
      if (err) console.log(err.message);
      else {
        resp.render("test1_logout.ejs", {
          email: res[0].email,
          pass: res[0].password,
          id: req.params.id
        })
      }
    })
  } catch (e) { console.log(e) };
})

function remove(req, resp, next) {
  let { email, pass } = req.body;
  let q = `select email, password from user where id = '${req.params.id}'`
  try {
    connection.query(q, (err, res) => {
      if (err) console.log(err.message);
      else {
        if (res[0].email == email && res[0].password == pass) {
          connection.query(q, (err, res) => {
            if (err) console.log(err.message);
            else {
              q = `delete from user where id = '${req.params.id}'`
              connection.query(q, (err, res) => {
                if (err) console.log(err.message);
                else {
                  next();
                }
              })
            }
          })
        }
        else {
          res[0].email != email ? resp.send("WRONG EMAIL") : resp.send("WRONG PASSWORD");
        }
      }
    })
  } catch (e) { console.log(e); }
}
app.delete('/:id/delete', remove, (req, res) => {
  res.redirect('/');
})
function createRandomUser() {
  return [
    faker.string.uuid(),
    faker.internet.email(),
    faker.internet.userName(),
    faker.internet.password()
  ];
}

app.listen('8080', () => {
    console.log('listening..');
})
  
  // connection.end();
  
















  
  /* to write into file*/
//   const name = ['akshay', 'rahul', 'abhi', 'rohan', 'guru', 'vinod', 'patil', 'sahil', 'akash', 'ankita', 'komal', 'suraj', 'deepak', 'abhay', 'mohit', 'nitin', 'priyanka', 'harry', 'shradha', 'ashish', 'om', 'madhu'];
  
//   const product = [
//     'Leds', 'IC', 'wire', 'battery', 'motor', 'registor', 'capicitor', 'amplifier', 'speaker'
//   ]
// let json = "";
// let n = 0, p = 0;
// for(let i=0; i<100; i++){
//   if (n == name.length) n = 0;
//   if(p == product.length) p = 0;

//    json += `{
//     "productName" : "${product[p]}",
//     "descripton" : "this is ${product[p++]}",
//     "price" : ${Math.floor(Math.random() * (1000 - 100 + 1) + 100)},
//     "sellerName" : "${name[n++]}",
//     "sellerLoc"  : "iit palghar",
//     "gurrantee" :  ${Math.floor(Math.random() * (10 - 1 + 1) + 1)},
//     "comments" : [
//         {"user" : "${name[Math.floor(Math.random() * (20 - 0 + 1) + 0)]}" , "comment" :"Nice product"}
//     ],
//     "metadata": {"views" : ${Math.floor(Math.random() * (100 - 20 + 1) + 20)}, "likes" : ${Math.floor(Math.random() * (80 - 20 + 1) + 20)}}
//   }`
// }

// const file = require('fs');
// const { type } = require('os');
// file.writeFile('data.json', json, (err)=>{
//   if (err){
//     console.log(err.message);
//   }else{
//     console.log('written successfully!');
//   }
// })
