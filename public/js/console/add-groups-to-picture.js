const flickrPictureEndpoint = "https://ue0ny85hec.execute-api.us-east-2.amazonaws.com/api/v001/flickr/picture";

const flickrUserEndpoint = "https://ue0ny85hec.execute-api.us-east-2.amazonaws.com/api/v001/flickr/user";


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

function getPictureIdFromImageUrl( imageUrl ) {
    // Parse the pic ID out of the URL they gave us
    const tokenArray = imageUrl.split('/');

    //console.log( "Tokenized URL:\n" + JSON.stringify(tokenArray) );

    if ( tokenArray.length < 6 ) {
        console.log( "Rejecting request, doesn't appear to be valid" );
        return null;
    }

    const photoId = tokenArray[5];

    // That offset thing is dangerous AF, let's make sure it's purely numeric like a photo
    // ID
    if ( isNaN(photoId) === true ) {
        console.log( "The token we found wasn't numeric, bailing out" );
        return null;
    }

    return photoId;
}


async function fetchPicGroups( photoId ) {
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


async function addPictureToGroup( photoId, groupId ) {
    console.log("User wants to add photo " + photoId + " to group " + groupId );


    // Set that row to cyan background to show we're processing
    let selectedRow = document.getElementById("tr_flickr_group_" + groupId );

    //console.log( "Selected row: " + selectedRow );

    // wipe all classes to start fresh, only want one class a time
    selectedRow.className = "";

    // Now add the one class we want
    selectedRow.classList.add( "processing_group_add" );

    // Set the background color to cyan to indicate a change is in progress
    selectedRow.style.backgroundColor = "cyan";

    // Remove all event listeners -- can't click it again
    let newRow = selectedRow.cloneNode(true);
    selectedRow.parentNode.replaceChild( newRow, selectedRow );

    selectedRow = newRow;

    // Now send request to add the picture to a group
    const constructedRequestUrl = flickrPictureEndpoint + "?" + new URLSearchParams(
        {
            query_type          : "group_add",
            flickr_photo_id     : photoId,
            flickr_group_id     : groupId
        }
    );
    const fetchResponse = await fetch( constructedRequestUrl,
        {
            headers: {
                "Authorization": getFgaAuthToken()
            },

            method: "PUT"
        });

    if ( fetchResponse.ok ) {
        selectedRow.style.backgroundColor = "green";
        selectedRow.style.color = "white";
    } else {
        selectedRow.style.backgroundColor = "red";
    }
}


async function processNewImageUrl() {
    console.log("User clicked button to do something with a URL");
    // First let's make the changes to the UI

    // Make the URL immutable
    document.getElementById("input_new_request_url").disabled = true

    // Hide the "new URL" button
    document.getElementById("button_submit_request_url").style.display = "none";


    const imageUrl = document.getElementById("input_new_request_url").value;

    const photoId = getPictureIdFromImageUrl( imageUrl );

    console.log("User wants to add new groups to image " + photoId );

    //console.log("Test test test");

    const picGroups = await fetchPicGroups( photoId );
    const userGroups = await fetchUserGroups();

    //console.log("Groups for this pic: " + JSON.stringify(picGroups) );
    //console.log("Groups for this user: " + JSON.stringify(userGroups) );

    // Walk the list of user's groups.  For each one, see if it's also in the
    //      list of groups for this pic. If so, highlight the row

    let groupNameToIdMap = {};

    for ( const groupId in userGroups ) {
        //console.log("Found group ID " + groupId);
        groupNameToIdMap[ userGroups[groupId]['name'] ] = groupId;
    }

    //console.log("Built map:\n" + JSON.stringify(groupNameToIdMap) );

    let sortedGroupNames = Object.keys( groupNameToIdMap );

    // Case insensitive sort
    sortedGroupNames.sort(function (a, b) {
        return a.toLowerCase().localeCompare(b.toLowerCase());
    });

    //console.log( "Created sorted name list:\n" + JSON.stringify(sortedGroupNames) );
    let tableRef = document.getElementById("table_picture_groups");

    for ( currGroupName of sortedGroupNames ) { 
        let currRow = tableRef.insertRow(-1);

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
            // Due to weirdness with closures, we have to pass an anonymous function which
            //      passes the parameter
            currRow.addEventListener( "click", 
                function(){ addPictureToGroup(photoId, currGroupId); } );

            // We need to set the class for this row so the cursor changes
            currRow.classList.add( "pic_not_in_group" );

            // Set the ID for this row so we can change its color when it is clicked
            currRow.id = "tr_flickr_group_" + currGroupId; 
        }        
    }

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

