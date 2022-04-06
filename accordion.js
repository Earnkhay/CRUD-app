//accordion variables
const accordion = document.querySelector('.partner'),
      content = document.querySelector('.ptncontent');

//accordion event listener
accordion.addEventListener('click', accordionFunction);

//selecting old arrow
let arrowDown = document.querySelector('.fa-angle-down');


//creating new arrow
const arrowUp = document.createElement('i');
    arrowUp.classList.add('fas', 'fa-angle-up');

//function for the click event 
function accordionFunction() {

  if (content.style.display === 'block') {
    content.style.display = 'none';
    //default background color
    accordion.style.background = "white";
    //default arrow
    accordion.replaceChild(arrowDown, arrowUp);
  } else {
    content.style.display = 'block';
    //background color when clicked
    accordion.style.background = "skyblue";
    //displays new arrow when clicked
    accordion.replaceChild(arrowUp, arrowDown);
  }
}


// const accordionFunction = (e) =>{

// }

// function accordionFunction(e) {
//   // element = e.target.classList;     
//   // console.log(element);
//   if (e.target.classList.contains('partner')) {
//     //display the accordion content and change background colour.
//     content.style.display = 'block';
//     accordion.style.background = "skyblue";

//     this.classList.toggle('active');

//     //replace the down arrow with the up arrow
//     let arrowUp = e.target.children[1];
    
//     const arrowDown = document.createElement('i')
//     arrowDown.classList.add('fas', 'fa-angle-up');

//     accordion.replaceChild(arrowDown, arrowUp);
//   } else if(e.target.classList.contains('active')){
//     console.log('yes');
//   }
// }