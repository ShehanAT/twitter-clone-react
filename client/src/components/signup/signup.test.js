import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import enzymeConfig from '../../enzymeConfig';
import { render, screen, fireEvent } from "@testing-library/react";
import { withMarkup } from "../../testUtils/withMarkup";
import Signup from "./index";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
    ApolloClient, // Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all the while automatically updating your UI 
    InMemoryCache,
    ApolloProvider,
    HttpLink,
} from '@apollo/client';
import { split } from 'apollo-link';
import redux from "../../redux/store";
import { WebSocketLink } from 'apollo-link-ws';
import { GRAPHQL_HTTP_SERVER_URL, GRAPHQL_WS_SERVER_URL } from '../../environment';

const mockedSetTodo = jest.fn();

global.matchMedia = global.matchMedia || function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("Signup page should contain important page elements", function() {

    it('Should render \'Sign Up\' button', function(){
        const element = shallow(<button>Sign up</button>);
        expect(element.find('button').length).toBe(1);
    });

    it('Should render \'Email\' input field', function(){
        const element = shallow(<input placeholder="Email" />);
        expect(element.find('input').length).toBe(1);
    });

    it('Should render \'Password\' input field', function(){
        const element = shallow(<input placeholder="Password" />);
        expect(element.find('input').length).toBe(1);
    });

    it('Should render \'Log in\' button', function(){
        const element = shallow(<button type="submit">Log in</button>);
        expect(element.find('button').length).toBe(1);
    });
});

describe("Testing Sign In model's input fields", function() {
    it("Should be able to type into \'Email\' field", () => {
        render(
            <BrowserRouter>
                <Provider store={redux.store}>
                    <Signup />
                </Provider>
            </BrowserRouter>
        )
        const signUpButton = screen.getByText("Sign In");
        fireEvent.click(signUpButton);
        const emailField = screen.getByPlaceholderText("Email");
        fireEvent.click(emailField);
        fireEvent.change(emailField, { target: { value: "bobMarley@gmail.com" }});
        expect(emailField.value).toBe("bobMarley@gmail.com");
    });

    it("Should be able to type into \'Password\' field", () => {
        render(
            <BrowserRouter>
                <Provider store={redux.store}>
                    <Signup />
                </Provider>
            </BrowserRouter>
        )
        const signUpButton = screen.getByText("Sign In");
        fireEvent.click(signUpButton);
        const passwordField = screen.getByPlaceholderText("Password");
        fireEvent.click(passwordField);
        fireEvent.change(passwordField, { target: { value: "bobMarley" }});
        expect(passwordField.value).toBe("bobMarley");
    });
});

describe("Testing Sign Up model's input fields", function() {
    const httpLink = new HttpLink({
        uri: GRAPHQL_HTTP_SERVER_URL
      });
    
      const wsLink = new WebSocketLink({
        uri: GRAPHQL_WS_SERVER_URL, 
        options: { reconnect: true },
      });
    
      const link = split(
        // split based on operation type 
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' && 
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink,
      );
      
      const client = new ApolloClient({
        link, 
        cache: new InMemoryCache().restore({}),
      });

    it("Should be able to type into \'First Name\' field", () => {
        render(
            <BrowserRouter>
              <ApolloProvider client={client}>
                <Provider store={redux.store}>
                    <Signup />
                </Provider>
              </ApolloProvider>
            </BrowserRouter>
        )
        const signUpButton = screen.getByText("Sign Up");
        fireEvent.click(signUpButton);
        const firstNameField = screen.getByPlaceholderText("First Name");
        fireEvent.click(firstNameField);
        fireEvent.change(firstNameField, { target: { value: "Bob" }});
        expect(firstNameField.value).toBe("Bob");
    });

    it("Should be able to type into \'Last Name\' field", () => {
        render(
            <BrowserRouter>
              <ApolloProvider client={client}>
                <Provider store={redux.store}>
                    <Signup />
                </Provider>
              </ApolloProvider>
            </BrowserRouter>
        )
        const signUpButton = screen.getByText("Sign Up");
        fireEvent.click(signUpButton);
        const lastNameField = screen.getByPlaceholderText("Last Name");
        fireEvent.click(lastNameField);
        fireEvent.change(lastNameField, { target: { value: "Marley" }});
        expect(lastNameField.value).toBe("Marley");
    });

    it("Should be able to type into \'Email\' field", () => {
        render(
            <BrowserRouter>
            <ApolloProvider client={client}>
              <Provider store={redux.store}>
                  <Signup />
              </Provider>
            </ApolloProvider>
          </BrowserRouter>
        )
        const signUpButton = screen.getByText("Sign Up");
        fireEvent.click(signUpButton);
        const emailField = screen.getByPlaceholderText("Email");
        fireEvent.click(emailField);
        fireEvent.change(emailField, { target: { value: "bobMarley@gmail.com" }});
        expect(emailField.value).toBe("bobMarley@gmail.com");
    });

    it("Should be able to type into \'Password\' field", () => {
        render(
            <BrowserRouter>
            <ApolloProvider client={client}>
              <Provider store={redux.store}>
                  <Signup />
              </Provider>
            </ApolloProvider>
          </BrowserRouter>
        )
        const signUpButton = screen.getByText("Sign Up");
        fireEvent.click(signUpButton);
        const passwordField = screen.getByPlaceholderText("Password");
        fireEvent.click(passwordField);
        fireEvent.change(passwordField, { target: { value: "bobMarley123" }});
        expect(passwordField.value).toBe("bobMarley123");
    });

    it("Should be able to type into \'Confirm Password\' field", () => {
        render(
            <BrowserRouter>
            <ApolloProvider client={client}>
              <Provider store={redux.store}>
                  <Signup />
              </Provider>
            </ApolloProvider>
          </BrowserRouter>
        )
        const signUpButton = screen.getByText("Sign Up");
        fireEvent.click(signUpButton);
        const passwordField = screen.getByPlaceholderText("Confirm Password");
        fireEvent.click(passwordField);
        fireEvent.change(passwordField, { target: { value: "bobMarley123" }});
        expect(passwordField.value).toBe("bobMarley123");
    });

    it("Should be able to type into \'Age\' field", () => {
        render(
            <BrowserRouter>
            <ApolloProvider client={client}>
              <Provider store={redux.store}>
                  <Signup />
              </Provider>
            </ApolloProvider>
          </BrowserRouter>
        )
        const signUpButton = screen.getByText("Sign Up");
        fireEvent.click(signUpButton);
        const passwordField = screen.getByPlaceholderText("Age");
        fireEvent.click(passwordField);
        fireEvent.change(passwordField, { target: { value: "45" }});
        expect(passwordField.value).toBe("45");
    });
});

