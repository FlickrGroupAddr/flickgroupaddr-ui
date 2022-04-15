const fgaLoginUrl = "https://flickrgroupaddr.auth.us-east-2.amazoncognito.com/login?client_id=54om78s59usqmo8nqdr7m7bktg&response_type=code&scope=email+openid&redirect_uri=https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/oauth/callback"
const flickrIdEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr_id";



async function initiateFlickrAuth() {
    console.log( "Initiating Flickr auth process" );

    const fetchResponse = await fetch( flickrIdEndpoint,
        {
            headers: { 
                "Authorization": getFgaAuthToken()
            },

            method: "PUT"
        });

    const jsonBody = await fetchResponse.json();

    console.log( "Got response from Flickr auth endpoint: " + JSON.stringify(jsonBody) );
}


function addEventListeners() {
    document.getElementById("button_initiate_flickr_auth").addEventListener( "click",
        initiateFlickrAuth );
}


async function getFlickrIdentity( authToken ) {

    let fetchResponse = await fetch( flickrIdEndpoint,
        {
            headers: { "Authorization": authToken } 
        });

    if ( fetchResponse.ok ) {
        const returnIdentity = await fetchResponse.json();
    } else {
        if ( fetchResponse.status === 401 ) {
            console.log( "Credentials have expired" );
            location.href = fgaLoginUrl; 
        }
        else if ( fetchResponse.status === 404 ) {
            console.log( "User does not have an associated Flickr ID" );
            const returnIdentity = null;
        } 
    }

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
});

