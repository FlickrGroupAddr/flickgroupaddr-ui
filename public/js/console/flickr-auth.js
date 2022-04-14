const flickrCredsEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr_creds";
function haveAuthorizedWithFlickr() {
    const fgaAccessToken = getFgaAuthToken();

    let fetchResponse = await fetch( flickrCredsEndpoint, 
        { 
            headers: { 'Authorization': fgaAccessToken }
        } );
    


    return false;
}

if ( haveAuthorizedWithFlickr() === false ) {
    console.log("Need to do Flickr auth");

    document.getElementById("div_flickr_auth").style.display = "block";
} else {
    console.log("Have flickr auth");
} 
