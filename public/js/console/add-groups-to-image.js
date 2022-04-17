const imageInfoEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/image";

const userInfoEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/user";

async function fetchPicGroups( imageUrl ) {
    return [];
}


async function fetchUserGroups() {

    return [];
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

