var alertPlaceholder = document.getElementById('liveAlertPlaceholder')
var alertTrigger = document.getElementById('liveAlertBtn')

function alert(message, type) {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

  alertPlaceholder.append(wrapper)
}

if (alertTrigger) {
  alertTrigger.addEventListener('click', function () {
    alert('Congratulations, you\'re a Partner', 'success')
  })
}


//form variable
const form = document.getElementById('survey-form'),
      table = document.querySelector('.table'),
      editForm = document.getElementById('edit-form'),
      viewForm = document.getElementById('view-form');
 let editFormId = null;     

//event listeners
//form submit event listener
form.addEventListener('submit', formSubmit);
editForm.addEventListener('submit', editFormSubmit);

//save data on page load
document.addEventListener('DOMContentLoaded', loadTableData);

//form submit function
function formSubmit(e) {
  e.preventDefault();
  //read the name value
  let businessName = document.getElementById('name');
  let businessEmail = document.getElementById('email');
  let businessAge = document.getElementById('number');
  let businessType = document.getElementById('dropdown');
  let recommend = document.querySelector("input[name='recommend']:checked");
  let improvement = document.querySelector("input[name='improve']:checked");
  let comment = document.getElementById('comments');


  //create button
  // let buttons = document.createElement('button');
  //     buttons.classList.add('btn', 'btn-info', 'buttons', 'edit');
  //     buttons.appendChild(document.createTextNode('Edit'));
  // let buttons1 = document.createElement('button');
  //     buttons1.classList.add('btn', 'btn-danger', 'buttons', 'del');
  //     buttons1.appendChild(document.createTextNode('Delete'));
  // let myDiv = document.createElement('div');
  //     myDiv.append(buttons, buttons1);

  //create formobject
  const formObject = {
    businessName: businessName.value,
    businessEmail: businessEmail.value,
    businessAge: businessAge.value,
    businessType: businessType.value,
    recommend: recommend.value,
    improvement: improvement.value,
    comment: comment.value,
    id: Date.now()
  }

    //create rows and insert cells
    // table = document.querySelector('.table');
    // row = table.insertRow(-1);

    // businessName = row.insertCell(0);
    // businessEmail = row.insertCell(1);
    // businessAge = row.insertCell(2);
    // businessType = row.insertCell(3);
    // recommend = row.insertCell(4);
    // improvement = row.insertCell(5);
    // comment = row.insertCell(6);
    // let button = row.insertCell(7);


    //insert data into cells created
    // businessName.innerHTML = formObject.businessName;
    // businessEmail.innerHTML = formObject.businessEmail
    // businessAge.innerHTML = formObject.businessAge
    // businessType.innerHTML = formObject.businessType
    // recommend.innerHTML = formObject.recommend;
    // improvement.innerHTML = formObject.improvement;
    // comment.innerHTML = formObject.comment;
    // button.appendChild(myDiv);

    //add to local storage
    addFormLocalStorage(formObject);

    console.log('I have been submitted by event listener', formObject);
    window.location.reload();
}

//keep data on page on reload
// function onLoad() {
//   let formObjects = getFormFromStorage();

//   console.log(formObjects, 'reloading................');
//   //loop through storage and print the values
//   formObjects.forEach(function(formObject, index){

//     //create button
    
//     let buttons = document.createElement('button');
//       buttons.classList.add('btn', 'btn-info', 'buttons', 'edit');
//       buttons.appendChild(document.createTextNode('Edit'));
//     let buttons1 = document.createElement('button');
//       buttons1.classList.add('btn', 'btn-danger', 'buttons', 'del');
//       buttons1.appendChild(document.createTextNode('Delete'));
//     // let myDiv = document.createElement('div');
//     //   myDiv.append(buttons, buttons1);


//     //create rows and insert cells
//       // table = document.querySelector('.table');
//       row = table.insertRow(-1);
//       sn = row.insertCell(0);
//       businessName = row.insertCell(1);
//       businessEmail = row.insertCell(2);
//       businessAge = row.insertCell(3);
//       businessType = row.insertCell(4);
//       recommend = row.insertCell(5);
//       improvement = row.insertCell(6);
//       comment = row.insertCell(7);
//       let button = row.insertCell(8);


//       //insert data into cells created
//       sn.innerHTML = index;
//       businessName.innerHTML = formObject.businessName;
//       businessEmail.innerHTML = formObject.businessEmail
//       businessAge.innerHTML = formObject.businessAge
//       businessType.innerHTML = formObject.businessType
//       recommend.innerHTML = formObject.recommend;
//       improvement.innerHTML = formObject.improvement;
//       comment.innerHTML = formObject.comment;
//       button.append(buttons, buttons1);
//   })
// }


function loadTableData() {
  let formObjects = getFormFromStorage();

  const tableData = document.getElementById('table-data');

  formObjects.map(function(data, index){
    // console.log(data, "current object data", JSON.stringify(data));
    tableData.innerHTML += `
                    <tr>
                    <td>${index + 1}</td>
                    <td>${data.businessName}</td>
                    <td>${data.businessEmail}</td>
                    <td>${data.businessAge} year(s)</td>
                    <td>${data.businessType}</td> 
                    <td>${data.recommend}</td>
                    <td>${data.improvement}</td>
                    <td>${data.comment}</td>
                    <td><i class="fa-solid fa-pen-to-square buttons edit" onclick="editAction(${data.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop2"></i></td>
                    <td><i class="fa-solid fa-trash buttons delete" onclick="jsConfirm(${data.id})"></i></td>
                    <td><i class="fa-solid fa-eye buttons view" onclick="viewAction(${data.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop3"></i></td>
                    </tr>
                    `;
  })
  
}

function viewAction(id){
  let formObjects = getFormFromStorage();
  const itemToBeEdited = formObjects.find((data) => data.id === id);

  let viewName = document.getElementById('viewName');
  let viewEmail = document.getElementById('viewEmail');
  let viewNumber = document.getElementById('viewNumber');
  let viewType = document.getElementById('viewType');
  let viewRecommendation = document.getElementById('viewRecommendation');
  let viewImprovement = document.getElementById('viewImprovement');
  let viewComments = document.getElementById('viewComments');

  viewName.textContent = itemToBeEdited.businessName;
  viewEmail.textContent = itemToBeEdited.businessEmail;
  viewNumber.textContent = itemToBeEdited.businessAge;
  viewType.textContent = itemToBeEdited.businessType;
  viewRecommendation.textContent = itemToBeEdited.recommend;
  viewImprovement.textContent = itemToBeEdited.improvement;
  viewComments.textContent = itemToBeEdited.comment;
}


function editAction(id) {

  let formObjects = getFormFromStorage();
  const itemToBeEdited = formObjects.find((data) => data.id === id);
  editFormId = id;

  //Modal Inputs
  let editName = document.querySelector("#editName");
  let editEmail = document.querySelector("#editEmail");
  let editNumber = document.querySelector("#editNumber");
  let editType = document.getElementById('editDropdown');
  let editRecommend = document.querySelectorAll("input[name='editRecommend']");
  [...editRecommend].map((option) => {
    console.log(option, itemToBeEdited.recommend);
    if(option.value == itemToBeEdited.recommend){
      console.log(option);
      option.checked = true;
    }
  })
  let editImprovement = document.querySelectorAll("input[name='editImprove']");
  [...editImprovement].map((option) => {
    console.log(option, itemToBeEdited.improvement);
    if(option.value == itemToBeEdited.improvement){
      console.log(option);
      option.checked = true;
    }
  })
  let editComments = document.querySelector("#editComments");

  console.log( 'string', editRecommend, editImprovement, 'another string');
  
  editName.value = itemToBeEdited.businessName;
  editEmail.value = itemToBeEdited.businessEmail;
  editNumber.value = itemToBeEdited.businessAge;
  editType.value = itemToBeEdited.businessType;
  editRecommend.value = itemToBeEdited.recommend;
  editImprovement.value = itemToBeEdited.improvement;
  editComments.value = itemToBeEdited.comment;
 
}

function editFormSubmit(e) {
  e.preventDefault();
  let formObjects = getFormFromStorage();

  let editName = document.querySelector("#editName");
  let editEmail = document.querySelector("#editEmail");
  let editNumber = document.querySelector("#editNumber");
  let editType = document.getElementById('editDropdown');
  let editRecommend = document.querySelector("input[name='editRecommend']:checked");
  let editImprovement = document.querySelector("input[name='editImprove']:checked");
  let editComments = document.querySelector("#editComments");

  console.log(editRecommend, editImprovement, 'string', editRecommend.value, editImprovement.value);

  const formObject = {
    businessName: editName.value,
    businessEmail: editEmail.value,
    businessAge: editNumber.value,
    businessType: editType.value,
    recommend: editRecommend.value,
    improvement: editImprovement.value,
    comment: editComments.value,
    id: editFormId
  }

  const result = formObjects.filter(function(formsLS){
      if(formsLS.id != formObject.id){
        return formsLS;

      }
  });

  result.push(formObject);

  console.log(formObject, 'form string');


  localStorage.setItem('formObjects', JSON.stringify(result));
  window.location.reload();
}


function jsConfirm(id) {
  
  if(confirm("Are you sure you want to delete?")){
    removeDataFromLocalStorage(id);
    console.log("delete");
  }else{
    
    console.log("don't delete");
  }
}

//add form data into the local storage
function addFormLocalStorage(formObject) {
  let formObjects = getFormFromStorage();

  //add form data into the array
  formObjects.push(formObject);

  //convert formdata array into string
  localStorage.setItem('formObjects', JSON.stringify(formObjects));
}


function getFormFromStorage() {
  let formObjects;
  const formsLS = localStorage.getItem('formObjects');
  //get the values, if null is returned then we create an empty array
  if (formsLS === null) {
      formObjects = [];
  } else {
      formObjects = JSON.parse(formsLS);
  }
  return formObjects;
}

//removes data from the dom
function removeData(e) {
  // if(e.target.classList.contains('del')){
  //   e.target.parentElement.parentElement.parentElement.remove();
  // }  
  console.log(e.target.parentElement.parentElement.parentElement.textContent[0], 'param to remove', e.target.parentElement.parentElement.parentElement.textContent);

  //remove from storage
  removeDataFromLocalStorage(e.target.parentElement.parentElement.parentElement.textContent[0]);
  
}

//removes data from local storage
function removeDataFromLocalStorage(id){
  //gets data from local storage
  let formObjects = getFormFromStorage();

  console.log(formObjects, 'array before delete');
  
  const result = formObjects.filter(function(formsLS, index){
    console.log(index, 'compare', id);
      if(formsLS.id != id){

        return formsLS;
      }
  });
  console.log(formObjects, 'array after delete', result);
  localStorage.setItem('formObjects', JSON.stringify(result));
  window.location.reload();
}







