async function callloginws(url, method, token = "", sentData = {}) {
  let data;
 if (
      method === "login"
    ) {
      let aMethod;
      if ( method === "login") {
        aMethod = "POST";
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
  
let Admin_email,
  Admin_PW,
  Admin_ID,
  Admin_time,
  token = "";
  //รับtext
  let Admin_emailTxtRef = document.querySelector("#email");
  let Admin_PWTxtRef = document.querySelector("#pw");
function clearInput() {
  Admin_emailTxtRef.value = "";
  Admin_PWTxtRef.value = "";

}

/* ประกาศอ่านค่าจากปุ่ม btn ใช้ id*/
let loginBtnRef = document.querySelector("#login");

const rootURL = "http://localhost:3002/";

loginBtnRef.addEventListener("click", () => {
  Admin_email=Admin_emailTxtRef.value;
  Admin_PW=Admin_PWTxtRef.value
  let user_data = {
    user: {
      email: Admin_email,
      pw: Admin_PW,
    },
  };
  callloginws(rootURL + "signin", "login", token, user_data).then((data) => {
    token = data.token;
    console.log(data.token);

  });
});
