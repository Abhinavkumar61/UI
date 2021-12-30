var data;
const getUserData = async function () {
    // var xhttp = new XMLHttpRequest();
    // xhttp.onreadystatechange = function () {
    //     if (this.readyState == 4 && this.status == 200) {
    //         // createListElements(JSON.parse(xhttp.responseText));
    //         console.log(JSON.parse(xhttp.responseText));
    //         data = JSON.parse(xhttp.responseText);
    //         var source = $("#template").html();
    //         var template = Handlebars.compile(source);
    //         var html = template(data);
    //         ß$('#demo').html(html);
    //     }
    // };
    // xhttp.open("GET", "https://615485ee2473940017efaed3.mockapi.io/assessment", true);
    // xhttp.send();
    const resp = await fetch("https://615485ee2473940017efaed3.mockapi.io/assessment").then(res => res.json());
    console.log("print res", resp);
    data = resp; 
};

window.onload = function () {
    getUserData();
}