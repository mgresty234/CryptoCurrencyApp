 function coinChart() {


    const getAllPrices = async (coinArray) => {
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
            var queryURL = URL + a + limit + currency;
            console.log(queryURL);
            $.ajax({
                url: queryURL,
                method: "GET",
            })
                .then((response) => {

                    // loop display chart
                    // for (let index = 0; index < coinArray.length; index++) {
                    console.log('response: ', response);
                    console.log('response: ', response);
                    displayChart(response.Data);
                    // }
                        

                    resolve(response.RAW);
                })
        })
    }

    function displayChart(data) {
        console.log('entire data set: ', data);

        var hoursAxis = [];
        var prices = [];

        for (var i = 0; i < data.length; i++) {
            if (i === 0 || i % 4 === 0) {
                console.log('time: ', data[i].time);
                var hourDate = new Date(data[i].time * 1000);
                var options = {
                    month: 'numeric',
                    day: 'numeric',
                    hour: 'numeric',
                };
                var displayHour = hourDate.toLocaleDateString('en-EN', options);
                console.log('hourDate: ', hourDate);
                console.log('displayHours: ', displayHour);

                prices.push(data[i].open);
                hoursAxis.push(displayHour);
            }
        }

        // make chart id dynamic, based on id
        // 'BTC-chart'
        // 'ETH-chart'
        // ...

        // coinArray[chartCounter] + '-chart'
        var chartId = coinArray[chartCounter] + '-chart';
        var ctx = document.getElementById(chartId).getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: hoursAxis,
                datasets: [{
                    label: "Crypto Currency Prices",

                    borderColor: 'blue',
                    data: prices,
                }]
            },

            // Configuration options go here
            options: {}
        });
        console.log('chartCounter', chartCounter);
        chartCounter++;
    }


    const coinArray = ['BTC', "ETH", "XRP", "BCH", "ADA", "XLM", "NEO", "LTC", "EOS", "XEM"];
    var chartCounter = 0;
    var URL = "https://min-api.cryptocompare.com/data/histohour?fsym=";
    var currency = "&tsym=USD"
    var limit = "&limit=24"
    var returnArray = [];
    let Price
    let Open
    let High
    let Low
    /* 
        Async await routine to execute api using ajax for every entry in the
        coinArray. The array.map function us used to iterate through the coin Array
        and for every entry ( denoted by c ) it calls getPrice.
        do the nature of array.map -- the cArray is populated with each Promise
        for getPrice ... when array.map is completed we execute Promise.all to
        issue the complete the processing of the promise/ajax calls
    */


    getAllPrices(coinArray).then((newArray) => {

        returnArray = [...newArray]

        let t = coinArray.length - 1
        let coin = coinArray[t]

    });












}
export default coinChart;