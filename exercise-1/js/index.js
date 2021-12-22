var data;
const getUserData = function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // createListElements(JSON.parse(xhttp.responseText));
            console.log(JSON.parse(xhttp.responseText));
            data = JSON.parse(xhttp.responseText);
            var source = $("#template").html();
            var template = Handlebars.compile(source);
            var html = template(data);
            $('#demo').html(html);
        }
    };
    xhttp.open("GET", "https://615485ee2473940017efaed3.mockapi.io/assessment", true);
    xhttp.send();
};

window.onload = function () {
    getUserData();
}

const createListElements = function (results) {
    const resultantList = document.getElementById("resultList");
    results.forEach(item => {
        const lineElement = document.createElement('li');
        lineElement.setAttribute('class', 'line_item');

        const elementWrapper = document.createElement('div');
        elementWrapper.setAttribute('class', 'item_wrapper');

        const itemDesc = document.createElement('span');
        itemDesc.innerHTML = item.name;

        const avatarElemet = document.createElement('img');

        avatarElemet.setAttribute('src', item.avatar)
        elementWrapper.appendChild(avatarElemet);
        elementWrapper.appendChild(itemDesc);

        resultantList.appendChild(lineElement);
        lineElement.appendChild(elementWrapper)

    });
}

