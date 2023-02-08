/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useLoginMutation
} from '../../app/api/auth';

import {
  useGetTokenMutation
} from '../../app/api/token';

import {
  Form,
  Card,
  Container 
} from './style'

export default function Login() {
  const [username, setUsername] = useState("enteriarv@gmail.com");
  const [password, setPassword] = useState("Test123456789");

  const [login, {data: userData, isSuccess }] = useLoginMutation();
  const [getToken, { isSuccess: tokenSuccess }] = useGetTokenMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && tokenSuccess) {
      navigate("/");
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, tokenSuccess]);

  useEffect(() => {
    if (userData) {
      getToken({authCode: userData.authCode});
    }
  }, [userData, getToken]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    login({ username, password });
  };

  return (
    <Container>
      <Card>
        <Form onSubmit={handleSubmit}>
          <h1>User Login</h1>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </Form>
      </Card>
    </Container>
  );
};
