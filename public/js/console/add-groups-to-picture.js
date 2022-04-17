const flickrPictureEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr/picture";

const flickrUserEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr/user";

async function fetchPicGroups( imageUrl ) {
    const constructedRequestUrl = flickrPictureEndpoint + "?" + new URLSearchParams(
        {
            flickr_photo_id     : "51907506088",
            query_type          : "picture_groups"
        }
    );
    const fetchResponse = await fetch( constructedRequestUrl,
        {
            headers: {
                "Authorization": getFgaAuthToken()
            },

            method: "GET"
        });

    const jsonBody = await fetchResponse.json();

    return jsonBody['flickr_groups'];
}



async function fetchUserGroups() {
    const constructedRequestUrl = flickrUserEndpoint + "?" + new URLSearchParams(
        {
            query_type  : "user_groups"
        }
    );
    const fetchResponse = await fetch( constructedRequestUrl,
        {
            headers: {
                "Authorization": getFgaAuthToken()
            },

            method: "GET"
        });

    const jsonBody = await fetchResponse.json();

    return jsonBody['user_flickr_groups'];

}


async function processNewImageUrl() {
    const imageUrl = document.getElementById("input_new_request_url").value;

    console.log("User wants to add new groups to image " + imageUrl );

    const picGroups = await fetchPicGroups( imageUrl );
    const userGroups = await fetchUserGroups();


    console.log("Groups for this pic: " + JSON.stringify(picGroups) );
    console.log("Groups for this user: " + JSON.stringify(userGroups) );
}

function addEventListeners() {
    document.getElementById("button_submit_request_url").addEventListener( "click",
        processNewImageUrl );
    console.log( "event listeners added in add groups processor" );
}


addEventListeners();

