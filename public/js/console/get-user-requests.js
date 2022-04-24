const userRequestsUrl = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr/user/requests"

async function getAndShowUserRequests() {
   const fetchResponse = await fetch( userRequestsUrl,
        {
            headers: {
                "Authorization": getFgaAuthToken()
            },

            method: "GET"
        });

    const jsonBody = await fetchResponse.json();

    console.log( "Got the following content back:\n" + JSON.stringify(jsonBody) );

    const userRequests = jsonBody['user_requests'];

    console.log( "Should just be the array inside that return:\n" + 
        JSON.stringify(jsonBody) );

    showUserRequests( userRequests );
}

function showUserRequests( userRequests ) {
    console.log( "Showing user requests" );

    let requestsTable = document.getElementById("table_fga_outstanding_requests");

    console.log( "user requests:\n" + JSON.stringify(userRequests) );

    for ( const currRow of userRequests ) {
        let tableRow = requestsTable.insertRow(-1); 

        let picIdCell = tableRow.insertCell();
        picIdCell.innerHTML = currRow['photo_id'];

        let groupIdCell = tableRow.insertCell();
        groupIdCell.innerHTML = currRow['group_id'];

        let submittedCell = tableRow.insertCell();
        submittedCell.innerHTML = currRow['original_request_timestamp'].substring(0, 19) +
            "Z";

        let lastAttemptCell = tableRow.insertCell();
        if ( currRow['most_recent_attempt'] !=== null ) {
            lastAttemptCell.innerHTML = currRow['most_recent_attempt'].substring(0, 19) + "Z";
        }


        let lastAttemptStatusCell = tableRow.insertCell();
        if ( currRow['most_recent_attempt_status'] !=== null ) { 
            lastAttemptStatusCell.innerHTML = currRow['most_recent_attempt_status']
        }
    }
}

getAndShowUserRequests();
