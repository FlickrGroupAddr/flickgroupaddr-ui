const flickrPictureEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr/picture";

const flickrUserEndpoint = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr/user";


function changeUrl() {
    console.log( "User clicked the Change URL button" );

    document.getElementById("button_change_url").style.display = "none";
    document.getElementById("button_submit_request_url").style.display = "block";
    document.getElementById("input_new_request_url").disabled = false;
    document.getElementById("input_new_request_url").value = "";

    let tableRef = document.getElementById("table_picture_groups");
    tableRef.style.display = "none";

    // Now delete all rows from the table but the header row
    while ( tableRef.rows.length > 1 ) {
        // Delete last row
        tableRef.deleteRow( -1 );
    }
}


async function fetchPicGroups( imageUrl ) {

    // Parse the pic ID out of the URL they gave us
    const tokenArray = imageUrl.split('/');

    //console.log( "Tokenized URL:\n" + JSON.stringify(tokenArray) );

    if ( tokenArray.length < 6 ) {
        console.log( "Rejecting request, doesn't appear to be valid" );
        return;
    }
    const photoId = tokenArray[5];

    //console.log("Think we got photo ID " + photoId );

    // That offset thing is dangerous AF, let's make sure it's purely numeric like a photo
    // ID
    if ( isNaN(photoId) === true ) {
        console.log( "The token we found wasn't numeric, bailing out" );
        return;
    }

    const constructedRequestUrl = flickrPictureEndpoint + "?" + new URLSearchParams(
        {
            flickr_photo_id     : photoId,
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

    //console.log( "Got the following content back:\n" + JSON.stringify(jsonBody) );

    return jsonBody['groups_for_pic'];
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
    console.log("User clicked button to do something with a URL");
    // First let's make the changes to the UI

    // Make the URL immutable
    document.getElementById("input_new_request_url").disabled = true

    // Hide the "new URL" button
    document.getElementById("button_submit_request_url").style.display = "none";


    const imageUrl = document.getElementById("input_new_request_url").value;

    console.log("User wants to add new groups to image " + imageUrl );

    //console.log("Test test test");

    const picGroups = await fetchPicGroups( imageUrl );
    const userGroups = await fetchUserGroups();

    //console.log("Groups for this pic: " + JSON.stringify(picGroups) );
    //console.log("Groups for this user: " + JSON.stringify(userGroups) );

    console.log( "Number of groups for this user: " + Object.keys(userGroups).length );

    // Walk the list of user's groups.  For each one, see if it's also in the
    //      list of groups for this pic. If so, highlight the row

    let groupNameToIdMap = {};

    for ( const groupId in userGroups ) {
        //console.log("Found group ID " + groupId);
        groupNameToIdMap[ userGroups[groupId]['name'] ] = groupId;
    }

    console.log( "Number of entries in group name to ID map: " +
        Object.keys(groupNameToIdMap).length );

    //console.log("Built map:\n" + JSON.stringify(groupNameToIdMap) );

    let sortedGroupNames = Object.keys( groupNameToIdMap );

    // Case insensitive sort
    sortedGroupNames.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    console.log( "List of sorted group names length: " + sortedGroupNames.length );

    //console.log( "Created sorted name list:\n" + JSON.stringify(sortedGroupNames) );
    let tableRef = document.getElementById("table_picture_groups");

    let rowsAdded = 0;

    for ( currGroupName of sortedGroupNames ) { 
        let currRow = tableRef.insertRow(-1);
        rowsAdded = rowsAdded + 1;

        /*
        console.log( "Group name: " + currGroupName +
            ", group ID: " + groupNameToIdMap[currGroupName] );
        */
        const currGroupId = groupNameToIdMap[currGroupName];

        let groupNameTd = currRow.insertCell();
        groupNameTd.innerHTML = currGroupName;

        let picInGroupTd = currRow.insertCell();

        if ( currGroupId in picGroups ) {
            //console.log("Picture is in group " + currGroupName );
            picInGroupTd.innerHTML = "YES";
            currRow.classList.add( "pic_in_group" );
        } else {
            //console.log("Picture is not in group " + currGroupName);
        }        
    }

    console.log( "Added " + rowsAdded + " rows to the table" );

    // Show the "change URL" button
    document.getElementById("button_change_url").style.display = "block";

    // Show the table with groups for this pic
    document.getElementById("table_picture_groups").style.display = "table";
}

function addEventListeners() {
    document.getElementById("button_submit_request_url").addEventListener( "click",
        processNewImageUrl );
    document.getElementById("button_change_url").addEventListener( "click",
        changeUrl );
    console.log( "event listeners added in add groups processor" );
}


addEventListeners();

