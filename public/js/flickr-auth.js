async function redirectToFlickrAuth() {
    const flickrUrlResponse = await fetch( 
        "https://api.flickrgroupaddr.com/api/v1/auth/flickr/user_auth_url",
        {
            credentials: 'include',
        }
    );

    const jsonResponse = await flickrUrlResponse.json();

    console.log( "Flickr URL we're about to redirect to: " + jsonResponse["flickr_user_auth_url"] );

    window.location = jsonResponse["flickr_user_auth_url"]
}

function attachEventListeners() {
    const authButton = document.getElementById( "button_initiate_flickr_auth" );
    authButton.addEventListener( "click", redirectToFlickrAuth );

}

function main() {
    console.log( "JS launched" );

    // Attach any action listeners
    attachEventListeners();
}

main();
