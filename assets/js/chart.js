window.onload = function () {



    const coinArray = ["BTC"]
    var URL = "https://min-api.cryptocompare.com/data/histohour?fsym=";
    var currency = "&tsym=USD"
    var limit = "&limit=24"
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


                    displayChart(response.Data);
                    resolve(response.RAW);




                })
        })
    }


    ////////////////////////////////////////////////////
    getAllPrices(coinArray).then((newArray) => {

        returnArray = [...newArray]

        let t = coinArray.length - 1
        let coin = coinArray[t]

    });




    function displayChart(data) {
        console.log(data);

        var hoursAxis = [];
        var prices = [];

        for (var i = 0; i < data.length; i++) {
            if (i === 0 || i % 4 === 0) {
                console.log(data[i].time);
                var hourDate = new Date(data[i].time);
                var displayHour = hourDate.getHours();
                prices.push(data[i].open);
                hoursAxis.push(displayHour);
            }
        }

        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
            // The type of chart we want to create
            type: 'line',

            // The data for our dataset
            data: {
                labels: hoursAxis,
                datasets: [{
                    label: "Crypto Currency",

                    borderColor: 'rgb(255, 99, 132)',
                    data: prices,
                }]
            },

            // Configuration options go here
            options: {}
        });
    }
}