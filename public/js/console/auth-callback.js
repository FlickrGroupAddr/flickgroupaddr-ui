function processAccessToken( accessToken ) {
    console.log( "We found an access token in the window URL" );
    //console.log( "Access code: " + accessToken );

    // Set the cookie 
    document.cookie = "FGA_ACCESS_TOKEN=" + accessToken;

    console.log( "FGA_ACCESS_TOKEN cookie set" );
}


function cleanUpUrl() {
    // Overwrite the URL to remove all the code stuff
    history.replaceState(null, null, "https://flickrgroupaddr.com/console" );

    console.log( "URL rewritten to remove access token now that it's stored in a cookie" );
}



const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if ( urlParams.has( "access_token" ) === true ) {
    processAccessToken( urlParams.get("access_token") );
    cleanUpUrl();
}
