import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile: any = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  //ensure that the SDK has finished loading by checking that isLoading
  //is false before accessing the isAuthenticated property.
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    //use the isAuthenticated property to determine whether Auth0 has authenticated
    //the user before React renders any component that consumes the user property.
    isAuthenticated &&
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;
