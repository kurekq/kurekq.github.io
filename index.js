//Pseudo code
//Step 1: Define chart properties.
//Step 2: Create the chart with defined properties and bind it to the DOM element.
//Step 3: Add the CandleStick Series.
//Step 4: Set the data and render.
//Step5 : Plug the socket to the chart


//Code
const log = console.log;

const chartProperties = {
  width:1500,
  height:600,
  timeScale:{
    timeVisible:true,
    secondsVisible:false,
  }
}

const domElement = document.getElementById('tvchart');
const chart = LightweightCharts.createChart(domElement,chartProperties);
const candleSeries = chart.addCandlestickSeries();


fetch(`https://api.binance.com/api/v3/klines?symbol=ETHUSDT&interval=1d&limit=1000`)
  .then(res => res.json())
  .then(data => {
	  var dataNew = [[1572566400000,"182.19000000","184.50000000","177.02000000","182.85000000"],[1572652800000,"182.86000000","186.00000000","181.53000000","182.91000000"]];
    const cdata = dataNew.map(d => {
      return {time:d[0]/1000,open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
    });
    candleSeries.setData(cdata);
  })
  .catch(err => log(err))

//Dynamic Chart
const socket = io.connect('http://127.0.0.1:4000/');

socket.on('KLINE',(pl)=>{
  //log(pl);
  candleSeries.update(pl);
});
