import React from 'react';
import { configure, shallow } from 'enzyme';
import Home from "./index";
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {
    ApolloClient, // Apollo Client is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all the while automatically updating your UI 
    InMemoryCache,
    ApolloProvider,
    HttpLink,
} from '@apollo/client';
import redux from "../../redux/store";
import { GRAPHQL_HTTP_SERVER_URL, GRAPHQL_WS_SERVER_URL } from '../../environment';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';

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

  
    it('Tweets container should contain tweets', function(){
        configure({ adapter: new Adapter() })
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

          
        const HomeComponent = shallow(
            <BrowserRouter>
            <ApolloProvider client={client}>
              <Provider store={redux.store}>
                  <Home />
              </Provider>
            </ApolloProvider>
          </BrowserRouter>        
        );

        // find way to Homepage to use mock data in order to confirm the length of 'div.all-tweets-container' element

        expect(HomeComponent.find("div.all-tweets-container").length).toBe(1);
        // render(
        //     <BrowserRouter>
        //     <ApolloProvider client={client}>
        //       <Provider store={redux.store}>
        //           <Home />
        //       </Provider>
        //     </ApolloProvider>
        //   </BrowserRouter>
        // )

        // const signUpButton = screen.get("Sign Up");
        // fireEvent.click(signUpButton);
        // const passwordField = screen.getByPlaceholderText("Age");
        // fireEvent.click(passwordField);
        // fireEvent.change(passwordField, { target: { value: "45" }});
        // expect(passwordField.value).toBe("45");
    });
})