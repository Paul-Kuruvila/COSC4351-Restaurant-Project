import {cleanup, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./Profile";
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

describe("Test Profile form", () => {

    // test('render login form', async () => {
    //     render(<Login/>);
    //     const buttlist = await screen.findAllByRole("button");
    //     expect(buttlist).toHaveLength(3);
    // });
    test('Profile button saves user information', async  () => {
        render(
        <BrowserRouter>
            <Profile/>
        </BrowserRouter>);
        const button = await screen.getByTestId("button"); 
        expect(button).toBeInTheDocument();
    });
    test('Profile button functions properly', async  () => {
        render(<BrowserRouter>
            <Profile/>
        </BrowserRouter>);
        const button = await screen.findAllByRole("button"); 
        expect(button).toHaveLength(2);
    });
    test('Profile button functions properly', async  () => {
        render(
        <BrowserRouter>
            <Profile/>
        </BrowserRouter>)
        const button = await screen.findAllByRole("button"); 
        expect(button).toHaveLength(2);
    });
    test('Save button properly saves information', async  () => {
        const {getByTestId} = render(<Profile label = "Save"></Profile>)
        expect(getByTestId("Submit")).toHaveTextContent("Save")
    });

});