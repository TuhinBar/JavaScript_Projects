console.log("This is postman clone")
// Utility functions:
// 1.Utility function to get DOM element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string
    return div.firstElementChild;
}
// initialize  parameters
let addedParamsCount = 0
// HIde the parameters Box initiallly
let parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = 'none';

// If the user clicks on params box, hide the json box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';
    document.getElementById('parametersBox').style.display = 'block';
})
// If the user clicks on json box, hide the params box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parametersBox').style.display = 'none';
    document.getElementById('requestJsonBox').style.display = 'block';
})
// If the user clicks on + button, add more parameters
let addParam = document.getElementById('addParams');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = ` <div id="parametersBox">
                        <div class="form-row my-2">
                            <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                            <div class="col-md-4">
                                <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter parameter ${addedParamsCount + 2} Key">
                            </div>
                            <div class=" col-md-4">
                                <input type="text" class="form-control" id="parameterValue${addedParamsCount + 2}"
                                    placeholder="Enter parameter ${addedParamsCount + 2} Value">
                            </div>
                            <button class="btn btn-primary deleteParam" > - </button>
                        </div>
                 </div>`;
    // Convert the element string to dom node
    let paramElement = getElementFromString(string)
    // console.log(paramElement)
    params.appendChild(paramElement)
    // Add eventlistener to remove params
    let deleteParam = document.getElementsByClassName('deleteParam')
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // if (confirm('Do you want to remove parameter?')){

            e.target.parentElement.remove();
            // addedParamsCount--
            // }
        })
    }
    addedParamsCount++
})

// If user clicks on the submit button
let submit = document.getElementById('submit')
submit.addEventListener('click', () => {
    // Show please wait in the response box
    document.getElementById('responsePrism').innerHTML = "Please wait...Fetching response...";
    // fetch all the values user have entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector('input[name="requestType"]:checked').value;
    let contentType = document.querySelector('input[name="contentType"]:checked').value;

    //  If user has used params optons instead of json

    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
            data = JSON.stringify(data)
        }
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }

    // if request type is get, invoke fetch api to create a get request 
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }
    else {
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                Prism.highlightAll();
            });
    }
})