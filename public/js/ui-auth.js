function getCookie( name ) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function confirmValidLogin() {
    const cognitoSubId = getCookie( 'FGA_COGNITO_SUB_ID' );
    const fgaSessionId = getCookie( 'FGA_SESSION_ID' );

    //console.log( "Cognito sub: " + cognitoSubId );

    // Valiues will be "undefined" if they're not in cookies
    if ( (!cognitoSubId) || (!fgaSessionId) ) {
        console.log( "Not authenticated, redirecting to Cognito login" );
        window.location.replace( "https://login.flickrgroupaddr.com/login?client_id=hpc8p0fu5ke50v6ft8h1ti37f&response_type=code&scope=email+openid&redirect_uri=https://auth.flickrgroupaddr.com/oauth/callback" )
    } else {
        console.log( "Valid credentials!" );
        console.log( "\tUser Cognito ID: " + cognitoSubId );
        console.log( "\tSession ID: " + fgaSessionId );
    }
}

confirmValidLogin();
