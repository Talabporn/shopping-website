/*ประกาศการใช้ method ในการเข้าถึง url เเละ การส่งข้อมูล   */
async function callproductWS(url, method, token = "" ,sentData = {}) {
  let data;
  if (method == "selectall") {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    data = await response.json();
  } else if (method == "select") {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    data = await response.json();
  } else if (method == "selecttype") {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    data = await response.json();
  }
  //รับมาจากภายนอก
  else if (method == "searchother") {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        'X-RapidAPI-Key': 'd5cdd7e06bmsh3c4bae306941f91p12a535jsn31a4bd9fa326',
        'X-RapidAPI-Host': 'aliexpress-datahub.p.rapidapi.com'
        }
    });
    data = await response.json();
  }
  /*เขียน รวม 3 ฟังก์ชั่นการทำงาน  */
  else if (method == "insert" || method == "update" || method == "delete") {
    let aMethod;
    if (method == "insert") {
      aMethod = "POST";
    } else if (method == "update") {
      aMethod = "PUT";
    } else if (method == "delete") {
      aMethod = "DELETE";
    }
    let response = await fetch(url, {
      method: aMethod,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(sentData),
    });
    data = await response.json();
  }

  return data;
}
//ประกาศ root
const rootURL = "http://localhost:3002/"

/*ประกาศการรับค่ามาใน input ของเเต่ละargumentในhtml ใช้ id เป็นหลัก */
let token = "",IDP, Proname, Price, Details, Dateup, IDadmin, Productother;

//insertRef
let IDPTxtRef = document.querySelector("#IDP");
let PronameTxtRef = document.querySelector("#Proname");
let PriceTxtRef = document.querySelector("#Price");
let DetailsTxtRef = document.querySelector("#details");
let PtypeTxtRef = document.querySelector("#Ptype");
let DateupTxtRef = document.querySelector("#dateup");
let IDadminTxtRef = document.querySelector("#IDadmin");
//deleteRef
let ProductDeleteidTxtRef = document.querySelector("#ProductDeleteid");

//search other product
let ProductotherTxtRef = document.querySelector("#Pronameother");


/*ป้องกัน ไม่ให้ค่าเกิดการทับซ้อนกันของข้อมูล */
function clearInput() {
  IDPTxtRef.value = "";
  PronameTxtRef.value = "";
  PriceTxtRef.value = "";
  DetailsTxtRef.value = "";
  DateupTxtRef.value = "";
  PtypeTxtRef.value = "";
  IDadminTxtRef.value = "";
  ProductDeleteidTxtRef = "";
  IDPUpRef.value = "";
  PronameUpRef.value = "";
  PriceUpRef.value = "";
  DetailsUpRef.value = "";
  PtypeUpRef.value = "";
  DateupUpRef.value = "";
  IDadminUpRef.value = "";
}
/* ประกาศอ่านค่าจากปุ่ม btn ใช้ id*/
let insertBtnRef = document.querySelector("#insert");
let updateBtnRef = document.querySelector("#update");
let deleteBtnRef = document.querySelector("#delete");
let searchotherBtnRef = document.querySelector("#searchother");

let selectBtnRef = document.querySelector("#select");
let selectallBtnRef = document.querySelector("#selectall");
let selectCatBtnRef = document.querySelector("#selectCat");


let SelectTypeTxtRef = document.querySelector("#selectType");
let SelectNameTxtRef = document.querySelector("#selectName");
let SelectAdminTxtRef = document.querySelector("#selectAdmin");

/*select by type ค้นหาด้วยการกำหนด type IDadmin  Proname */
selectCatBtnRef.addEventListener("click", () => {
  ProductType = SelectTypeTxtRef.value;
  Proname = SelectNameTxtRef.value;
  IDadmin =SelectAdminTxtRef.value;
  
  callproductWS(rootURL + "product/" + ProductType+"/"+ Proname+"/"+IDadmin, "selecttype",token).then((data) => {
    alert(data.message);
    console.log(data?.data);
    if (data?.data?.length > 0) {
      let sum;
      /* table List */
      sum = "  <style> th, td { border:3px solid black; padding:5px; width: 2%; text-align:center} </style>";
      sum += "<h1>Product List</h1>";
      sum += "<table class='table'>";
      sum += "<thead class='thead-dark'>";
      sum += "<tr>";
      sum += "<th scope='col'>IDP</th>";
      sum += "<th scope='col'>Product name</th>";
      sum += "<th scope='col'>Price</th>";
      sum += "<th scope='col'>Details</th>";
      sum += "<th scope='col'>Type</th>";
      sum += "<th scope='col'>IDadmin</th>";
      sum += "</tr>";
      sum += "</thead>";
      sum += "<tbody>";
      data.data.forEach((element) => {
        sum += "<tr>";
        sum += "<td>" + element.IDP + "</td>";
        sum += "<td>" + element.Proname + "</td>";
        sum += "<td>" + element.Price + "</td>";
        sum += "<td>" + element.details + "</td>";
        sum += "<td>" + element.Ptype + "</td>";
        sum += "<td>" + element.IDadmin + "</td>";        
        sum += "</tr>";
      });
      sum += "</tbody>";
      sum += "</table>";
      document.querySelector("#selecttype").innerHTML = sum;
    }
  })
});

/*select all  ค้นหาทั้งหมด */
selectallBtnRef.addEventListener("click", () => {
  callproductWS(rootURL + "products", "selectall",token).then((data) => {
    console.log(data?.data);
    if (data?.data?.length > 0) {
      let sum;
      /* table List */
      sum = "  <style> th, td { border:3px solid black; padding:5px; width: 2%; text-align:center} </style>";
      sum += "<h1>Product List</h1>";
      sum += "<table class='table'>";
      sum += "<thead class='thead-dark'>";
      sum += "<tr>";
      sum += "<th scope='col'>IDP</th>";
      sum += "<th scope='col'>Product name</th>";
      sum += "<th scope='col'>Price</th>";
      sum += "<th scope='col'>Details</th>";
      sum += "<th scope='col'>Type</th>";
      sum += "<th scope='col'>IDadmin</th>";
      sum += "</tr>";
      sum += "</thead>";
      sum += "<tbody>";
      data.data.forEach((element) => {
        sum += "<tr>";
        sum += "<td>" + element.IDP + "</td>";
        sum += "<td>" + element.Proname + "</td>";
        sum += "<td>" + element.Price + "</td>";
        sum += "<td>" + element.details + "</td>";
        sum += "<td>" + element.Ptype + "</td>";
        sum += "<td>" + element.IDadmin + "</td>";        
        sum += "</tr>";
      });
      sum += "</tbody>";
      sum += "</table>";
      document.querySelector("#outputSA").innerHTML = sum;
    }
  })
})

//insert

insertBtnRef.addEventListener("click", () => {
  IDP = IDPTxtRef.value;
  Proname = PronameTxtRef.value;
  Price = PriceTxtRef.value;
  Details = DetailsTxtRef.value;
  Ptype = PtypeTxtRef.value;
  Dateup = DateupTxtRef.value;
  IDadmin = IDadminTxtRef.value;
  let product_data = {
    product: {
      IDP: IDP,
      IDadmin: IDadmin,
      Price: Price,
      Proname: Proname,
      dateup: Dateup,
      details: Details,
      Ptype: Ptype
    },
  };
  callproductWS(rootURL + "productIn", "insert", token,product_data).then((data) => {
    console.log(data);
    alert(data.message);
  });
});

//updateRef
let IDPUpRef = document.querySelector("#IDPUp");
let PronameUpRef = document.querySelector("#PronameUp");
let PriceUpRef = document.querySelector("#PriceUp");
let DetailsUpRef = document.querySelector("#detailsUp");
let PtypeUpRef = document.querySelector("#PtypeUp");
let DateupUpRef = document.querySelector("#dateupUp");
let IDadminUpRef = document.querySelector("#IDadminUp");
//update
updateBtnRef.addEventListener("click", () => {
  IDP = IDPUpRef.value;
  Proname = PronameUpRef.value;
  Price = PriceUpRef.value;
  Details = DetailsUpRef.value;
  Ptype =PtypeUpRef.value;
  Dateup = DateupUpRef.value;
  IDadmin = IDadminUpRef.value;
  if(Price==''){
    Price=0
  }
  if(Dateup == ''){
    Dateup=1111-01-01
  }
  let product_data = {
    product: {
      IDP: IDP,
      IDadmin: IDadmin,
      Price: Price,
      Proname: Proname,
      dateup: Dateup,
      details: Details,
      Ptype: Ptype
    },
  };
  callproductWS(rootURL + "productUp", "update", token, product_data).then((data) => {
    console.log(product_data?.IDP);
    if (data.data > 0) {
      alert(data.message);
    }
    else{
      alert(data.message);
    }
  });
});

//delete

deleteBtnRef.addEventListener("click", () => {
  IDP = ProductDeleteidTxtRef.value;
  let product_data = {
    IDP: IDP,
  };
  callproductWS(rootURL + "productDel", "delete",token, product_data).then((data) => {
    console.log(product_data?.IDP)
    console.log(data);
    if (data.data > 0) {
      alert(data.message);
    }
    else{
      alert(data.message);
    }
  });
});


/*select external  ค้นหาทั้งหมด */
searchotherBtnRef.addEventListener("click", () => {
  Productother=ProductotherTxtRef.value;
  callproductWS('https://aliexpress-datahub.p.rapidapi.com/item_search?q='+Productother+'&page=1' , "searchother",token).then((data) => {
    console.log(data.result.resultList);
      let sum;
      /* table List */
      sum = "  <style> th, td { border:3px solid black; padding:5px; width: 2%; text-align:center} </style>";
      sum += "<h1>Product List</h1>";
      sum += "<table class='table'>";
      sum += "<thead class='thead-dark'>";
      sum += "<tr>";
      sum += "<th scope='col'>ID product</th>";
      sum += "<th scope='col'>title</th>";
      sum += "<th scope='col'>Image</th>";
      sum += "</tr>";
      sum += "</thead>";
      sum += "<tbody>";
      data.result.resultList.forEach((element) => {
        sum += "<tr>";
        sum += "<td>" +element.item.itemId+ "</td>";
        sum += "<td>" + element.item.title + "</td>";
        sum += "<td><img width=180 src=https:" +element.item.image + "></td>";
        sum += "</tr>";
      });
      sum += "</tbody>";
      sum += "</table>";
      document.querySelector("#outputOT").innerHTML = sum;
  })
})

