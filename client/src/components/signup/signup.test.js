import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import enzymeConfig from '../../enzymeConfig';

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