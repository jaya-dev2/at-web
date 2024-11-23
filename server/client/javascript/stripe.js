const coachingElements = document.getElementsByClassName("coaching-button");
for(var i=0; i<coachingElements.length; i++){
    coachingElements[i].onclick = function () {
        fetch("/get-coaching-price-id")
        .then((response) => response.json())
        .then(price_id => checkout(price_id.id))
        .catch(e => {
            console.error(e.error)
        })
    }
}
const consultationCall = document.getElementById("consultation-button");
consultationCall.onclick = function () {
    fetch("/get-consultation-price-id")
    .then((response) => response.json())
    .then(price_id => checkout(price_id.id))
    .catch(e => {
        console.error(e.error)
    })
}
function checkout(product_price_id) {
    fetch("/create-checkout-session", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            price: product_price_id
        }),
    })
        .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
        })
        .then(({ url }) => {
            window.location = url
        })
        .catch(e => {
            console.error(e.error)
        })
}


