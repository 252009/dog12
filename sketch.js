var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var feedFood
var foodObj;

//create feed and lastFed variable here
var lastFed
var feed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedFood=createButton("feed food")
  feedFood.position(900,95)
  feedFood.mousePressed(feedDog())



  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  fedTime=database.ref('FeedTime'); fedTime.on("value",function(data){ lastFed=data.val(); }); 
 if(lastFed>=12)
 {
    fill("black")
    text("Time : " + lastFed%12 + " PM" ,350,30)
 }
 else if(lastFed==0)
 {
    fill("black")
    text("Time : 12 AM",350,30 )
 }
 else
 {
    fill("black")
    text("Time : " + lastFed%12 + "AM" ,350,30)
 }
 
  //write code to display text lastFed time here
 
 
  drawSprites();
}


//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  
  
  
}


function feedDog(){
  dog.addImage(happyDog);
  var food_stock_val=foodObj.getFoodStock()
  if(food_stock_val<=0)
  {
    foodObj.updateFoodStock(food_stock_val*0)
  }
  else{
    foodObj.updateFoodStock(food_stock_val*-1)
  }
  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock()
  if(food_stock_val<=0)
  {
     foodObj.updateFoodStock(food_stock_val*0)
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

  //
/* 1. Line 32: Add the functions name you want to call inside mousePressed() 
2. Add code to read the feed time from database before line 46 fedTime=database.ref('FeedTime'); fedTime.on("value",function(data){ lastFed=data.val(); }); 
3. Line 51 and 59: replace hour with lastFed 4. Delete lines 73 to 77, they should be in some other function which you have already made
 */