import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import JSONPretty from 'react-json-pretty';

const Profile = () => {
  const [token, setToken] = React.useState('');
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  React.useEffect(() => {
    const getUserMetadata = async () => {
      const domain = "YOUR_DOMAIN";
  
      try {
        const accessToken = await getAccessTokenSilently({
          audience: `${process.env.REACT_APP_AUTH0_AUDIENCE}`
        });
        setToken(accessToken);
      } catch (e) {
        console.log(e.message);
      }
    };
 
    getUserMetadata();
  }, [isAuthenticated]);

  return (
    isAuthenticated && ( 
     <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <JSONPretty data={user} />
        {/* {JSON.stringify(user, null, 2)} */}
        <h2>JWT token</h2>
        <p>{token}</p>
      </div>
    )
  )
}

export default Profile
