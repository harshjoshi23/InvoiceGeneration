function onFocus() {
    document.getElementById("login-message").style.display = "block";
}

function onBlur() {
    document.getElementById("login-message").style.display = "none";
}
// myInput.onkeyup =
function onKeyUp() {
    var myInput = document.getElementById("input-pass");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var length = document.getElementById("length");
    // console.log("keyup called", myInput, letter, capital, number, length);

    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if (myInput.value.match(lowerCaseLetters)) {
        letter.classList.remove("invalid");
        letter.classList.add("valid");
    } else {
        letter.classList.remove("valid");
        letter.classList.add("invalid");
    }

    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if (myInput.value.match(upperCaseLetters)) {
        capital.classList.remove("invalid");
        capital.classList.add("valid");
    } else {
        capital.classList.remove("valid");
        capital.classList.add("invalid");
    }

    // Validate numbers
    var numbers = /[0-9]/g;
    if (myInput.value.match(numbers)) {
        number.classList.remove("invalid");
        number.classList.add("valid");
    } else {
        number.classList.remove("valid");
        number.classList.add("invalid");
    }

    // Validate length
    if (myInput.value.length >= 8) {
        length.classList.remove("invalid");
        length.classList.add("valid");
    } else {
        length.classList.remove("valid");
        length.classList.add("invalid");
    }
}

var users = [
    { userName: "User1", pass: "Userpass1" },
    { userName: "User2", pass: "Userpass2" },
    { userName: "User3", pass: "Userpass3" },
    { userName: "User4", pass: "Userpass4" },
    { userName: "User5", pass: "Userpass5" },
];

var CurrentUser;

const buildInvoice = () => {
    let user = window.localStorage.getItem("user");
    let cart = window.localStorage.getItem("cart");

    user = JSON.parse(user);
    cart = JSON.parse(cart);

    let bill = document.getElementById("bill");
    let opUser = document.getElementById("operator_info");

    opUser.innerHTML += user.userName + "   " + user.pass;
    cart.forEach((item) => {
        bill.innerHTML +=
            "<p>" +
            item.name +
            "  -  " +
            item.orderId +
            "  -  " +
            item.totalAmount +
            "</p>";
    });

    console.log("clickFun", cart);
};

const generateInvoice = () => {
    let user = window.localStorage.getItem("user");
    window.location.href = "http://127.0.0.1:5500/HTML/invoice.html";

    user = JSON.parse(user);

    let opUser = document.getElementById("operator_info");
    opUser.innerHTML += user.userName + "   " + user.pass;

    console.log("clickFun", user);
};

const register = (event) => {
    event.preventDefault();
    console.log("register");
    let userid = document.getElementById("uname").value;
    let password = document.getElementById("input-pass").value;

    const condUser = users.find(
        ({ userName, pass }) => userName === userid && pass === password
    );
    window.localStorage.setItem("user", JSON.stringify(condUser));

    // CurrentUser = condUser;
    if (condUser) {
        window.location.href = "http://127.0.0.1:5500/HTML/page2.html";
    } else {
        alert("Wrong Credentials: ");
        CurrentUser = condUser;
    }
    // if(users[{userName}] == userid && password[{password}] == ){

    // }
};

//COMMENTS//

const inventory = [
    {
        orderId: 101,
        amount: 100,
        name: "Apple",
        quantity: 19,
    },
    {
        orderId: 102,
        amount: 200,
        name: "Bpple",
        quantity: 29,
    },
    {
        orderId: 103,
        amount: 400,
        name: "Cpple",
        quantity: 9,
    },
    {
        orderId: 104,
        amount: 1000,
        name: "Dpple",
        quantity: 119,
    },
    {
        orderId: 105,
        amount: 10,
        name: "Fpple",
        quantity: 9,
    },
];

const cart = [];

const addItem = () => {
    let orderId = document.getElementById("code-id").value;
    let quantity = document.getElementById("qt-id").value;
    let prodNoNode = document.getElementsByClassName("left");
    let prodNameNode = document.getElementsByClassName("middle");
    let amount = document.getElementsByClassName("right");
    let finalSumNode = document.getElementById("amount-id");

    console.log(orderId, quantity);
    console.log("Type of quantity", typeof quantity);

    // product jo user ko add karna hai
    const product = inventory.find(
        (itemBanana) => itemBanana.orderId === parseInt(orderId)
    );

    console.log(product);
    // if (product.quantity < quantity) {
    //     alert("Max qt exceeded");
    // }

    let totalAmount = product.amount * quantity;
    // In place of one total amount we can also have a key value

    inventory.forEach((item, i) => {
        if (parseInt(orderId) === item.orderId) {
            // alert("This is your item", item);
            inventory[i].quantity -= quantity;
        }
    });

    cart.push({
        name: product.name,
        orderId: product.orderId,
        totalAmount,
    });

    let abhiTakCartNetAmount = 0;
    cart.forEach((item) => {
        abhiTakCartNetAmount += item.totalAmount;
    });
    // console.log("abhiTakCartNetAmount :::", abhiTakCartNetAmount);
    // console.log("Product is :::", product);
    // console.log("Prod No. :::", prodNoNode[0]);
    // console.log("finalSumNode  :::", finalSumNode);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    prodNoNode[0].innerHTML += "<br>" + product.orderId;
    prodNameNode[0].innerHTML += "<br>" + product.name;
    amount[0].innerHTML += "<br>" + product.amount;

    finalSumNode.innerHTML = "Total Amount : <br>" + abhiTakCartNetAmount;
};

// document.getElementById("submit-bt").addEventListener("click", myFunction);
// myFunction = () => {
//     window.location.href = "page2.html";
// };

// // for filter orderId 201
// // [{
// //     orderId: 201,
// //     amount: 200,
// //     name: "Bpple",
// //     quantity: 29,
// // }]
// // product[0]; -- to access out product

// // for find oderId 201
// // {
// //     orderId: 201,
// //     amount: 200,
// //     name: "Bpple",
// //     quantity: 29,
// // }
// // product; -- to access out product
