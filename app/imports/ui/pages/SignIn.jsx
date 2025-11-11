import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Alert, Card, Button } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { ComponentIDs, PageIDs } from '../utilities/ids';

/*
 * SignUp page uses Meteor accounts.createUser() to register new users.
 */
const SignUp = () => {
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  const schema = new SimpleSchema({
    email: String,
    password: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { email, password } = doc;
    Accounts.createUser({ email, username: email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setRedirect(true);
      }
    });
  };

  if (redirect) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#e0e4f0' }}>
      <div className="bg-white rounded-4 shadow-lg p-5 text-center" style={{ width: '100%', maxWidth: '420px' }}>
        <div className="d-flex flex-column align-items-center mb-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/4/4e/Hawaii_Warriors_logo.svg"
            alt="UH Manoa Logo"
            style={{ width: '70px', marginBottom: '15px' }}
          />
          <h2 className="fw-bold text-success">Manoa Lost and Found</h2>
          <p className="text-muted mb-0">Create an account to get started</p>
        </div>

        <AutoForm schema={bridge} onSubmit={data => submit(data)}>
          <Card className="border-0">
            <Card.Body>
              <div className="mb-3 text-start">
                <TextField
                  id={ComponentIDs.signUpFormEmail}
                  name="email"
                  placeholder="UH Email"
                  className="form-control"
                />
              </div>
              <div className="mb-3 text-start">
                <TextField
                  id={ComponentIDs.signUpFormPassword}
                  name="password"
                  placeholder="Password"
                  type="password"
                  className="form-control"
                />
              </div>

              <ErrorsField />

              <Button
                id={ComponentIDs.signUpFormSubmit}
                type="submit"
                className="w-100 fw-semibold"
                style={{ backgroundColor: '#024731', border: 'none' }}
              >
                Sign Up
              </Button>
            </Card.Body>
          </Card>
        </AutoForm>

        <div className="mt-3">
          <Link to="/signin" className="text-success fw-medium">
            Already have an account? Log In
          </Link>
        </div>

        {error !== '' && (
          <Alert variant="danger" className="mt-3 text-start">
            <Alert.Heading>Account creation failed</Alert.Heading>
            {error}
          </Alert>
        )}
      </div>
    </div>
  );
};

export default SignUp;
