import { Selector } from 'testcafe';

fixture `Chat E2E test:`
    .page `http://localhost:3000`;

const username = Selector('#username');
const messages = Selector('#messages');
const message = Selector('#message');

test('test don\'t send a message without text', async t => {

    await t
        .typeText('#username', 'John Smith')
        .click('#btnSendMessage')
        .expect(messages.childNodeCount).eql(0)
        .expect(username.value).eql('John Smith');
});

test('test sending message', async t => {

    await t
        .typeText('#username', 'John Smith')
        .typeText('#message', 'Hi. How are you?')
        .click('#btnSendMessage')
        .expect(messages.childNodeCount).eql(1)
        .expect(username.value).eql('John Smith')
        .expect(message.value).eql('');
});

// run: testcafe chrome testcafe/chat.js
