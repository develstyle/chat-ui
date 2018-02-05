import React, { Component } from 'react';

import LocalStorage from '../__mocks__/localStorage';
import Transport from '../__mocks__/transport';


import Chat  from '../src/components/chat/index';
import { shallow } from 'enzyme';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import renderer from 'react-test-renderer';


describe('Test chat', () => {


    describe('Test render components', () => {

        let transport;

        beforeEach(() => {
            transport = new Transport();
        })

        it('render a chat', () => {
            const mounted = shallow(<Chat transport={transport} storage={LocalStorage}/>);

            expect(mounted.find('#chat').length).toEqual(1);
            expect(mounted.find('#newMessageBox').length).toEqual(1);
        });

        it('render and check snapshot', () => {
            const rendered = renderer.create(
                <MuiThemeProvider>
                    <Chat transport={transport} storage={LocalStorage}/>
                </MuiThemeProvider>
            );
            expect(rendered.toJSON()).toMatchSnapshot();
        });

    });

    describe('Test chat business logic', () => {

        let transport;
        let chat;

        beforeEach(() => {
            transport = new Transport();
            chat = new Chat({transport: transport, storage: LocalStorage});
            chat.setState = function (state) {
                this.state = state;
            }
        });

        it('test adding messages to list', () => {
            expect(chat.state.messages.length).toEqual(0);
            chat.addMessageToList({text: 'test'});
            expect(chat.state.messages.length).toEqual(1);
        });

        it('test get avatar', () => {
            const avatars = chat.getAvatarsList();
            const avatar = chat.getRandomAvatar();
            const avatarIndex = avatars.indexOf(avatar);

            expect(avatarIndex).toBeGreaterThanOrEqual(0);
            expect(avatarIndex).toBeLessThan(avatars.length);

            const avatar2 = chat.getRandomAvatar();
            expect(avatar2).toEqual(avatar);
        });

    });

});