function getCookie( name ) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function confirmValidLogin() {
    const cognitoSubId = getCookie( 'FGA_COGNITO_SUB_ID' );
    const fgaSessionId = getCookie( 'FGA_SESSION_ID' );

    console.log( "Cognito sub: " + cognitoSubId );

    // Valiues will be "undefined" if they're not in cookies
    if ( (!cognitoSubId) || (!fgaSessionId) ) {
        console.log( "Not authenticated, redirecting to Cognito login" );
    } else {
        console.log( "User Cognito ID: " + cognitoSubId );
        console.log( "Session ID: " + fgaSessionId );
    }
}
