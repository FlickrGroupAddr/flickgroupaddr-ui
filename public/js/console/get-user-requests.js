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

}

console.log("Loaded get user request script");

userRequests = getUserRequests();

showUserRequests( userRequests );
