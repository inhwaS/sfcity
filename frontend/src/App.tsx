import React, { useEffect, useState } from "react";
import useGoogleAuthToken from "./hooks/useGoogleAuthToken";
import useGoogleAuthLink from "./hooks/useGoogleAuthLink";
import useProfile from "./hooks/useProfile";
import AnotherPage from './pages/AnotherPage';
import StartSession from './pages/StartSession';
import ReactDOM from 'react-dom';

function App() {
  const { data: profile, refetch: fetchProfile } = useProfile();
  const { data: googleAuth, refetch: fetchGoogleAuth } = useGoogleAuthLink();
  const { mutate, isSuccess } = useGoogleAuthToken();

  useEffect(() => {
    if (googleAuth) {
      window.location.replace(googleAuth.authorizationUrl);
    }
  }, [googleAuth]);

  useEffect(() => {
    const searchParams = new URLSearchParams(document.location.search);

    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state) {
      mutate({ code, state });
    }
  }, [mutate]);

  useEffect(() => {
    if (isSuccess) {
      fetchProfile();
    }
  }, [isSuccess, fetchProfile]);

  useEffect(() => {
    if (googleAuth) {
      window.location.replace(googleAuth.authorizationUrl);
    }
  }, [googleAuth]);

  const handleGoogleLogin = () => {
    fetchGoogleAuth();
  };

  const openFloatingWindow = () => {
    console.log(window.location.href);

    // Assuming confirmation.html is in the public directory
    const newWindow = window.open('/confirmation.html', '', 'width=600,height=400');

    if (!newWindow) {
      alert('Unable to open the new window. Please check your popup settings.');
    }
  
    // Listen for message from the popup
    window.addEventListener('message', (event) => {
      // Check if the message is 'yes' from our popup
      if (event.data === 'yes') {
        // Render the BookSession component
        ReactDOM.render(<StartSession />, document.getElementById('root'));
      }
    }, false);
  
    if (!newWindow) {
      alert('Unable to open the new window. Please check your popup settings.');
    }
  };
  

  return (
  <div className="App">
    {profile ? (
      <>
        <h1>Hello {profile.firstName}!</h1>
        <button onClick={openFloatingWindow}>click here</button>
        <AnotherPage />
      </>
    ) : (
      <button onClick={handleGoogleLogin}>Login with Google</button>
    )}
  </div>
);
}

export default App;