var data;

function preload() {
    data = loadJSON("https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD");
    }

function setup() {
var BTC = data.RAW.BTC.USD.FROMSYMBOL;
console.log(BTC);
}
preload();
setup();
console.log(BTC);



