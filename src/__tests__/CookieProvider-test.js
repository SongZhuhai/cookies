import expect from 'expect';
import React from 'react';
import { mount } from 'enzyme';
import { object } from 'prop-types';

import CookieProvider from '../CookieProvider';
import { cleanCookies } from './utils';

function DumpCookies(props, { cookies }) {
  return <code>{JSON.stringify(cookies || {})}</code>;
}

DumpCookies.contextTypes = {
  cookies: object.isRequired,
};

describe('<CookieProvider>', () => {
  it('should read the cookie values', () => {
    cleanCookies();
    document.cookie = 'testingCookie=yes';

    const wrapper = mount(<CookieProvider><DumpCookies /></CookieProvider>);
    const cookies = JSON.parse(wrapper.text());
    expect(cookies.testingCookie).toBe('yes');
  });

  // TODO: Find a way to test this
  /*it('detect new cookie', done => {
    cleanCookies();
    const wrapper = mount(<CookieProvider><DumpCookies /></CookieProvider>);
    document.cookie = 'testingCookie=yes';

    setTimeout(
      () => {
        const cookies = JSON.parse(wrapper.text());
        expect(cookies.testingCookie).toBe('yes');
        done();
      },
      1000
    )
  });*/
});

describe('<CookieProvider> using cookieHeader', () => {
  it('should read the cookie values', () => {
    cleanCookies();
    const cookieHeader = 'testingCookie=yes';

    const wrapper = mount(
      <CookieProvider header={cookieHeader}>
        <DumpCookies />
      </CookieProvider>,
    );
    const cookies = JSON.parse(wrapper.text());
    expect(cookies.testingCookie).toBe('yes');
  });
});
