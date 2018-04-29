var coinArray = ["BTC", "ETH", "XRP", "BCH", "ADA", "XLM", "NEO", "LTC", "EOS", "XEM"];

var queryURL = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms="; + "tool-" +
            coinArray + "&tsyms=USD";

            function coins() {
                for (var i = 0; i < coinArray.length; i++) {
                    a.attr("crypto-name", coinArray[i]);
                    $("#coins-appear-here").append(a);
            }
            coins();

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) { 

            var responseData = response.RAW;

            for (var i = 0; i < responseData.length; i++) {

                var price = responseData[i].USD.PRICE;
                var openDay = responseData[i].USD.OPENDAY;
                var highDay = responseData[i].USD.HIGHDAY
                var lowDay = responseData[i].USD.LOWDAY
            }
            console.log("Price: " + price);
            console.log("Open Day: " + openDay);

            $(".coins-appear-here").text("Price: " + + price);


            })
            console.log("Price: " + price);
            console.log("Open Day: " + openDay);

        }

        
