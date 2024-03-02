import React, { useState, useEffect } from 'react';
import { ChatEngine } from 'react-chat-engine';
import './Chat.css';
function Chat() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Determine the logged-in user's role (e.g., customer or employee)
        const designation = localStorage.getItem('designation') // You should implement this function
       console.log("des",designation);
        // Set the user based on their role
        if (designation === 'customer') {
            setUser({ username: 'akashthomas33@gmail.com', secret: 'Akash@123' });
        } else if (designation === 'service') {
            setUser({ username: 'raoofvenad123@gmail.com', secret: 'Raoof@123' });
        }
    }, []);

   
    return (
        <div >
            {user ? (
                <ChatEngine
                
                    height="100vh"
                    projectID="23411691-a38c-491b-a8b0-cb0f4c3332d2"
                    userName={user.username}
                    userSecret={user.secret}
                    style={{color:'black'}}

                />
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default Chat;
