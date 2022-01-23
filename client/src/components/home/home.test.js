import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import enzymeConfig from '../../enzymeConfig';

describe("Homepage should contain important page elements", function() {

    it('Should render Home anchor tag', function(){
        const element = shallow(<a href="/home" />);
        expect(element.find('a').length).toBe(1);
    });

    it('Should render Explore anchor tag', function(){
        const element = shallow(<a href="/explore" />);
        expect(element.find('a').length).toBe(1);
    });

    it('Should render Notifications anchor tag', function(){
        const element = shallow(<a href="/notifications" />);
        expect(element.find('a').length).toBe(1);
    });

    it('Should render Messages anchor tag', function(){
        const element = shallow(<a href="/messages" />);
        expect(element.find('a').length).toBe(1);
    });

    it('Should render Bookmarks anchor tag', function(){
        const element = shallow(<a href="/bookmarks" />);
        expect(element.find('a').length).toBe(1);
    });

    it('Should render Lists anchor tag', function(){
        const element = shallow(<a href="/lists" />);
        expect(element.find('a').length).toBe(1);
    });

    it('Should render Profile anchor tag', function(){
        const element = shallow(<a href="/profile/undefined" />);
        expect(element.find('a').length).toBe(1);
    });

    it('Should render \'Dark Mode\' anchor tag', function(){
        const element = shallow(<span>Dark Mode</span>);
        expect(element.find('span').length).toBe(1);
    });
})