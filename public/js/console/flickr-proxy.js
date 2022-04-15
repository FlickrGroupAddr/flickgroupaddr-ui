console.log("Hellow");
console.log("Are we getting here");

const haveFlickrCredsEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr_creds";

function checkForFlickrCreds( authToken ) {
    return await thisOtherThis( authToken );
}


async function thisOtherShit( authToken ) {

    let fetchResponse = await fetch( haveFlickrCredsEndpoint,
        {
            headers: { "Authorization": authToken } 
        });
    return false;

}

console.log("I'm getting bored");

const authToken = getFgaAuthToken();

const haveFlickrCreds = checkForFlickrCreds( authToken );

console.log("Have flickr creds: " + haveFlickrCreds );
