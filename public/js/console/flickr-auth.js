const flickrCredsEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr_creds";

async function haveAuthorizedWithFlickr() {
    const fgaAccessToken = getFgaAuthToken();

    let fetchResponse = await fetch( flickrCredsEndpoint, 
        { 
            headers: { 'Authorization': fgaAccessToken }
        } );

    let returnedJson = await fetchResponse.json();

    return returnedJson['have_flickr_creds'];
}

console.log("Are we getting here");

/*
if ( haveAuthorizedWithFlickr() === false ) {
    console.log("Need to do Flickr auth");

    document.getElementById("div_flickr_auth").style.display = "block";
} else {
    console.log("Have flickr auth");
} 
*/
