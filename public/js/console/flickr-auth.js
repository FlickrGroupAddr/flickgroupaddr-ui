function haveAuthorizedWithFlickr() {
    const fgaAccessToken = getFgaAuthToken();

    return false;
}

if ( haveAuthorizedWithFlickr() === false ) {
    console.log("Need to do Flickr auth");

    document.getElementById("div_flickr_auth").style.display = "block";
} else {
    console.log("Have flickr auth");
} 
