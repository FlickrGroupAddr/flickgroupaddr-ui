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
        console.log( "No associated flickr ID, display section to create an association" )
        document.getElementById("div_flickr_id_none").style.display = "block";
    }
}).catch( err => {
    console.log("Exception thrown during creds check");
});
