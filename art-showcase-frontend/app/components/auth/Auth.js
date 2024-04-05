"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react";

function Auth({ children }) {
  const [auth, setAuth] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userID");

    if (!token || !userId) {
      router.replace("/login");
    }
    const graphqlQuery = {
      query: `
                  query loginUser($token: String!, $_id: ID!){
                      isLoggedIn(token: $token, _id: $id){
                          _id
                          token
                      }
                  }
              `,
      variables: {
        token: token,
        _id: userId,
      },
    };
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/graphql`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(graphqlQuery),
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data.isLoggedIn.token) {
          setAuth(true);
        }
      });
  }, []);

  return <>{auth ? children : null}</>;
}

export default Auth;
