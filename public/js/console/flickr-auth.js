function haveAuthorizedWithFlickr() {

    const fgaAccessToken = getFgaAuthCookie();

    

}

const haveDoneFlickrAuth = haveAuthorizedUserWithFlickr();

if ( haveCompletedFlickrAuth === false ) {
    console.log("Need to do Flickr auth");
}
