function openSideNav() {
  $(".side-nav-menu").animate({
      left: 0
  }, 500)


  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");


  for (let i = 0; i < 5; i++) {
      $(".links li").eq(i).animate({
          top: 0
      }, (i + 5) * 100)
  }
}
function closeNav() {
  let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
  $(".side-nav-menu").animate({
      left: -boxWidth
  }, 500)

  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");


  $(".links li").animate({
      top: 300
  }, 500)
}

closeNav()
$(".side-nav-menu i.open-close-icon").click(() => {
  if ($(".side-nav-menu").css("left") == "0px") {
      closeNav()
  } else {
      openSideNav()
  }
})

let homeData = document.getElementById("demo")

async function getApiData(name){
  let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let food = await apiData.json();
  if(food != null){
      DisplayHomeData(await food.meals)
      console.log(food.meals)
  // return food.meals 

  }
  
}
async function getApiDataLetter(letter){
  let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${letter}`)
  let food = await apiData.json();
  if(food != null){
      DisplayHomeData(await food.meals)
      console.log(food.meals)
  // return food.meals 

  } 
}

function DisplayHomeData(arr){
  let cartona = "";
  for (let i=0; i<arr.length; i++)
  {

      cartona +=`
      <div class="col-md-3 mt-5">
             <div id="mealcont" onclick="GetMealInfo(${arr[i].idMeal})" class="content position-relative">
             <img src="${arr[i].strMealThumb}" id="meal"  class=" w-100 " alt="">

             <div id="overlay" onclick="DisplayInstructions(${i})" class="overlay position-absolute d-flex align-items-center justify-content-start ">
             <h3 class="text-center">${arr[i].strMeal}</h3>
             
             </div>
             </div>
      
      </div>   `
  }
  
  homeData.innerHTML=cartona;
  console.log(cartona)
}


async function GetMealInfo(id){
  let cartona = "";
  let apiData = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  let meal = await apiData.json();
  console.log(meal.meals['0'])
  if(meal.meals['0'] != null){
      let ingredients = ``

  for (let i = 1; i <= 20; i++) {
      if (meal.meals['0'][`strIngredient${i}`]) {
          ingredients += `<li class="alert alert-info m-2 p-1">${meal.meals['0'][`strMeasure${i}`]} ${meal.meals['0'][`strIngredient${i}`]}</li>`
      }
  }

  
      cartona +=`
      <div class="col-md-4 mt-3 text-white">
              <img src='${meal.meals['0'].strMealThumb}' class="w-100" alt="">
              <h3>${meal.meals['0'].strMeal}</h3>
          </div>
          <div class="col-md-8 mt-3 text-white">
              <h3>Instructions</h3>
              <p>${meal.meals[0].strInstructions}</p>
              <h3>Area: <span>${meal.meals[0].strArea}</span></h3>
              <h3>category: <span>${meal.meals[0].strCategory}</span></h3>
              <h3>recipies: </h3>
              <ul class="list-unstyled d-flex g-3 flex-wrap">
              ${ingredients}
          </ul>
              <h3 class="mb-3">tags:</h3>
              <span class="rounded-2 bg-info text-white p-2"> ${meal.meals[0].strTags} </span></br>
              <button id="source" onclick="openlink('${meal.meals[0].strSource}')"  class=" mt-3 rounded-2 border-0 text-white " >Source</button>
              <button onclick="openlink('${meal.meals[0].strYoutube}')" class="bg-danger rounded-2 border-0 text-white" >Youtube</button>

          </div>  `
    

  } 
  
  homeData.innerHTML=cartona;


}
function openlink(link){
  window.location.href = link;
}





function DisplayInstructions(index){
  let cartona = "";
  for(let i=0 ; i<arr.length ; i++)
  {
      if (i==index)
      {
      cartona+= `
      <div class="col-md-4 mt-5">
      <img src="${arr[i].strMealThumb}" id="meal"  class=" w-100 " alt="">
      <h3>${arr[i].strMeal}</h3>
      </div>
      <div class="col-md-8 mt-5">
      <h3>Instructions: <span>${arr[i].strInstructions}</span></h3>
      </div>

      `
      }
  }    
  homeData.innerHTML=cartona; 
}



$("#searchbar").hide()

$("#searchkey").click( function(){
  $("#searchbar").show()
  closeNav()
 
})

async function getCatData(){
  let catData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let categs = await catData.json();
  console.log(categs)
  return categs.categories 
}

function DisplayCatData(arr){
  let cartona = "";
  for (let i=0; i<arr.length; i++)
  {
      cartona +=`
      <div class="col-md-3 mt-5">
             <div id="mealcont" onclick="getCatList('${arr[i].strCategory}')" class="content position-relative">
             <img src=" ${arr[i].strCategoryThumb}" id="meal"  class=" w-100 " alt="">

             <div id="overlay"  class="overlay  position-absolute d-flex align-items-center justify-content-start ">
             <p>${arr[i].strCategoryDescription}</p>
             
             </div>
             </div>
      
      </div>   
      `
  }
  homeData.innerHTML=cartona;
  console.log(cartona)
 

}

async function getCatList(name){
  let catData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
  let categs = await catData.json();
  console.log(categs)
  if(categs.meals != null){
      console.log("ana henaaaaaaaaa")
      DisplayHomeData(await categs.meals)
      console.log(categs.meals)
  // return food.meals 

  } 
}

$("#categoryKey").click(async function(){
  let cat = await getCatData()
  DisplayCatData(cat)
  closeNav()
  
})


async function getAreaData(name){
  let areaData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=${name}`)
  let areas = await areaData.json();
  // console.log(areas)
  return areas.meals 
}

function recpies(arr){
  let cartona =""
  for(let i=0 ; i<arr.length ; i++)
  {
      cartona += `
      <span class="bg-light rounded-2 text-white m-1">${arr[i]}</span>`
  }

}


function DisplayAreaData(arr){
  let cartona = "";
  for (let i=0; i<arr.length; i++)
  {
      cartona +=`
      <div onclick="getAreaList('${arr[i].strArea}')" class="col-md-3 mt-5">
         
         <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
         <h3 class="text-white">${arr[i].strArea}</h3>
      
      </div>
      `
  }
  homeData.innerHTML=cartona;
  console.log(cartona)

}

async function getAreaList(name){
  let AreaData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${name}`)
  let areameals = await AreaData.json();
  console.log(areameals.meals)
  if(areameals.meals != null){
      console.log("ana henaaaaaaaaa")
      DisplayHomeData(await areameals.meals)
      console.log(areameals.meals)
  // return food.meals 

  } 
}

$("#areakey").click(async function(){
  let area = await getAreaData()
  DisplayAreaData(area)
  closeNav()
})

async function getIngData(){
  let IngData = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  let ings = await IngData.json();
  // console.log(ings)
  return ings.meals 
}


function DisplayIngaData(arr){
  let cartona = "";
  for (let i=0; i<arr.length; i++)
  {
      cartona +=`
      <div class="col-md-3">
              <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer mt-4">
                      <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                      <h3 class="text-white">${arr[i].strIngredient}</h3>
                      <p class="text-white">${arr[i].strDescription}</p>
              </div>
      </div>
      `
  }
  homeData.innerHTML=cartona;
  console.log(cartona)

}

async function getIngredientsMeals(ingredients) {
  demo.innerHTML = ""

  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
  response = await response.json()


  DisplayHomeData(response.meals.slice(0, 20))

}

$("#ingKey").click(async function(){
  let ing = await getIngData()
  DisplayIngaData(ing)
  closeNav()
})




$("#contactKey").click(function(){
  window.location.href = 'contact.html'
  closeNav()


})

async function start(){
  let meals = await getApiData("")
  DisplayHomeData(meals)
  
}

start()

let Uname = document.getElementById("name")
let email = document.getElementById("email")
let phone = document.getElementById("phone")
let age = document.getElementById("age")
let pass = document.getElementById("pass")
let repass = document.getElementById("repass")
let logBtn = document.getElementById("btn")

function validateName(){
  let regex = /^[A-Z][a-z]{3,}$/;
  if (regex.test(Uname.value)) {
    Uname.style = "border:3px solid green";
    return true;
  } else {
    Uname.style = "border:3px solid red";
    return false;
  }
}

function validateEmail(){
  let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(email.value)) {
    email.style = "border:3px solid green";
    return true;
  } else {
    email.style = "border:3px solid red";
    return false;
  }
}

function validatePhone(){
  let regex = /^(?:\+?\d{2}[ -]?\d{3}[ -]?\d{5}|\d{4})$/;
  if (regex.test(phone.value)) {
    phone.style = "border:3px solid green";
    return true;
  } else {
    phone.style = "border:3px solid red";
    return false;
  }
}

function validateAge(){
  
  if ((age.value)>0 || (age.value)<200 ) {
    age.style = "border:3px solid green";
    return true;
  } else {
    age.style = "border:3px solid red";
    return false;
  }
}



function validatePass(){
  let regex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
  if (regex.test(pass.value)) {
    pass.style = "border:3px solid green";
    return true;
  } else {
    pass.style = "border:3px solid red";
    return false;
  }
}

function validateRepass(){
  
  if ((repass.value) == (pass.value)) {
    repass.style = "border:3px solid green";
    return true;
  } else {
    repass.style = "border:3px solid red";
    return false;
  }
}

let users;

console.log(localStorage.getItem("users"));
if (localStorage.getItem("users") == null) {
users = [];
} else {
users = JSON.parse(localStorage.getItem("users"));

}

function addUser(){
  let user ={
    uName: Uname.value,
    uEmail: email.value,
    uPhone:  phone.value,
    uAge: age.value,
    uPass: pass.value,
    Urepass: repass.value
  }
  
  if(validateName(Uname.value)==true && validateEmail(email.value)==true && validatePhone(phone.value)==true && validateAge(age.value)==true && validatePass(pass.value)==true && validateRepass(repass.value)==true){
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    clearSignform();
    window.alert("added")
  }else{
    window.alert("Please Enter Correct Info")
  }
  
}
function clearSignform() {
  Uname.value = "";
  email.value = "";
  phone.value = "";
  age.value = "";
  pass.value = "";
  repass.value = "";
}


