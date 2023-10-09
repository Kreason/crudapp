import { render, screen } from '@testing-library/react';
import UserLogin from './views/login/login';
import { BrowserRouter } from 'react-router-dom';
import { loginService } from "./services/login-service";

// test suite for login

test('Login Button', async () => {
  render(<BrowserRouter><UserLogin/></BrowserRouter>)
  const buttons = await screen.findAllByRole("button")
  expect(buttons).toHaveLength(1)
});

test("Password to have type password", () => {
  render(<BrowserRouter><UserLogin/></BrowserRouter>);
  const password = screen.getByPlaceholderText("Password");
  expect(password).toHaveAttribute("type", "password");
});

test("Username to have type text", () => {
  render(<BrowserRouter><UserLogin/></BrowserRouter>);
  const username = screen.getByPlaceholderText("Username");
  expect(username).toHaveAttribute("type", "text");
});

//this test was manipulated to test for cors from a different origin
test("Authenticate to fail because of cors set on deployed api", async () => {
  const response = await loginService.login("Kreason", "Easy1234")
  expect(response).toEqual('CORSError')
});