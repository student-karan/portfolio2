let URL = `https://api.exchangerate-api.com/v4/latest`;

let btn = document.querySelector("form button");
let fromcurrElement = document.querySelector(".from select");
let fromamount = document.querySelector(".from input");
let tocurrElement = document.querySelector(".to select");
let toamount = document.querySelector(".to input ");

for (currCode in countryList) {
      let Option1 = document.createElement("option");
      let Option2 = document.createElement("option");
      Option1.value = Option2.value = currCode;
      Option1.innerText = Option2.innerText = currCode;
      fromcurrElement.append(Option1);
      tocurrElement.append(Option2);
      fromcurrElement.value = "USD";
      tocurrElement.value = "INR";
    }
    fromcurrElement.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })
    tocurrElement.addEventListener("change",(evt) => {
        updateFlag(evt.target);
    })

let updateFlag = (element) =>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();
    GetExchangeRate();
})
fromcurrElement.addEventListener("change",() => {
    toamount.value = " ";
})
tocurrElement.addEventListener("change",() => {
    toamount.value = " ";
})
window.addEventListener("load",()=>{
    GetExchangeRate();
});

const GetExchangeRate = async() =>{
    const amount = parseFloat(fromamount.value);
    const fromcurr = fromcurrElement.value;
    const tocurr = tocurrElement.value;
    try{
        let res = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromcurr}`);
        let data = await res.json();
        let convertedrate = data.rates[tocurr];
        let conversionamount = amount*convertedrate;
        toamount.value = conversionamount;
    }
    catch{
        console.log("no match found");
    }
}
