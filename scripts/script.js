// GLOBAL OBJECTS AND VARIABLES___________________________________________

//make a cart set with selected items from customer

cartSet = new Set();

//stock arry 

stockArray = [
    pink_cake= { 
        name:"pink_cake",
        price: 4.30,
        src: "images/pink_cake.jpg"
    },

    strawberry_cream = {
        name:"strawberry_cream",
        price: 2.20,
        src: "images/strawberry_cream.jpg"
    },

    cake_pops= {
        name:"cake_pops",
        price: 0.80,
        src: "images/cake_pops.jpg"
    },

    strawberry_cake= {
        name:"strawberry_cake",
        price: 9.50,
        src: "images/strawberry_cake.jpg"
    },

    homemade_gugelhupf= {
        name:"homemade_gugelhupf",
        price: 4.30,
        src: "images/homemade_gugelhupf.jpg"
    },

    chocolate_muffins= {
        name:"chocolate_muffins",
        price: 2.30,
        src: "images/chocolate_muffins.jpg"
    }
]

// make a stock set

stockSet = new Set(stockArray);




// BASIC FUNCTIONS______________________________________________________________

// make cart panel show up and product container makes space
makeCartAppear = () => {
    document.querySelector(".cart-panel-hidden").classList.add("cart-panel-appear");
    document.querySelector(".products-container").classList.add("products-container-w-75");
    document.querySelector(".closer_cart_panel").classList.remove("hide_closer_card_panel");
    document.querySelector(".sum-container").classList.remove("hide_total_sum");

        // adding window closing funcitonality to cart
    document.querySelector(".closer_cart_panel").addEventListener("click",function()
     {  
        document.querySelector(".cart-panel-hidden").classList.remove("cart-panel-appear");
        document.querySelector(".products-container").classList.remove("products-container-w-75"); 
        document.querySelector(".closer_cart_panel").classList.add("hide_closer_card_panel");
        document.querySelector(".sum-container").classList.add("hide_total_sum");

      } 
      )


    } /* end of make cart appear */


// check if item is already in cart

checkItemInCart = function (event) {

    let item = event.target.value;
    let itemAlreadyInCart = false; 

    // check if item is part of shopping cart array

    cartSet.forEach(function(param) {
        if(param.name == item) {
            itemAlreadyInCart = true;
        }
    })
     // if its  part of the user shopping cart increase counter to 1 

    if (itemAlreadyInCart) {
        increaseCounter(item);

        // calculating new total when counter is increased
         calculateTotalSum();
        
        // implement the possibility to decrease the amount of items in the cart
        addingDescreaseCounter();
        

    } /* end when the item is already in the cart*/

    // if its not part of the user shopping cart add it
    if(!itemAlreadyInCart) {     
        for (let param of stockSet) {
            if(param.name == item) {
                item = param;
            }
        }
        addItemToCart(item);
    } /* end of else clause */
}

// ADDING THE BASIC FUNCTIONALITIES_______________________________________________

// adding functionality to show my cart button

document.querySelector(".showCart1").addEventListener("click", makeCartAppear);

document.querySelector(".showCart2").addEventListener("click", makeCartAppear);

// adding functionality to check if item is already in cart. If yes increase counter, if no add to cart

addButtons = document.querySelectorAll(".addBtn");

addButtons.forEach((param)=> {
    param.addEventListener("click", checkItemInCart);
}); 




// FUNCTIONS CALLED BY BASIC FUNCTIONS_______________________________________________


// add items to carts

addItemToCart = function(param) {

    
    cartSet.add(param);
    let shopping_cart = document.querySelector(".closing_container");
    let stringToAdd = `
    <div class='cart-row w-100 d-flex justify-content-center my-3'>
        <div class='cart-item-container'> 
              <img class='cart-item-img' src='images/${param.name}.jpg'>
         <div class='cart-item-text-container'> 
             <p> <span id='${param.name}_counter'>1</span>x`+` `+ param.name+`</p>
             <p> $ <span id='${param.name}_price'>`+` `+param.price+`</span></p>
         </div>
            <div class="cart-item-trash-container">
                <i class="fas fa-trash mt-1" value='${param.name}'></i>
                <i class="fas fa-minus mt-5 reduce_counter" value='${param.name}'> </i>
            </div>
         </div>
     </div>`;
    shopping_cart.insertAdjacentHTML("afterend", stringToAdd);

    // calculating the toal when smth. gets added initially
    calculateTotalSum();

    // implement the possibility to decrease the amount of items in the cart
    addingDescreaseCounter();
    

    addRemoveNodesToTrashCan();
}

// increasing the counter of items in the card

increaseCounter = function(param) {
    let querySelector="#"+param+"_counter";
    let counter = parseInt(document.querySelector(querySelector).innerHTML); 
    counter++;
    document.querySelector(querySelector).innerHTML = counter;
}

// adding reduce counter function to little minus icon

addingDescreaseCounter = function() {
    if(cartSet.size == 1) {
            document.querySelector(".reduce_counter").addEventListener(
                "click",decreaseCounter
            );
        }

        else {
            let reduceCounerMinuses = document.querySelectorAll(".reduce_counter");
            reduceCounerMinuses.forEach(function(param) {
                param.addEventListener(
                "click", decreaseCounter
            );  
            } );
        
        }
}

// actual reduce counter function

decreaseCounter = function(event) {
    let clickedRemoveMinus = event.currentTarget.getAttribute("value");
    let querySelector="#"+clickedRemoveMinus+"_counter";
    let counter = parseInt(document.querySelector(querySelector).innerHTML); 
    counter--;

    if(counter == 0) {
        deleteActualNode(clickedRemoveMinus);
    }

    else {
        document.querySelector(querySelector).innerHTML = counter;
    }

    // calculate total when counter is decreased
    
    calculateTotalSum();
}


// adding remove node function to trash can 

addRemoveNodesToTrashCan = function() {
    deleteButtons = document.querySelectorAll(".fa-trash");

    deleteButtons.forEach((param)=> {
        param.addEventListener("click", deleteItemFromCart);
    }); 
}

// deleting item from cart

deleteItemFromCart = function(event) {
    let nameOfItem = event.currentTarget.getAttribute("value");
    deleteActualNode(nameOfItem);
    }

   

deleteActualNode = function(nameOfItem) {

    cartSet.forEach((param)=> {
        if(param.name == nameOfItem) {
            cartSet.delete(param);
        }
    })

    // Removing the node 

    let trashContainer = event.target.parentNode; 
    let itemContainer = trashContainer.parentNode; 
    itemContainer.remove();

    // calculating new total when item is deleted entirely
         calculateTotalSum();
}



calculateTotalSum = function () {
    // check the cartSet 

    let priceArray= [];
    let countArray= [];
    let totalSum = 0;

    cartSet.forEach(
        function(param) {
            let querySelectorCounter ="#"+param.name+"_counter"; 
            let count = parseInt(document.querySelector(querySelectorCounter).innerHTML);
            countArray.push(count);
            priceArray.push(param.price);
        }

    );

    for (let i=0;i<cartSet.size;i++) {
        totalSum += priceArray[i] * countArray[i];
    };

    document.querySelector("#totalSum").innerHTML = totalSum.toFixed(2);;


}


















