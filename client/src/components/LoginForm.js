import React, { useState } from "react"; // react hook(create or update username and password)
import { Form, Button, Alert } from "react-bootstrap"; // import for styling

import Auth from "../utils/auth"; // import auth file for check the username and passworld
import { LOGIN_USER } from "../utils/mutations";
import { useMutation } from "@apollo/client"; // use mutation that is in apollo package

//this is my login form for user
const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false); // set it = false beasue if user didn't enter anything  then there is nothing can be verify
  const [showAlert, setShowAlert] = useState(false); // set alert = false  because nothing is happing if user is not enter anything

  //use useMutation hook for verify user information
  const [loginUserMutation] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // make user forum will not submit as default setting

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    // if forum is passed then use try and catch method
    // user try to login and then send the data to server
    try {
      const { data } = await loginUserMutation({
        variables: { ...userFormData },
      });

      // if login succeed then server will turn a token and user information for login and the system will now know this user is online
      const { token, user } = data.login;
      console.log(user);
      Auth.login(token);
      // but if something not right then the system will return alert back to user
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    // no matter user login succees or not the system will auto delete string after user hit enter so user can enter information again
    setUserFormData({
      email: "",
      password: "",
    });
  };

  // this part is for fontend display on website
  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your email"
            name="email"
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Your password"
            name="password"
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type="submit"
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
