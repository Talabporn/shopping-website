/*ประกาศการใช้ method ในการเข้าถึง url เเละ การส่งข้อมูล   */
async function calladminWS(url, method, token = "", sentData = {}) {
  let data;
  //ประกาศ ค้นหา ทั้งหมด
  if (method == "selectall") {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
      
    });
   data = await response.json();
  }   //ประกาศ ค้นหาด้วย selectidnamejob
 else if (method == "selectidnamejob") {
    let response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    data = await response.json();
  }
    //เขียน รวม 3 ฟังก์ชั่นการทำงาน  
  else if (method == "insert" || method == "update" || method == "delete" 
  ||  method === "login") {
    let aMethod;
    if (method == "insert"  ||  method === "login") {
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

/*ประกาศการรับค่ามาใน input ของเเต่ละargumentในhtml ใช้ id เป็นหลัก */

let 
token = "",
//insert
ADMIN_ID,
  ADMIN_NAME,
  ADMIN_JOB,
  ADMIN_Address,
  ADMIN_Gen,
  ADMIN_Phone,
  //select id+name+job
  ADMIN_IDadminsearch,
  ADMIN_namesearch,
  ADMIN_jobsearch,
  //delete
  ADMIN_IDdelete,
  //update
  ADMIN_IDup,
  ADMIN_NAMEup,
  ADMIN_JOBup,
  ADMIN_Addressup,
  ADMIN_Genup,
  ADMIN_Phoneup
//ประกาศรับ text
//insert
let ADMIN_IDTxtRef = document.querySelector("#IDadmin");
let ADMIN_NAMETxtRef = document.querySelector("#Aname");
let ADMIN_JOBTxtRef = document.querySelector("#job");
let ADMIN_AddressTxtRef = document.querySelector("#address");
let ADMIN_GenTxtRef = document.querySelector("#gen");
let ADMIN_PhoneTxtRef = document.querySelector("#phone");
//select by id name job 
let ADMIN_IDadminsearchTxtRef = document.querySelector("#IDadminsearch");
let ADMIN_namesearchTxtRef = document.querySelector("#namesearch");
let ADMIN_jobsearchTxtRef = document.querySelector("#jobsearch");
//delete by id
let ADMIN_IDdeleteTxtRef = document.querySelector("#IDadmindelete");
//updata data
let ADMIN_IDupTxtRef = document.querySelector("#IDadminup");
let ADMIN_NAMEupTxtRef = document.querySelector("#Anameup");
let ADMIN_JOBupTxtRef = document.querySelector("#jobup");
let ADMIN_AddressupTxtRef = document.querySelector("#addressup");
let ADMIN_GenupTxtRef = document.querySelector("#genup");
let ADMIN_PhoneupTxtRef = document.querySelector("#phoneup");
/*ป้องกัน ไม่ให้ค่าเกิดการทับซ้อนกันของข้อมูล */
function clearInput() {
  ADMIN_IDTxtRef.value = "";
  ADMIN_NAMETxtRef.value = "";
  ADMIN_JOBTxtRef.value = "";
  ADMIN_AddressTxtRef.value = "";
  ADMIN_GenTxtRef.value = "";
  ADMIN_PhoneTxtRef.value = "";
  
}
/* ประกาศอ่านค่าจากปุ่ม btn ใช้ id*/
let insertBtnRef = document.querySelector("#insert");
let updateBtnRef = document.querySelector("#update");
let deleteBtnRef = document.querySelector("#delete");
let selectBtnRef = document.querySelector("#select");
let selectnameBtnRef = document.querySelector("#selectname");
let selectjobBtnRef = document.querySelector("#selectjob");
let selectidnamejobBtnRef = document.querySelector("#selectidnamejob");
let selectallBtnRef = document.querySelector("#selectall");



/* method การทำงาน insert */
const rootURL = "http://localhost:3002/"; //ประกาศ root

insertBtnRef.addEventListener("click", () => {
  /*วิธีบอกกการรับค่าจาก Argument */
  ADMIN_ID = ADMIN_IDTxtRef.value;
  ADMIN_NAME = ADMIN_NAMETxtRef.value;
  ADMIN_JOB = ADMIN_JOBTxtRef.value;
  ADMIN_Address =  ADMIN_AddressTxtRef.value;
  ADMIN_Gen = ADMIN_GenTxtRef.value;
  ADMIN_Phone = ADMIN_PhoneTxtRef.value;
  //สร้าง json ที่สามารถ input ข้อมูลลงไปได้
  let admin_data = {
    Admin: {
      IDadmin: ADMIN_ID,
      Aname: ADMIN_NAME,
      job: ADMIN_JOB,
      Address: ADMIN_Address,
      Gen: ADMIN_Gen,
      Phone: ADMIN_Phone,
    },
  };
  calladminWS(rootURL + "admininsert", "insert",token, admin_data).then((data) => {
    console.log(data);
    if (data?.data?.length > 0) {
      alert(data.message);
      clearInput();
    }
    else {
      alert(data.message);
      clearInput();
    }
  });
});
/*select by idnamejob ค้นหาด้วยการกำหนด idnamejob  */
selectidnamejobBtnRef.addEventListener("click", () => {
  ADMIN_IDadminsearch = ADMIN_IDadminsearchTxtRef.value;
 ADMIN_namesearch = ADMIN_namesearchTxtRef.value;
  ADMIN_jobsearch = ADMIN_jobsearchTxtRef.value;
  calladminWS(rootURL + "admin/&i=" + ADMIN_IDadminsearch+"/&na="+ADMIN_namesearch+"/&jo="+ADMIN_jobsearch, "selectidnamejob",token).then((data) => {
    if(data?.data?.length > 0){
    let sum;
    /* table List */
    sum =" <style> th, td { border:3px solid black; padding:5px; width: 2%; text-align:center} </style>";
      sum += "<h1>Admin List</h1>";
      sum += "<table class='table'>";
      sum += "<thead>";
      sum += "<tr>";
      sum += "<th scope='col'>ID</th>";
      sum += "<th scope='col'>Name</th>";
      sum += "<th scope='col'>Job</th>";
      sum += "<th scope='col'>Address</th>";
      sum += "<th scope='col'>Gen</th>";
      sum += "<th scope='col'>Phone</th>";
      sum += "</tr>";
      sum += "</thead>";
      sum += "<tbody>";
      data.data.forEach((element) => {
        sum += "<tr>";
        sum += "<td>" + element.IDadmin + "</td>";
        sum += "<td>" + element.Aname + "</td>";
        sum += "<td>" + element.job + "</td>";
        sum += "<td>" + element.Address + "</td>";
        sum += "<td>" + element.Gen + "</td>";
        sum += "<td>" + element.Phone + "</td>";
        sum += "</tr>";
      });
      sum += "</tbody>";
      sum += "</table>";
    /*ให้สร้างตาราง ใน html */
    document.querySelector("#selectidnamejobhtml").innerHTML = sum;
    }
    else { alert(data.message);}
  });
});

/*select all  ค้นหาทั้งหมด */
selectallBtnRef.addEventListener("click", () => {
  calladminWS(rootURL + "admin", "selectall",token).then((data) => {
    console.log(data);
    if (data?.data?.length > 0) {
      let sum;
      /* table List */
      sum =" <style> th, td { border:3px solid black; padding:5px; width: 2%; text-align:center} </style>";
      sum += "<h1>Admin List</h1>";
      sum += "<table class='table'>";
      sum += "<thead>";
      sum += "<tr>";
      sum += "<th scope='col'>ID</th>";
      sum += "<th scope='col'>Name</th>";
      sum += "<th scope='col'>Job</th>";
      sum += "<th scope='col'>Address</th>";
      sum += "<th scope='col'>Gen</th>";
      sum += "<th scope='col'>Phone</th>";
      sum += "</tr>";
      sum += "</thead>";
      sum += "<tbody>";
      data.data.forEach((element) => {
        sum += "<tr>";
        sum += "<td>" + element.IDadmin + "</td>";
        sum += "<td>" + element.Aname + "</td>";
        sum += "<td>" + element.job + "</td>";
        sum += "<td>" + element.Address + "</td>";
        sum += "<td>" + element.Gen + "</td>";
        sum += "<td>" + element.Phone + "</td>";
        sum += "</tr>";
      });
      sum += "</tbody>";
      sum += "</table>";
      document.querySelector("#output").innerHTML = sum;
    }
  });
});

/*delete ข้อมูลด้วย id */
deleteBtnRef.addEventListener("click", () => {
  ADMIN_IDdelete = ADMIN_IDdeleteTxtRef.value;
  let admin_data = {
    IDadmin: ADMIN_IDdelete,
  };
  calladminWS(rootURL + "AdminDELETE", "delete", token,admin_data).then((data) => {
    console.log(data);
    alert(data.message);
    clearInput();
  });
});

updateBtnRef.addEventListener("click", () => {
  /*วิธีบอกกการรับค่าจาก Argument */
  ADMIN_IDup = ADMIN_IDupTxtRef.value;
  ADMIN_NAMEup = ADMIN_NAMEupTxtRef.value;
  ADMIN_JOBup = ADMIN_JOBupTxtRef.value;
  ADMIN_Addressup =  ADMIN_AddressupTxtRef.value;
  ADMIN_Genup = ADMIN_GenupTxtRef.value;
  ADMIN_Phoneup = ADMIN_PhoneupTxtRef.value;
  //สร้าง json ที่สามารถ input ข้อมูลลงไปได้
  let admin_data = {
    Admin: {
      IDadmin: ADMIN_IDup,
      Aname: ADMIN_NAMEup,
      job: ADMIN_JOBup,
      Address: ADMIN_Addressup,
      Gen: ADMIN_Genup,
      Phone: ADMIN_Phoneup,
    },
  };
  calladminWS(rootURL + "admintput", "update",token, admin_data).then((data) => {
    console.log(data);
    if (data?.data?.length > 0) {
      alert(data.message);
      console.log(data.data.length);
    }
    else {
      alert(data.message);
    }
  });
});
