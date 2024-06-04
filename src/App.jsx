import axios from "axios";
import { useEffect, useState } from "react"
import './App.css'
import { TextField } from "@mui/material";


function App() {

  const API_KEY = "faadb1029579de2c58d961ce";
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [convertdAmount, setConvertedAmount] = useState(null);

  useEffect(() => {
    const getExchangeRate = async () => {
      try{
        let url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
        const res = await axios.get(url);
        // console.log(res);
        setExchangeRate(res.data.conversion_rates[toCurrency]);
      }catch(error){
        console.log("Error fetching exchange rate:",error);
      }
    };
    getExchangeRate();
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    setConvertedAmount((amount*exchangeRate).toFixed(2));
  },[amount, exchangeRate]);

  const handleAmountChange = (e) => {
    const value = parseFloat(e.target.value);
    setAmount(isNaN(value) ? 0 : value);
  };

  const handleFCurr = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleTCurr = (e) => {
    setToCurrency(e.target.value);
  };


  
  return (
    <>
      <div className="currency-convertor">
        <div className="box"></div>
        <div className="data">
          <h1>Currency Convertor</h1>
          <div className="input-container">
            <label htmlFor="amt" className="label1">Amount :</label>
            <input type="text" id="amt" value={amount} onChange={handleAmountChange}/>
          </div>

          <div className="input-container">
            <label htmlFor="fromCurrency" className="label1">From :</label>
            <select id="fromCurrency" className="transparent-select" value={fromCurrency} onChange={handleFCurr}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>

          <div className="input-container">
            <label htmlFor="toCurrency" className="label1">To :</label>
            <select id="toCurrency" className="transparent-select" value={toCurrency} onChange={handleTCurr}>
              <option value="USD">USD - United States Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound Sterling</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="AUD">AUD - Australian Dollar</option>
              <option value="CAD">CAD - Canadian Dollar</option>
              <option value="CNY">CNY - Chinese Yuan</option>
              <option value="INR">INR - Indian Rupee</option>
              <option value="BRL">BRL - Brazilian Real</option>
              <option value="ZAR">ZAR - South African Rand</option>
            </select>
          </div>
          <div className="result">
            <p>{amount} {fromCurrency} is equal to {convertdAmount} {toCurrency}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
