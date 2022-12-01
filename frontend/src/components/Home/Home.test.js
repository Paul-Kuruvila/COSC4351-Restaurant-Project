import {cleanup, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";
import {BrowserRouter} from "react-router-dom";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

beforeEach(() => {
    mockedUsedNavigate.mockReset();
});

afterEach(() => {
    cleanup();
});

describe("Test home form", () => {

    /*test('render login form', async () => {
        render(<Login/>);
        const buttlist = await screen.findAllByRole("button");
        expect(buttlist).toHaveLength(3);
    });*/
    test('home button successfully sends them home', async  () => {
        render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>);
        const button = await screen.getByTestId("button"); 
        expect(button).toBeInTheDocument();
    });
    test('home button functions properly', async  () => {
        render(<BrowserRouter>
            <Home />
        </BrowserRouter>);
        const button = await screen.findAllByRole("button"); 
        expect(button).toHaveLength(1);
    });
    test('Signup button displays properly', async  () => {
        const {getByTestId} = render(<Home label = "Sign Up"></Home>)
        expect(getByTestId("button")).toHaveTextContent("Sign Up")
    });

});
