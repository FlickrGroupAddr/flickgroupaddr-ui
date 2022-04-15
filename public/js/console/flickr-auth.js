console.log("Hellow");
console.log("Are we getting here");

const haveFlickrCredsEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr_creds";


async function checkForFlickrCreds( authToken ) {

    let fetchResponse = await fetch( haveFlickrCredsEndpoint,
        {
            headers: { "Authorization": authToken } 
        });
    return false;
}

console.log("I'm getting bored");

const authToken = getFgaAuthToken();

checkForFlickrCreds( authToken )
                                .then( haveFlickrCreds => {
                                    console.log("Have flickr creds: " + haveFlickrCreds );
                                })
                                .catch( err => {
                                    console.log("Exception thrown during creds check");
                                });
