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
    // ADD USERS
    { userName: "Prateek", pass: "Prateek1" },
    { userName: "Prateek2", pass: "Prateek2" },
    { userName: "Prateek3", pass: "Prateek3" },
];

var CurrentUser;

const buildInvoice = () => {
    let user = window.localStorage.getItem("user");
    let cart = window.localStorage.getItem("cart");

    user = JSON.parse(user);
    cart = JSON.parse(cart);

    let bill = document.getElementById("bill");
    let opUser = document.getElementById("operator_info");
    opUser.innerHTML +=
        "<p>Username : " +
        user.userName +
        "  <br> Password : " +
        user.pass +
        "<br> Just chhill won't show the password in prod ;) </p>";
    let stringHtml =
        "<center><table class='invoiceTable'><tbody><tr><td> Product ID </td> <td> Product Name </td><td> Amount</td></tr>";
    cart.forEach((item) => {
        stringHtml += `<tr><td>${item.orderId}</td> <td>${item.name}</td><td>${item.totalAmount}</td></tr>`;
    });

    let netamount = 0;
    cart.forEach((item) => {
        netamount += item.totalAmount;
    });

    stringHtml += `<tr><td colspan=3 style="text-align:center;">Bill Amount: ${netamount}</td></tr>`;

    stringHtml += "</tbody></table></center>";

    bill.innerHTML += stringHtml;

    console.log("Bill Layout", stringHtml);

    console.log("clickFun", cart);
};

const generateInvoice = () => {
    let user = window.localStorage.getItem("user");
    window.location.href = "http://127.0.0.1:5500/HTML/invoice.html";

    user = JSON.parse(user);

    let opUser = document.getElementById("operator_info");
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
    if (condUser) {
        window.location.href = "http://127.0.0.1:5500/HTML/page2.html";
    } else {
        alert("Wrong Credentials: ");
        CurrentUser = condUser;
    }
};

const inventory = [
    {
        orderId: 1,
        amount: 1,
        name: "",
        quantity: 1,
    },
    {
        orderId: 2,
        amount: 2,
        name: "",
        quantity: 2,
    },
    {
        orderId: 3,
        amount: 3,
        name: "",
        quantity: 3,
    },
];

let cart = [];

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
    let updatedCart;
    let cartProdcut = cart.find(
        (itemBanana) => itemBanana.orderId === parseInt(orderId)
    );
    if (cartProdcut) {
        updatedCart = cart.map((item) => {
            if (item.orderId !== parseInt(orderId)) {
                return item;
            }
            return {
                ...item,
                prodQuantity: item.quantity + quantity,
                totalAmount: (item.quantity + quantity) * item.amount,
            };
        });
    } else {
        updatedCart = [
            ...cart,
            {
                ...product,
                prodQuantity: quantity,
                totalAmount: quantity * product.amount,
            },
        ];
    }

    cart = updatedCart;

    inventory.forEach((item, i) => {
        if (parseInt(orderId) === item.orderId) {
            inventory[i].quantity -= quantity;
        }
    });

    let netamount = 0;
    let prodIdStr = `Prod ID : <p>`;
    let prodNameStr = `Product Name <p>`;
    let prodQuantityStr = `Quantity <p>`;
    let prodAmountStr = `Amount :<p>`;

    cart.forEach((item) => {
        prodIdStr += item.orderId + "<br>";
        prodNameStr += item.name + "<br>";
        prodQuantityStr += item.prodQuantity + "<br>";
        prodAmountStr += item.totalAmount + "<br>";
        netamount += item.totalAmount;
    });

    prodIdStr += `</p>`;
    prodNameStr += `</p>`;
    prodQuantityStr += `</p>`;
    prodAmountStr += `</p>`;

    window.localStorage.setItem("cart", JSON.stringify(cart));

    prodNoNode[0].innerHTML = prodIdStr;
    prodNameNode[0].innerHTML = prodNameStr;
    amount[0].innerHTML = prodAmountStr;

    console.log("Prod Name :::", prodNameStr);
    // console.log("netamount :::", netamount);
    // console.log("Product is :::", product);
    // console.log("Prod No. :::", prodNoNode[0]);
    // console.log("finalSumNode  :::", finalSumNode);
    window.localStorage.setItem("cart", JSON.stringify(cart));
    finalSumNode.innerHTML = "Total Amount : <br>" + netamount;
};

const removeItem = () => {
    let orderId = document.getElementById("code-id").value;
    let quantity = document.getElementById("qt-id").value;
    let prodNoNode = document.getElementsByClassName("left");
    let prodNameNode = document.getElementsByClassName("middle");
    let amount = document.getElementsByClassName("right");
    let finalSumNode = document.getElementById("amount-id");

    // product jo user ko add karna hai
    const updatedCart = cart.filter(
        (item) => item.orderId !== parseInt(orderId)
    );

    // let totalAmount = product.amount * quantity;
    // In place of one total amount we can also have a key value

    inventory.forEach((item, i) => {
        if (parseInt(orderId) === item.orderId) {
            // alert("This is your item", item);
            inventory[i].quantity += quantity;
        }
    });

    cart = updatedCart;

    let netamount = 0;
    let prodIdStr = `Prod ID : <p>`;
    let prodNameStr = `Product Name <p>`;
    let prodAmountStr = `Amount :<p>`;

    cart.forEach((item) => {
        prodIdStr += item.orderId + "<br>";
        prodNameStr += item.name + "<br>";
        prodAmountStr += item.totalAmount + "<br>";
        netamount += item.totalAmount;
    });

    prodIdStr += `</p>`;
    prodNameStr += `</p>`;
    prodAmountStr += `</p>`;

    // console.log("netamount :::", netamount);
    // console.log("Product is :::", product);
    // console.log("finalSumNode  :::", finalSumNode);

    window.localStorage.setItem("cart", JSON.stringify(cart));

    prodNoNode[0].innerHTML = prodIdStr;
    prodNameNode[0].innerHTML = prodNameStr;
    amount[0].innerHTML = prodAmountStr;
    console.log("Prod Name :::", prodNameNode[0]);
    console.log("Prod No. :::", cart);

    finalSumNode.innerHTML = "Total Amount : <br>" + netamount;
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
