const getElement = (selector) => {
    const element = document.querySelector(selector)

    if (element) return element
    throw Error(
        `Please double check your class names, there is no ${selector} class`
    )
}

const getLocation = () => {
    const successCallback = (position) => {
        console.log(position);

        const urlLocation = getElement('#urlLocation')
        urlLocation.value = `https://www.google.com/maps/search/?api=1&query=${position.coords.latitude},${position.coords.longitude}`

        const demo = getElement('.demo')
        demo.innerHTML = `<iframe src="https://maps.google.com/maps?q=${position.coords.latitude},${position.coords.longitude}&hl=en&z=14&amp;output=embed" width="100%" height="400" frameborder="0" style="border:0" allowfullscreen></iframe>`

        var status = document.getElementById("status");
        status.classList.add('success')
        status.innerHTML = "Thanks for your submission!";
    };

    const errorCallback = (error) => {
        console.log(error);
        var status = document.getElementById("status");
        status.classList.add('error')
        status.innerHTML = "Oops! There was a problem getting your location, try again!"
    };

    let options = {
        enableHighAccuracy: true,
        timeout: 10000
    }

    navigator.geolocation.getCurrentPosition(successCallback, errorCallback, options);
}

function myFunction() {
    var copyText = document.getElementById("urlLocation");
    console.log(copyText.value)
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + copyText.value;
}

function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}

window.onload = function () {
    document.getElementById('urlLocation').value = '';
}