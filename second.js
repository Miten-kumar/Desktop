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
let form=document.getElementById("myForm");
form.addEventListener("submit",(e)=>{e.preventDefault()})


$(document).ready(function () {
  var currentDate = new Date();
  $('.disableFuturedate').datepicker({
  format: 'dd/mm/yyyy',
  autoclose:true,
  endDate: "currentDate",
  maxDate: currentDate
  }).on('changeDate', function (ev) {
     $(this).datepicker('hide');
  });
  $('.disableFuturedate').keyup(function () {
     if (this.value.match(/[^0-9]/g)) {
        this.value = this.value.replace(/[^0-9^-]/g, '');
     }
  });
});



function validation() {
  let name = document.forms.RegForm.Name.value;
  let Address = document.forms.RegForm.Address.value;
  let email = document.forms.RegForm.email.value;
//   var regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g; //Javascript reGex for Email Validation.
  // Javascript reGex for Phone Number validation.
  var regName = /\d+$/g; // Javascript reGex for Name validation

  if (name == "" || regName.test(name)) {
    window.alert("Please enter your name properly.");
    // name.focus();
    return false;
  }

  if (Address == "") {
    window.alert("Please enter your address.");
    // Address.focus();
    return false;
  }
if(birthday==''){

}
  // if (email == "" || !regEmail.test(email)) {
  //   window.alert("Please enter a valid e-mail address.");
  //   // email.focus();
  //   return false;
  // }

  return true;
}

// Adddata...................................................................................
let peopleList;
function Adddata() {
  if (!validation()) {
    return false;
  }
  let Name = document.getElementById("Name").value;
  let Address = document.getElementById("Address").value;
  let email = document.getElementById("email").value;
  let birthday = document.getElementById("birthday").value;
  let Gender = $("input[type='radio'][name='gender']:checked").val();
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
showData();
  return true;
  
  // console.log(Name, Address, Gender, email, birthday);
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
