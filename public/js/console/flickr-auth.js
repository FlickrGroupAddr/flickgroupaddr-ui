const haveFlickrCredsEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr_creds";


async function getFlickrIdentity( authToken ) {

    let fetchResponse = await fetch( haveFlickrCredsEndpoint,
        {
            headers: { "Authorization": authToken } 
        });

    const returnIdentity = null;

    return returnIdentity;
}

const authToken = getFgaAuthToken();

getFlickrIdentity( authToken ).then( returnedIdentity => {
    if ( returnedIdentity === null ) {
        document.getElementById("div_flickr_auth").style.display = "block";
    }
}).catch( err => {
    console.log("Exception thrown during creds check");
});
