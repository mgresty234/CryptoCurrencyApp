// var coinChart = require("chart")

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBIVlp-OxBJFSGzGrl06nSN3Lnt9rzcOZQ",
    authDomain: "firebasics-766e6.firebaseapp.com",
    databaseURL: "https://firebasics-766e6.firebaseio.com",
    projectId: "firebasics-766e6",
    storageBucket: "firebasics-766e6.appspot.com",
    messagingSenderId: "659710084349"
};
// updated version.
firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user)
        var firebaseUser = firebase.auth().currentUser
        logOutBtn.classList.remove("hide")
        signInBtn.classList.add("hide")
        signUpBtn.classList.add("hide")
        callLogIn.classList.add("hide")
        loginSpot.classList.add("hide")
        clickMe()

    }
    else {
        console.log("NOT LOGGED IN")
        logOutBtn.classList.add("hide")
        callLogIn.classList.remove("hide")
        // star.classList.add("hide")

    }
});
$("#callLogIn").on("click", function(event) {
    loginSpot.classList.remove("hide")
    signUpBtn.classList.remove("hide")
    signInBtn.classList.remove("hide")
});

$("#signInBtn").on("click", function(event) {
    event.preventDefault()
    console.log("click")
    var email = $("#emailAddress").val()
    var pass = $("#userPW").val()
    var auth = firebase.auth()
    var promise = auth.signInWithEmailAndPassword(email, pass)
    $("#emailAddress").val("")
    $("#userPW").val("")
});
     
$("#signUpBtn").on("click", function(event) {
    event.preventDefault(); event.preventDefault()
    var email = $("#emailAddress").val()
    var pass = $("#userPW").val()
    var auth = firebase.auth()
    var promise = auth.createUserWithEmailAndPassword(email, pass)
    $("#emailAddress").val("")
    $("#userPW").val("")
});
     
$("#logOutBtn").on("click", function(event) {
    firebase.auth().signOut()
});


//coin app iterates through an array, executes apis and returns data
const coinArray = ["BTC", "ETH", "XRP", "BCH", "ADA", "XLM", "NEO", "LTC", "EOS", "XEM"]
var URL = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=";
var currency = "&tsyms=USD"
var returnArray = [];
let Price
let Open
let High
let Low
    // async await routine to execute api using ajax for every entry in the
    // coinArray. The array.map function us used to iterate through the coin Array
    // and for every entry ( denoted by c ) it calls getPrice.
    // do the nature of array.map -- the cArray is populated with each Promise
    // for getPrice ... when array.map is completed we execute Promise.all to
    // issue the complete the processing of the promise/ajax calls
const getAllPrices = async(coinArray) => {
    const cArray = coinArray.map(async c => {
        const response = await getPrice(c)
        return response
    });
    const newArray = await Promise.all(cArray);
    // ... do some stuff
    return newArray
}
const getPrice = (a) => {
    return new Promise((resolve, reject) => {
        $.ajax({
                url: URL + a + currency,
                method: "GET",
            })
            .then((response) => {
                resolve(response.DISPLAY)
            })
    })
}

    let btcImage = $("<img src='assets/imgs/icons/btc.png'  class = 'coin-image'>")
    let ethImage = $("<img src='assets/imgs/icons/eth.png'  class = 'coin-image'>")
    let xrpImage = $("<img src = 'assets/imgs/icons/xrp.png'  class = 'coin-image'>")
    let bchImage = $("<img src = 'assets/imgs/icons/bch.jpg'  class = 'coin-image'>")
    let adaImage = $("<img src = 'assets/imgs/icons/ada.png'  class = 'coin-image'>")
    let xlmImage = $("<img src = 'assets/imgs/icons/xlm.png'  class = 'coin-image'>")
    let neoImage = $("<img src = 'assets/imgs/icons/neo.jpg' class = 'coin-image'>")
    let ltcImage = $("<img src = 'assets/imgs/icons/ltc.png' class = 'coin-image'>")
    let eosImage = $("<img src = 'assets/imgs/icons/eos.png' class = 'coin-image'>")
    let xemImage = $("<img src = 'assets/imgs/icons/xem.png' class = 'coin-image'>")

    imageArray = [btcImage, ethImage, xrpImage, bchImage, adaImage, xlmImage, neoImage, ltcImage, eosImage, xemImage]


////////////////////////////////////////////////////
getAllPrices(coinArray).then((newArray) => {
    // using spread operator to copy the array -- because these are complex objects
    // this is covered later in course when we hit es6
    returnArray = [...newArray]
    
        // can also build a for loop and iterate through returnArray logging all values  
    let i = 0
    coinArray.forEach((c) => {
        let coin = coinArray[i]
        price = (returnArray[i][coin].USD.PRICE)
        cap = (returnArray[i][coin].USD.MKTCAP)
        open = (returnArray[i][coin].USD.OPENDAY)
        high = (returnArray[i][coin].USD.HIGHDAY)
        low = (returnArray[i][coin].USD.LOWDAY)
        coinNme = coin

        let tBody = $("tbody")
        let tRow = $("<tr>")

        coinNme = $("<td>").text(coinNme)
        coinPrice = $("<td>").text(price)
        coinCap = $("<td>").text(cap)
        coinHigh = $("<td>").text(high)
        coinLow = $("<td>").text(low)
        coinChart = $("<td>").attr('id', coinNme + '-chart')

        coinChart.attr("class","chartImage")
        
        let star = $("<img>")

        fav = star.attr("src", "assets/imgs/icons/fav.png")
        star.attr("favorite", "fav")

        nonFav = star.attr("src","assets/imgs/icons/non.png")
        star.attr("nonFavorite", "nonFav")

        star.attr("state", "nonFav")

        star.addClass("favBtn")

        star.attr("data-coin", coinArray[i])

        coinNme.prepend(imageArray[i],"  ")
        tRow.append(star, coinNme, coinPrice, coinCap, coinHigh, coinLow, coinChart)
        tBody.append(tRow)
        i++

    })  

})
// const favCoins = []
// // favorite coins
// function clickMe() {
//     $("#displayTable").on("click", ".favBtn", function(event) {
//         let favCoin = $(this).data("coin")
//         favCoins.push(favCoin)
//     console.log(favCoins)
//     })
// }


// gameRef.on("child_added", function(snapshot) {
//     email = firebase.auth().currentUser.email;
//     var guess = snapshot.val();
//     userGuess = {
//         guess: guess.guess,
//         email: guess.email
//     }
//     $("#battleStage").append("<p>" + guess.email + ": " + guess.guess + "<p>");
//     checkItem();
// })



// NYT NEWS Call
var url = 'https://newsapi.org/v2/everything?' +
          'q=cryptocurrency&' +            
          'pageSize=10&' +
          'sortBy=popularity&' +
          'apiKey=1bb206c04e3145bf95c91c4863b50374';

var req = new Request(url);

fetch(req)
    .then(function(response) {
        console.log(response.json());
    })