function haveAuthorizedWithFlickr() {
    const fgaAccessToken = getFgaAuthCookie();

    return false;
}

if ( haveAuthorizedWithFlickr === false ) {
    console.log("Need to do Flickr auth");

    document.getElementById("div_flickr_id").style.display = "block";
} else {
    console.log("We have flickr auth, display their name" );
}
