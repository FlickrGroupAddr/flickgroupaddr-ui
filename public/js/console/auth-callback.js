function processAccessToken( accessToken ) {
    console.log( "We found an access token in the window URL" );
    console.log( "Access code: " + accessToken );

}



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if ( urlParams.has( "access_token" ) === true ) {
    processAccessToken( urlParams.get("access_token") );
}
