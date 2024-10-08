

const getData = async() => {
  try{
    const res = await fetch("https://v6.exchangerate-api.com/v6/439ae6ab66dea6623c7f7f35/latest/USD");
    const data = await res.json();
    return data
  }catch(error){
    console.error("Data loaded failed");
  }
};



const func = async () => {
  const data = await getData();
  console.log(data);
  
  const currencyCode = Object.keys(data.conversion_rates);
  const fromCurrency = document.getElementById("fromCurrency");
  const toCurrency = document.getElementById("toCurrency");

  const countryCode = currencyCode.map((code) => {
    fromCurrency.innerHTML += `
        <option value="${code}">${code}</option>      
      `;
    toCurrency.innerHTML += `
        <option value="${code}">${code}</option>      
      `;
  });
  document.getElementById("convert-btn").addEventListener("click", (event) => {
    event.preventDefault();
    const fromAmount = Number(document.getElementById("form-amount").value);
    const fromCurrencyValue = fromCurrency.value;
    const toCurrencyValue = toCurrency.value;
    if(fromAmount <= 0){
      alert `invalid amount`
    }else{
      
    const findFormCountryCode = currencyCode.find(
      (c) => c === fromCurrencyValue
    );
    const findToCountryCode = currencyCode.find((c) => c === toCurrencyValue);

    const getFromCurrencyRate = data.conversion_rates[`${findFormCountryCode}`];
    const getToCurrencyRate = data.conversion_rates[`${findToCountryCode}`];

    let currencyRate = getToCurrencyRate / getFromCurrencyRate;

    let finalRate = (fromAmount * getToCurrencyRate) / getFromCurrencyRate;
    currencyRate = checkDigits(currencyRate);
    finalRate = checkDigits(finalRate);
    console.log(currencyRate, finalRate);
    // show display amount
    const displayAmount = document.getElementById("show-amount");

    displayAmount.innerHTML = `
      <div class="space-y-2 ">
              <p class="font-semibold text-lg text-gray-500">${fromAmount} ${findFormCountryCode} = </p>
              <h3 class="font-bold text-2xl text-gray-700">
                <span>${finalRate}</span>
                <span>${findToCountryCode}</span>
              </h3>
              <p class="text-gray-500 font-medium"> 1 ${findFormCountryCode} =  ${currencyRate} ${findToCountryCode}  </p>
            </div>
    `;

    document.getElementById("form-amount").value = fromAmount.toFixed(2);
    }
  });
}

func();

function checkDigits(num) {
  // console.log(num);
   if (num < 1) {
     num = num.toPrecision(2);
     return num;
    //  console.log(num);
   } else {
     num = num.toFixed(2);
     return num;
    //  console.log(num);
   }
 }
// const currency = getData().then((data) => {




