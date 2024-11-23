fetch('nav.html')
.then(res => res.text())
.then(text => {
    let oldelem = document.querySelector("script#replace_with_navbar");
    let newelem = document.createElement("div");
    newelem.innerHTML = text;
    oldelem.parentNode.replaceChild(newelem, oldelem);
});
// fetch('./javascript/hamburger.js')
//     .then(response => response.text())
//     .then(txt => {
//         var script = document.createElement("script");
//         script.innerHTML = txt;
//         document.body.appendChild(script);
//       });

