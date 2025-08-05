import React, { useEffect, useState } from "react";

import { useFirebaseUser } from "../../hooks/useFirebaseUser.js";

export function OrganizationHomePage() {
  const { user, idToken, loading} = useFirebaseUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user || !idToken) return;

    const fetchData = async () => {
      try {
        const res = await fetch("https://api.queueless.xyz/api/v1/organization/data", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user, idToken]);

  if (loading) return <p>Checking authentication...</p>;

  if (!user) {
    return <p>You are not logged in.</p>; // Or redirect to login
  }

  return (
    <div>
      <h2>User Home {user.email}</h2>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
