const coinArray = ["BTC", "ETH", "XRP", "BCH", "ADA", "XLM", "NEO", "LTC", "EOS", "XEM"]

const URL = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=";

const currency = "&tsyms=USD"

const returnArray = [];

const getBTCPrice = () => {

	return new Promise((resolve, reject) => {
		
		$.ajax({
			url: URL + "BTC" + currency,
			method: "GET",
		})
			.then((response) => {
				returnArray.push(response)
				resolve()
			})
	})
}
getBTCPrice().then(()=> {
	BTCPrice = (returnArray[0].RAW.BTC.USD.PRICE)
	BTCOpen = (returnArray[0].RAW.BTC.USD.OPENDAY)
	BTCHigh = (returnArray[0].RAW.BTC.USD.HIGHDAY)
	BTCLow = (returnArray[0].RAW.BTC.USD.LOWDAY)

	$(".coins-appear-here").append(
		"<div class = 'data'><span>" + "<img src = 'assets/imgs/coin-icons/btc.svg' class = 'coin-icon'>" + "&nbsp;" +
		"<strong>Bitcoin</strong></span>" + "<span>Price: &#36;" + BTCPrice + "</span>"
		+ "<span>Opened Today : &#36;" + BTCOpen + "</span>" 
		+ "<span>High Today : &#36;" + BTCHigh  + "</span>" 
		+ "<span>Low Today : &#36;" + BTCLow + "</span></div>" );
	$(".coins-appear-here").append(
		"<div class = 'data'><span>" + "<img src = 'assets/imgs/coin-icons/btc.svg' class = 'coin-icon'>" + "&nbsp;" +
		"<strong>Bitcoin</strong></span>" + "<span>Price: &#36;" + BTCPrice + "</span>"
		+ "<span>Opened Today : &#36;" + BTCOpen + "</span>" 
		+ "<span>High Today : &#36;" + BTCHigh  + "</span>" 
		+ "<span>Low Today : &#36;" + BTCLow + "</span></div>" );
	$(".coins-appear-here").append(
		"<div class = 'data'><span>" + "<img src = 'assets/imgs/coin-icons/btc.svg' class = 'coin-icon'>" + "&nbsp;" +
		"<strong>Bitcoin</strong></span>" + "<span>Price: &#36;" + BTCPrice + "</span>"
		+ "<span>Opened Today : &#36;" + BTCOpen + "</span>"
		+ "<span>High Today : &#36;" + BTCHigh + "</span>" 
		+ "<span>Low Today : &#36;" + BTCLow + "</span></div>" );
	$(".coins-appear-here").append(
		"<div class = 'data'><span>" + "<img src = 'assets/imgs/coin-icons/btc.svg' class = 'coin-icon'>" + "&nbsp;" +
		"<strong>Bitcoin</strong></span>" + "<span>Price: &#36;" + BTCPrice + "</span>"
		+ "<span>Opened Today : &#36;" + BTCOpen + "</span>" 
		+ "<span>High Today : &#36;" + BTCHigh  + "</span>" 
		+ "<span>Low Today : &#36;" + BTCLow + "</span></div>" );	
	

	console.log("BTC Price : " + BTCPrice)
	console.log(BTCOpen)
	console.log(BTCHigh)
	console.log(BTCLow)
})

