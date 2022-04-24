const userRequestsUrl = "https://x4etaszxrl.execute-api.us-east-2.amazonaws.com/api/v001/flickr/user/requests"

async function getUserRequests() {
   const fetchResponse = await fetch( userRequestsUrl,
        {
            headers: {
                "Authorization": getFgaAuthToken()
            },

            method: "GET"
        });

    const jsonBody = await fetchResponse.json();

    console.log( "Got the following content back:\n" + JSON.stringify(jsonBody) );

    return jsonBody['user_requests'];
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
       submittedCell.innerHTML = currRow['original_request_timestamp'];

       let lastAttemptCell = tableRow.insertCell();
       lastAttemptCell.innerHTML = currRow['most_recent_attempt'];
    }
}

const userRequests = getUserRequests();

showUserRequests( userRequests );
