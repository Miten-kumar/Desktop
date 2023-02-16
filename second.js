let myFormData = document.getElementById("myForm");
let Name = document.getElementById("Name");
let Address = document.getElementById("Address");
let email = document.getElementById("email");
let birthday = document.getElementById("birthday");
let Gender = $("input[type='radio'][name='gender']:checked").val();

const clickModal = () => {
  document.getElementById("submit").style.visibility = "visible";
  document.getElementById("update").style.visibility = "hidden";
  document.getElementById("myForm").reset();
};
function Adddata() {
  let Name = document.getElementById("Name").value;
  let Address = document.getElementById("Address").value;
  let email = document.getElementById("email").value;
  let birthday = document.getElementById("birthday").value;
  let Gender = $("input[type='radio'][name='gender']:checked").val();
  let peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  peopleList.push({
    Name: Name,
    Address: Address,
    Gender: Gender,
    email: email,
    birthday: birthday,
  });

  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  console.log(Name, Address, Gender, email, birthday);
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
    html += "<td>" + element.Address + "</td>";
    html += "<td>" + element.Gender + "</td>";
    html += "<td>" + element.email + "</td>";
    html += "<td>" + element.birthday + "</td>";
    // html = "<th>" + `Edit/Delet`+"</th>";
    html += ` <td><button class="btn btn-primary"  onClick="updateData(${index})" ><span class="material-symbols-outlined">
    edit
    </span></button>
        <button class="btn btn-warning"  onClick="deleteData(${index})" ><span class="material-symbols-outlined">
        delete
        </span></button></td>`;
    html += "</tr>";
  });
  document.querySelector("#head").innerHTML = `<th scope="col">Name</th>
  <th scope="col">Address</th>
  <th scope="col">Gender</th>
  <th scope="col">Email</th>
  <th scope="col">Birthday</th>
  <th scope="col">Edit \\ Delete</th>
  `;
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
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  // let Gender = $("input[type='radio'][name='gender']:checked").val();
  // console.log(Gender);

  document.getElementById("Name").value = peopleList[index].Name;
  document.getElementById("Address").value = peopleList[index].Address;
  document.getElementById("email").value = peopleList[index].email;
  document.getElementById("birthday").value = peopleList[index].birthday;
  var Female = document.getElementById("femaleGender");
  var Male = document.getElementById("maleGender");
  console.log(peopleList[index].Gender);
  if (peopleList[index].Gender == "Male") {
    Female.removeAttribute("checked", "checked");
    Male.setAttribute("checked", "checked");
  } else {
    Male.removeAttribute("checked", "checked");
    Female.setAttribute("checked", "checked");
  }

  document.getElementById("gender").value = peopleList[index].Gender;
  console.log(peopleList[index].Gender);

  document.querySelector("#update").onclick = function () {
    peopleList[index].Name = document.getElementById("Name").value;
    peopleList[index].Address = document.getElementById("Address").value;
    peopleList[index].email = document.getElementById("email").value;
    peopleList[index].birthday = document.getElementById("birthday").value;
    peopleList[index].Gender = $(
      "input[type='radio'][name='gender']:checked"
    ).val();
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
  };

  showData();
}
