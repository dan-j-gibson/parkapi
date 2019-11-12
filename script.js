function generateURL(queryItems) {

    const params = {
        api_key: `JfWtdWIOSlBnDc4VnSKq0jardCagNCa0OgY0XyYA`,
        q: $('#searchInput').val(),
        stateCode: $('#stateInput').val(),
        limit: $('#resultInput').val()
    };

    console.log(params);

    const baseURL = "https://developer.nps.gov/api/v1/parks"
    const queryString = formatParams(params);
    let url = `${baseURL}?${queryString}`;
    console.log(url);

    fetch(`${url}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => {
            console.log(`Something went wrong: ${error.message}`);
        });

}

function formatParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
    console.log(queryItems);
    return queryItems.join('&');
}

function displayResults(responseJson) {
    $(`#parkOutput`).children().remove();
    if (responseJson.total === '0') {
        $(`#parkOutput`).append("<h1>No results. Please try again.</h1>")
    } else {
        for (let i = 0; i < responseJson.data.length; i++) {
            $(`#parkOutput`).append(`<br>
        <ul class ="formaBorder">
            <li class="spacetheBorder">
                <h1>${responseJson.data[i].fullName}</h1>
                <br>
                <p>${responseJson.data[i].description}</p>
                <br>
                <p>${responseJson.data[i].directionsInfo}</p>
                <br>
                <a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a>
            </li>
        </ul>
        `)
        }
    }
}

function submitQuery() {
    $('form').submit(function () {
        event.preventDefault();
        generateURL();
    });
}

submitQuery();