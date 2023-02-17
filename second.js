var peopleList;
const myFormData = document.getElementById("myForm");
const Name = document.getElementById("Name");
const Address = document.getElementById("Address");
const email = document.getElementById("email");
const birthday = document.getElementById("birthday");
const Gender = $("input[type='radio'][name='gender']:checked").val();
const success = document.getElementById("Success");
const failure = document.getElementById("failure");

const clickModal = () => {
  document.getElementById("submit").style.visibility = "visible";
  document.getElementById("update").style.visibility = "hidden";
  document.getElementById("myForm").reset();
};

function ValidateEmail() {
  var check =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.value == "" || check.test(email.value) == false) {
    email.style.borderBottom = "2px solid red";
    return false;
  } else {
    email.style.borderBottom= "2px solid green";
    return true;
  }
}

// Validation
function ValidateName() {
  var check = /^[a-zA-Z]{3,10}$/;
  if (Name.value == "" || check.test(Name.value) == false) {
    Name.style.borderBottom = "2px solid red";
    return false;
  } else {
    Name.style.borderBottom= "2px solid green";
    return true;
  }
}

function ValidateAddress() {
  console.log("helo");
  var regAdress = /^[a-zA-Z,0-9]{3,90}$/;
  if (Address.value == "" || regAdress.test(Address.value) == false) {
    Address.style.borderBottom = "2px solid red";
    return false;
  } else {
    Address.style.borderBottom = "2px solid green";
    return true;
  }
}
function ValidateDOB() {


  
  // console.log(birthdayGiven);
  var ara1 = birthday.value.split("-");
  console.log(ara1);
  var todayDate = new Date();
  var compar = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`;
  var ara2 = compar.split("-");
  console.log(ara2);
  for (let index = 0; index < ara1.length; index++) {
    if (ara1[index] <= ara2[index] || ara1[index] == ara2[index]) {
      console.log("true");
      birthday.style.borderBottom = "2px solid green";
      return true;
    } else {
      birthday.style.borderBottom = "2px solid red";
      console.log("false");
      return false;
    }
  }
}
// Validation
let form = document.getElementById("myForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();
});



// Adddata...................................................................................



  function Adddata() {
    if (
      ValidateName() == true &&
      ValidateAddress() == true && ValidateEmail()== true &&
      ValidateDOB() == true){
    let Name1 = document.getElementById("Name").value;
    let Address1 = document.getElementById("Address").value;
    let email1 = document.getElementById("email").value;
    let birthday1 = document.getElementById("birthday").value;
    let Gender1 = $("input[type='radio'][name='gender']:checked").val();
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
    peopleList.push({
      Name: Name1,
      Address: Address1,
      Gender: Gender1,
      email: email1,
      birthday: birthday1,
    });
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    failure.style.display = "none";
    success.style.display = "block";
    setTimeout(function () {
      location.reload();
    }, 2000);
    return true;
    
    // console.log(Name, Address, Gender, email, birthday);
  }
  else {
    failure.style.display = "block";
    success.style.display = "none";
    setTimeout(function () {
      location.reload();
    },2000);
}
} 

// then how to shhow Data ...Adddata...Adddata.............
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

    html += ` <td><button class="btn btn-primary"  onClick="updateData(${index})" ><span class="material-symbols-outlined">
    edit
    </span></button>
        <button class="btn btn-warning"  onClick="deleteData(${index})" ><span class="material-symbols-outlined">
        delete
        </span></button></td>`;
    html += "</tr>";
  });

  document.querySelector("#data").innerHTML = html;
}
// delete data/////////////////////////////////////////////////////////////////////////
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
// update data////////////////////////////////////////////////////////////////
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
    peopleList[index].Name = Name.value;
    peopleList[index].Address = Address.value;
    peopleList[index].email = email.value;
    peopleList[index].birthday = birthday.value;
    peopleList[index].Gender = $(
      "input[type='radio'][name='gender']:checked"
    ).val();
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    location.reload();
  };
  showData();
}

// Validation

// if (Address == "") {
//   window.alert("Please enter your address.");
//   return false;
// }
