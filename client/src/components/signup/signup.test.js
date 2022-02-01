import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import enzymeConfig from '../../enzymeConfig';
import { render, screen, fireEvent } from "@testing-library/react";
import { withMarkup } from "../../testUtils/withMarkup";
import Signup from "./index";
import redux from "../../redux/store";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

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

