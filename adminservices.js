//เชื่อม port 3002
const express = require("express");
const path = require("path");
const port = 3002;
const app = express();
let cors = require("cors");
let jwt = require("jsonwebtoken");
let authorize = require("./middleware/auth");
/* 1. Create a router object and register the router */
const router = express.Router();
app.use(router);
/* Import and use Environmental Variable */
const dotenv = require("dotenv");
dotenv.config();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
/* Connection to MySQL */
const mysql = require("mysql2");
var con = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
/*กำหนดpath ที่จะเข้าถึงในlocal path*/
app.use("/", express.static(path.join(__dirname, "css")));
app.use("/", express.static(path.join(__dirname, "Images")));
app.use("/", express.static(path.join(__dirname, "product")));
app.use("/", express.static(path.join(__dirname, "js")));
app.use("/", express.static(path.join(__dirname, "type")));
app.use("/", express.static(path.join(__dirname, "price")));

/*กำหนดส่วน get */
router.get("/", (req, res) => {
  res.send("WELCOME CUSTOMER");
});

router.get("/homepage", (req, res) => {
  console.log("homepage...");
  res.sendFile(path.join(`${__dirname}/homepage.html`));
});
router.get("/cataloge", (req, res) => {
  console.log("cataloge...");
  res.sendFile(path.join(`${__dirname}/cataloge.html`));
});
router.get("/aboutus", (req, res) => {
  console.log("aboutus...");
  res.sendFile(path.join(`${__dirname}/aboutus.html`));
});

router.get("/loginadmin", (req, res) => {
  console.log("login...");
  res.sendFile(path.join(`${__dirname}/loginadmin.html`));
});

router.get("/addproduct", (req, res) => {
  res.sendFile(path.join(`${__dirname}/addproduct.html`));
});
router.get("/addadmin", (req, res) => {
  res.sendFile(path.join(`${__dirname}/addadmin.html`));
});
router.get("/form-submit", (req, res) => {
  res.sendFile(path.join(`${__dirname}/form-submit.html`));
});
router.get("/notfound", function (req, res) {
  res.sendFile(path.join(`${__dirname}/notfound.html`));
});
/* กำหนดส่วน post */
router.post("/addproduct", function (req, res) {
  console.log(req.method);
  console.log(`Form submitted by ${req.body.username} ${Date.now()}`);
  res.redirect(`/addproduct`);
});
router.post("/homepage", function (req, res) {
  console.log(req.method);
  console.log(`Form submitted by ${req.body.username} ${req.body.password}`);
  res.redirect(`/homepage`);
});
router.post("/loginadmin", function (req, res) {
  console.log(req.method);
  console.log(`Form submitted by ${req.body.fname}`);
  res.redirect(`/loginadmin`);
});
router.post("/addadmin", function (req, res) {
  console.log(req.method);
  console.log(`Form submitted by ${req.body.fname}`);
  res.redirect(`/addadmin`);
});
/* Connect to DB */
con.connect(function (err) {
  if (err) throw err;
  console.log(`Connected DB: ${process.env.MYSQL_DATABASE}`);
});

let corsOptions = {
  origin: "http://localhost:3002",
  methods: "GET,POST,PUT,DELETE",
};
router.use(cors(corsOptions));
/* login เพื่อ นำ token ออกมาเชื่อมทุกระบบ*/
router.post("/signin", (req, res) => {
  console.log(req.body);
  let user = req.body;
  let jwtToken = jwt.sign(
    {
      email: user.email,
      pw: user.pw,
      Aname: user.Aname,
    },
    process.env.SECRET,
    {
      expiresIn: "1h",
    }
  );
  const sql = `SELECT * FROM login WHERE email = "${req.body.email}" and  pw = "${req.body.password}"`;
  con.query( sql, function (error, results) {
    if (error) throw error;
    console.log(`${results.length} rows returned`);
    if (results.length==1)
    return res.redirect(`/addadmin`)
    else 
    return res.redirect(`/notfound`)})
    console.log({
      token: jwtToken,
      message: user,
    })
  })
/* อ่านค่า port ที่เราตั้งค่า */

/*
                     Product Service
                                                            /*/
//selectall
/*---------------------Testing------------------------------
                ***[ test select all product ]***
                    method: get
                    URL: http://localhost:3002/products
--------------------------------------------------------*/
router.get("/products",function (req, res) {
  let sql = `select * from product`;
  con.query(sql, function (error, results) {
    if (error) throw error;
    console.log(`${results.length} rows returned`);
    return res.send({ data: results, message: "product list." });
  });
});


//select by Type, Proname or IDadmin 
/*---------------------Testing------------------------------
                ***[ test select product by Type, Proname or IDadmin ]***
                    method: get
                    URL: http://localhost:3002/product/m/a/Am02
--------------------------------------------------------------*/
router.get("/product///", function (req, res) {
  console.log("User doesn't enter Type, Proname or IDadmin ");
    return res
      .status(400)
      .send({ error: true, message: "Please enter Type, Proname or IDadmin ." });
});
router.get("/product/:tpye//", function (req, res) {
  let Ptype = "'%"+req.params.tpye+"%'";
  con.query(
    "SELECT * FROM product where Ptype like "+Ptype ,
    function (error, results) {
      if (error) throw error;
      console.log(`${results.length} rows returned`);
      if (results.length === 0) {
        return res.send({ error: false, message: "not have this product" });
      } else {
        console.log("Return product Ptype,Proname,IDadmin:", req.params.tpye);
        return res.send({
          error: false,
          data: results,
          message: "Product retrieved",
        });
      }
    }
  );
});

router.get("/product//:name/", function (req, res) {
  let Proname = "'%"+req.params.name+"%'";;
  con.query(
    "SELECT * FROM product where Proname like "+Proname ,
    function (error, results) {
      if (error) throw error;
      console.log(`${results.length} rows returned`);
      if (results.length === 0) {
        return res.send({ error: false, message: "not have this product" });
      } else {
        console.log("Return product Ptype,Proname,IDadmin:", req.params.tpye);
        return res.send({
          error: false,
          data: results,
          message: "Product retrieved",
        });
      }
    }
  );
});
router.get("/product///:admin", function (req, res) {
  let IDadmin = "'%"+req.params.admin+"%'";
  con.query(
    "SELECT * FROM product where IDadmin like "+IDadmin ,
    function (error, results) {
      if (error) throw error;
      console.log(`${results.length} rows returned`);
      if (results.length === 0) {
        return res.send({ error: false, message: "not have this product" });
      } else {
        console.log("Return product Ptype,Proname,IDadmin:", req.params.tpye);
        return res.send({
          error: false,
          data: results,
          message: "Product retrieved",
        });
      }
    }
  );
});




router.get("/product/:tpye/:name/", function (req, res) {
  let Ptype = "'%"+req.params.tpye+"%'";
  let Proname = "'%"+req.params.name+"%'";
  con.query(
    "SELECT * FROM product where Ptype like "+Ptype+" or Proname like "+ Proname ,
    function (error, results) {
      if (error) throw error;
      console.log(`${results.length} rows returned`);
      if (results.length === 0) {
        return res.send({ error: false, message: "not have this product" });
      } else {
        console.log("Return product Ptype,Proname,IDadmin:", req.params.tpye,req.params.name);
        return res.send({
          error: false,
          data: results,
          message: "Product retrieved",
        });
      }
    }
  );
});
router.get("/product/:tpye//:admin", function (req, res) {
  let Ptype = "'%"+req.params.tpye+"%'";
  let IDadmin = "'%"+req.params.admin+"%'";
  con.query(
    "SELECT * FROM product where Ptype like "+Ptype+" or IDadmin like "+ IDadmin ,
    function (error, results) {
      if (error) throw error;
      console.log(`${results.length} rows returned`);
      if (results.length === 0) {
        return res.send({ error: false, message: "not have this product" });
      } else {
        console.log("Return product Ptype,Proname,IDadmin:", req.params.tpye,req.params.name);
        return res.send({
          error: false,
          data: results,
          message: "Product retrieved",
        });
      }
    }
  );
});
router.get("/product//:name/:admin", function (req, res) {
  let Proname = "'%"+req.params.name+"%'";
  let IDadmin = "'%"+req.params.admin+"%'";
  con.query(
    "SELECT * FROM product where Proname like "+Proname+" or IDadmin like "+ IDadmin ,
    function (error, results) {
      if (error) throw error;
      console.log(`${results.length} rows returned`);
      if (results.length === 0) {
        return res.send({ error: false, message: "not have this product" });
      } else {
        console.log("Return product Ptype,Proname,IDadmin:", req.params.tpye,req.params.name);
        return res.send({
          error: false,
          data: results,
          message: "Product retrieved",
        });
      }
    }
  );
});
router.get("/product/:tpye/:name/:admin", function (req, res) {
  let Ptype = "'%"+req.params.tpye+"%'";
  let Proname = "'%"+req.params.name+"%'";
  let IDadmin =  "'%"+req.params.admin+"%'";
  con.query(
    "SELECT * FROM product where Ptype like "+Ptype+" or Proname like "+ Proname +" or IDadmin like " +IDadmin,
    function (error, results) {
      if (error) throw error;
      console.log(`${results.length} rows returned`);
      if (results.length === 0) {
        return res.send({ error: false, message: "not have this product" });
      } else {
        console.log("Return product Ptype,Proname,IDadmin:", req.params.tpye,req.params.name,req.params.admin);
        return res.send({
          error: false,
          data: results,
          message: "Product retrieved",
        });
      }
    }
  );
});
/* DELETE */
/*---------------------Testing------------------------------
                ***[ test delete product by id]***
                method: delete
                URL: http://localhost:3002/productDel
                body: raw JSON
                    {
                     "IDP": "Pd10"
                    }
--------------------------------------------------------------*/

router.delete("/productDel", function (req, res) {
  let IDP = req.body.IDP;
  console.log([IDP]);
  if (!IDP) {
    return res.send({ error: true, message: "Please enter Product id" });
  }
  con.query(
    "DELETE FROM product WHERE IDP = ?",
    [IDP],
    function (error, results) {
      if (error) throw error;
      console.log("Product has been deleted successfully.");
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "Product has been deleted successfully.",
      });
    }
  );
});

/* Insert */
/*---------------------Testing------------------------------
                ***[ test insert product ]***
                method: post
                URL: http://localhost:3002/productIn
                body raw JSON
            {
            "product":
            {
        "IDP": "Pd10",
        "Proname": "book",
        "Price": 65,
        "details": "manga",
        "dateup": "2022-03-01",
        "IDadmin": "Am02"
    }
--------------------------------------------------------------*/

router.post("/productIn", function (req, res) {
  let Product = req.body.product;
  console.log(Product);
  if (!Product.Ptype || !Product.IDP || !Product.IDadmin || !Product.Price || !Product.dateup || !Product.daetials) {
    return res
      .status(400)
      .send({ error: true, message: "Please enter all information completely" });
  }
  con.query("INSERT INTO product SET ? ", Product, function (error, results) {
    if (error) throw error;
    console.log("New Product has been created successfully");
    return res.send({
      error: false,
      data: results.affectedRows,
      message: "New Product has been created successfully.",
    });
  });
});

/* UPDATE*/
/*---------------------Testing------------------------------
                ***[ test insert product ]***
                method: put
                URL:  http://localhost:3002/productUp
                body raw JSON
            {
            "product":
            {
        "IDP": "Pd10",
        "Proname": "book",
        "Price": 65,
        "details": "manga and cartoon",
        "dateup": "2022-03-01",
        "IDadmin": "Am02"
    }
--------------------------------------------------------------*/


router.put("/productUp",function (req, res) {
  let IDP = req.body.product.IDP;
  let Product = req.body.product;
  console.log(IDP);
  console.log(Product);
  if (!Product.Ptype || !Product.IDP || !Product.IDadmin || !Product.Price || !Product.dateup || !Product.daetials) {
    return res.send({
      error: Product,
      message: "Please enter all information completely",
    });
  }
  con.query(
    "UPDATE product SET ? WHERE IDP = ?",
    [Product, IDP],
    function (error, results) {
      if (error) throw error;
      console.log("Product has been updated successfully.");
      return res.send({
        error: false,
        data: results,
        data: results.affectedRows,
        message: "Product has been updated successfully.",
      });
    }
  );
});

/*----------------------------------ADMIN------------------------------------- */

/*---------------------Testing------------------------------
                Testing select all admin
                method: get
                URL: http://localhost:3002/admin
                body: pretty JSON
--------------------------------------------------------*/
/* SELECT all */
router.get("/admin",function (req, res) {
  let sql = `select * from admin_a`;
  con.query(sql, function (error, results) {
    if (error) throw error;
    console.log(`${results.length} rows returned`);
    return res.send({ data: results, message: "Admin list." });
  });
});
/*-------------ไม่ได้ใส่ข้อมูล------------ */
//ทำให้ขึ้นเตือน alert
router.get("/admin/&i=/&na=/&jo=",function (req, res) {
  console.log("User doesn't enter  IDadmin , name , Job "); 
  return res.status(400).send({ error: true, message: "Please enter all information completely" });
})

/*---------------------Testing------------------------------
                  Testing select by id
                  method: get
                  URL: http://localhost:3002/admin/&i=Am02/&na=/&jo=
                  body: pretty JSON
  --------------------------------------------------------*/
/* SELECT by idnamejob*/
router.get("/admin/&i=:id/&na=/&jo=",function (req, res) {
  let IDadmin = req.params.id;
  if (!IDadmin) {
    return res.status(400).send({ error: true, message: "Please enter a valid Admin." });
  }
  con.query(
    "SELECT * FROM admin_a where IDadmin=?",IDadmin,
     function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Admin retrieved",
      });
    }
  );
});
/*---------------------Testing------------------------------
                  Testing select by name
                  method: get
                  URL: http://localhost:3002/admin/&i=/&na=ma/&jo=
                  body: pretty JSON
  --------------------------------------------------------*/
/* SELECT by idnamejob*/
router.get("/admin/&i=/&na=:name/&jo=", function (req, res) {
  let Aname = req.params.name;
  if (!Aname) {
    return res.status(400).send({ error: true, message: "Please enter a valid Admin." });
  }
  con.query(
    "SELECT * FROM admin_a where  Aname like"  +'  "%'+Aname+'%"' ,
     function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Admin retrieved",
      });
    }
  );
});

/*---------------------Testing------------------------------
                  Testing select by job
                  method: get
                  URL: http://localhost:3002/admin/&i=/&na=/&jo=bu
                  body: pretty JSON
  --------------------------------------------------------*/
/* SELECT by idnamejob*/
router.get("/admin/&i=/&na=/&jo=:Job", function (req, res) {
  let job = req.params.Job;
  if (!job) {
    return res.status(400).send({ error: true, message: "Please enter a valid Admin." });
  }
  con.query(
    "SELECT * FROM admin_a where job like"  +'"%'+job+'%" ',
     function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Admin retrieved",
      });
    }
  );
});


/*---------------------Testing------------------------------
                  Testing select by id+name+job
                  method: get
                  URL: http://localhost:3002/admin/&i=Am02/&na=ma/&jo=bu
                  body: pretty JSON
  --------------------------------------------------------*/
/* SELECT by idnamejob*/
router.get("/admin/&i=:id/&na=:name/&jo=:Job", function (req, res) {
  let IDadmin = req.params.id;
  let Aname = req.params.name;
  let job = req.params.Job;
  if (!job || !IDadmin || !Aname) {
    return res.status(400).send({ error: true, message: "Please enter a valid Admin." });
  }
  con.query(
    "SELECT * FROM admin_a where job like"  +'"%'+job+'%" or  Aname like  "%'+Aname+'%" or IDadmin=?',IDadmin,
     function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Admin retrieved",
      });
    }
  );
});

/*---------------------Testing------------------------------
                  Testing select by id+name
                  method: get
                  URL: http://localhost:3002/admin/&i=Am02/&na=ma/&jo=
                  body: pretty JSON
  --------------------------------------------------------*/
/* SELECT by idnamejob*/
router.get("/admin/&i=:id/&na=:name/&jo=",function (req, res) {
  let IDadmin = req.params.id;
  let Aname = req.params.name;
  if (  !IDadmin || !Aname) {
    return res.status(400).send({ error: true, message: "Please enter a valid Admin." });
  }
  con.query(
    "SELECT * FROM admin_a where  Aname like"  +'  "%'+Aname+'%" or IDadmin=?',IDadmin,
     function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Admin retrieved",
      });
    }
  );
});

/*---------------------Testing------------------------------
                  Testing select by id+job
                  method: get
                  URL: http://localhost:3002/admin/&i=Am02/&na=/&jo=bu
                  body: pretty JSON
  --------------------------------------------------------*/
/* SELECT by idnamejob*/
router.get("/admin/&i=:id/&na=/&jo=:Job", function (req, res) {
  let IDadmin = req.params.id;
  let job = req.params.Job;
  if (  !IDadmin || !job) {
    return res.status(400).send({ error: true, message: "Please enter a valid Admin." });
  }
  con.query(
    "SELECT * FROM admin_a where  job like" +'"%'+job+'%"  or IDadmin=?',IDadmin,
     function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Admin retrieved",
      });
    }
  );
});

/*---------------------Testing------------------------------
                  Testing select by name+job
                  method: get
                  URL: http://localhost:3002/admin/&i=/&na=ma/&jo=bu
                  body: pretty JSON
  --------------------------------------------------------*/
/* SELECT by idnamejob*/
router.get("/admin/&i=/&na=:name/&jo=:Job", function (req, res) {
  let Aname = req.params.name;
  let job = req.params.Job;
  if (  !Aname || !job) {
    return res.status(400).send({ error: true, message: "Please enter a valid Admin." });
  }
  con.query(
    "SELECT * FROM admin_a where  job like" +'"%'+job+'%"  or Aname like  '+'"%'+Aname+'%"',
     function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results,
        message: "Admin retrieved",
      });
    }
  );
});




/*---------------------Testing------------------------------
                  Testing Insert new admin
                  method: post
                  URL: http://localhost:3002/admininsert
                  body: raw JSON
  { 
    "Admin" :
              {
            "IDadmin": "Am11",
            "Aname": "Kartos Hass",
            "job": "Designer",
            "Address": "123 Yemen",
            "Gen": "F",
            "Phone": "087-455-7428"
        },
        
  }
  --------------------------------------------------------*/
/* Insert */
router.post("/admininsert", function (req, res) {
  let Admin = req.body.Admin;
  console.log(Admin);
  if (!Admin.IDadmin || !Admin.Aname || !Admin.Job || !Admin.Address || !Admin.Gen || !Admin.Phone ) {
    return res.status(400).send({ error: true, message: "Please enter all information completely" });
  }
  con.query("INSERT INTO admin_a SET ? ", Admin, function (error, results) {
    if (error) throw error;
    return res.send({
      error: false,
      data: results.affectedRows,
      message: "New admin has been created successfully.",
    });
  });
});
/*---------------------Testing------------------------------
                  Testing UPDATE  admin
                  method: put
                  URL: http://localhost:3002/admintput
                  body: raw JSON
  { 
    "Admin" :
      {
              "IDadmin": "Am05",
              "Aname": "David Bally",
              "job": "Application Engineer",
            "Address": "123 Bangkok",
            "Gen": "F",
            "Phone": "099-088-9999"
      }
   }
  --------------------------------------------------------*/
/* UPDATE*/
router.put("/admintput", function (req, res) {
  let IDadmin = req.body.Admin.IDadmin;
  let Admin = req.body.Admin;
  if (!IDadmin || !Admin) {
    return res.status(400).send({ error: true, message: "Please enter all information completely" });
  }
  con.query(
    "UPDATE admin_a SET ? WHERE IDadmin = ?",
    [Admin, IDadmin],
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "Admin has been updated successfully.",
      });
    }
  );
});
/*---------------------Testing------------------------------
                  Testing DELETE admin
                  method: delete
                  URL: http://localhost:3002/AdminDELETE
                  body: raw JSON
  {
              "IDadmin": "Am11"
             
  }
  --------------------------------------------------------*/
/* DELETE */
router.delete("/AdminDELETE", function (req, res) {
  let IDadmin = req.body.IDadmin;
  console.log(IDadmin);
  if (!IDadmin) {
    return res.status(400).send({ error: true, message: "Please provide IDadmin" });
  }
  con.query(
    "DELETE FROM admin_a WHERE IDadmin = ?",
    [IDadmin],
    function (error, results) {
      if (error) throw error;
      return res.send({
        error: false,
        data: results.affectedRows,
        message: "Admin has been deleted successfully.",
      });
    }
  );
});

/* กำหนดเมื่อเข้าถึง port เเล้ว*/

app.listen(process.env.PORT, function () {
  console.log("Server listening at Port " + process.env.PORT);
});
