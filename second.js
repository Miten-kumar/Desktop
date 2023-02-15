let myFormData = document.getElementById("myForm");
let Name = document.getElementById("Name");
let Password = document.getElementById("Password");
let Gender = $("input[type='radio'][name='gender']:checked").val();


const clickModal = () => {
  document.getElementById("submit").style.visibility = "visible";
  document.getElementById("update").style.visibility = "hidden";
};
function Adddata() {
  let Name = document.getElementById("Name").value;
  let Password = document.getElementById("Password").value;
  let Gender = $("input[type='radio'][name='gender']:checked").val();
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  peopleList.push({
    Name: Name,
    Password: Password,
    Gender: Gender,
  });

  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  console.log(Name, Password, Gender);
}
function showData() {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  let html = "";

  peopleList.forEach(function (element, index) {
    html += "<tr>";
    html += "<td>" + element.Name + "</td>";
    html += "<td>" + element.Password + "</td>";
    html += "<td>" + element.Gender + "</td>";
    html += `<td><button class="btn btn-primary"  onClick="updateData(${index})" >Update</button>
        <button class="btn btn-warning"  onClick="deleteData(${index})" >Delete</button></td>`;
    html += "</tr>";
  });
  document.querySelector("#data").innerHTML = html;
}
function deleteData(index) {
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

function updateData(index) {
  document.getElementById("submit").style.visibility = "hidden";
  document.getElementById("update").style.visibility = "visible";

  $("#exampleModal").modal("show");
  let peopleList;
  let Gender = $("input[type='radio'][name='gender']:checked").val();
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("Name").value = peopleList[index].Name;
  document.getElementById("Password").value = peopleList[index].Password;
  var Female = document.getElementById("femaleGender")
  var Male = document.getElementById("maleGender")
  console.log(peopleList[index].Gender);
  if(peopleList[index].Gender == "Male"){
    Male.setAttribute("checked","checked");
  }
  else{
    Female.setAttribute("checked","checked");
  }

  // document.getElementById("gender").value = peopleList[index].Gender;

  document.querySelector("#update").onclick = function () {
    peopleList[index].Name = document.getElementById("Name").value;
    peopleList[index].Password = document.getElementById("Password").value
    peopleList[index].Gender=$("input[type='radio'][name='gender']:checked").val()
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
  };

  showData();
}
