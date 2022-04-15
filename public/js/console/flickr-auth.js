const haveFlickrCredsEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr_creds";


function initiateFlickrAuth() {
    console.log( "Button to kick to Flickr auth clicked" );

}


function addEventListeners() {
    document.getElementById("button_initiate_flickr_auth").addEventListener( "click",
        initiateFlickrAuth );
}


async function getFlickrIdentity( authToken ) {

    let fetchResponse = await fetch( haveFlickrCredsEndpoint,
        {
            headers: { "Authorization": authToken } 
        });

    const returnIdentity = null;

    return returnIdentity;
}

addEventListeners();


const authToken = getFgaAuthToken();

getFlickrIdentity( authToken ).then( returnedIdentity => {
    if ( returnedIdentity === null ) {
        console.log( "No associated flickr ID, display section to create an association" )
        document.getElementById("div_flickr_id").style.display = "block";
        document.getElementById("div_flickr_id_none").style.display = "block";
    }
    else {
        // TODO: display username & user NSID
    }
}).catch( err => {
    console.log("Exception thrown during creds check");
});
