/*------------function ที่สามารถกด click เพื่อshow dropdown ใน btn ----------------- */
function Functionsearch() {
  document.getElementById("Dropdownsearch").classList.toggle("show");
}
/*--------ใช้เพื่อค้นหาคำที่เขียนลงใน btn serch-------*/
function searchFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("search");
  filter = input.value.toUpperCase();
  div = document.getElementById("Dropdownsearch");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}
/*ดึง value จากserach bar ที่สามารถนำไปหา ในapiได้ */
  function getConferenceResponse() {
let query = document.querySelector("#search").value;
console.log(query)
const options = {
method: 'GET',
headers: {
'X-RapidAPI-Key': 'd5cdd7e06bmsh3c4bae306941f91p12a535jsn31a4bd9fa326',
'X-RapidAPI-Host': 'aliexpress-datahub.p.rapidapi.com'
}
};
//https://rapidapi.com/ecommdatahub/api/aliexpress-datahub/ เว็บที่ใช้ดึง api 
fetch('https://aliexpress-datahub.p.rapidapi.com/item_search?q='+query+'&page=1', options)
.then(response => response.json())
    .then((data) => {
        let sum;
        console.log(data.result.resultList)
    // for loop นำข้อมูลออกมา
        for (let i = 1,len=data.result.resultList.length; i <  len ; i++) {
            let count = (data.result.resultList)[i]
            
            sum += "<br>"+count.item.title + "<br>" + "<img width=180 src=https:" +count.item.image + ">" + "<br>"
        
        }
        //นำ div ที่สามารถ นำค่าลงไปในpageได้
        document.querySelector("#output").innerHTML = sum;
        
    })
    .catch((err) => console.log(err));

} 
