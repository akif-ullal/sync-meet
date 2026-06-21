import {
  render,
  screen,
  fireEvent,
  waitFor
} from "@testing-library/react";

import Login from "./Login";

import { loginUser } from "../api/auth";

// MOCK API
jest.mock("../api/auth");


// MOCK NAVIGATE
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({

  MemoryRouter: ({ children }) => children,

  useNavigate: () => mockedNavigate

}));


describe("Login Page", () => {

  beforeEach(() => {
    
    window.alert = jest.fn();

    localStorage.clear();

    jest.clearAllMocks();

  });


  test("login button works correctly", async () => {

    // FAKE API RESPONSE

    loginUser.mockResolvedValue({

      data: {

        token: "123456",

        user: {

          username: "akif"

        }

      }

    });


    // RENDER PAGE

    render(<Login />);


    // ENTER EMAIL

    fireEvent.change(

      screen.getByLabelText(/email/i),

      {

        target: {

          value: "akif@gmail.com"

        }

      }

    );


    // ENTER PASSWORD

    fireEvent.change(

      screen.getByLabelText(/password/i),

      {

        target: {

          value: "123456"

        }

      }

    );


    // CLICK LOGIN BUTTON

    fireEvent.click(

      screen.getByRole("button", {

        name: /login/i

      })

    );


    // VERIFY

    await waitFor(() => {

      expect(loginUser)

        .toHaveBeenCalledWith({

          email: "akif@gmail.com",

          password: "123456"

        });


      expect(localStorage.getItem("token"))

        .toBe("123456");


      expect(localStorage.getItem("username"))

        .toBe("akif");


      expect(mockedNavigate)

        .toHaveBeenCalledWith("/");

    });

  });

});