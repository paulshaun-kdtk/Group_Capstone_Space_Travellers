// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

// Create a mock service worker server
const server = setupServer(
  rest.get('https://api.spacexdata.com/v3/missions', (req, res, ctx) => res(
    ctx.status(200),
    ctx.json([{ id: '1', name: 'Mission 1' }]), // Mock response data
  )),
);

// Start the server before running tests
beforeAll(() => server.listen());

// Reset any request handlers between tests
afterEach(() => server.resetHandlers());

// Clean up and close the server after all tests
afterAll(() => server.close());
