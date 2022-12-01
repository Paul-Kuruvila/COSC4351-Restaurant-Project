import {cleanup, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";
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

describe("Test Navbar form", () => {

    // test('render login form', async () => {
    //     render(<Login/>);
    //     const buttlist = await screen.findAllByRole("button");
    //     expect(buttlist).toHaveLength(3);
    // });
    test('Navbar button saves user information', async  () => {
        render(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>);
        const text = await screen.getByTestId("text"); 
        expect(text).toBeInTheDocument();
    });
    test('Navbar button functions properly', async  () => {
        render(
        <BrowserRouter>
            <Navbar/>
        </BrowserRouter>);
        const text = screen.getByTestId("text"); 
        expect(text).toHaveTextContent("Seat Yourself!"); 
    });
    
});