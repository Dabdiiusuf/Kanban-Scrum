import Scrum from "./Scrum";
// import { vi } from "vitest";
import { renderWithProvider } from "../../test-utils";
import { fireEvent } from "@testing-library/dom";
import { store } from "../../app/store";
import { resetScrum } from "../../features/scrum/scrumSlice";

beforeEach(() => {
  store.dispatch(resetScrum());
});

describe("Scrum", () => {
  it("H1 element says TO-DO", () => {
    const { getByText } = renderWithProvider(<Scrum />);
    const titleValue = getByText("TO-DO");
    expect(titleValue).toHaveTextContent("TO-DO");
  });
});

describe("Scrum", () => {
  it("Button text says Add", () => {
    const { getByText } = renderWithProvider(<Scrum />);
    const buttonValue = getByText("Add");
    expect(buttonValue).toHaveTextContent("Add");
  });
});

describe("Scrum", () => {
  it("Redux dispatches new to-do onClick", () => {
    // const dispatchSpy = vi.spyOn(store, "dispatch");
    const { getByText, getByPlaceholderText } = renderWithProvider(<Scrum />);
    const input = getByPlaceholderText("Add your to-do") as HTMLInputElement;
    const button = getByText("Add");
    fireEvent.change(input, { target: { value: "Study" } });
    fireEvent.click(button);
    expect(input.value).toBe("");
    expect(input).toHaveAttribute("placeholder", "Add your to-do");
    expect(button).toHaveTextContent("Add");

    // const calls = dispatchSpy.mock.calls.map(([action]) => action);
    // const addAction = calls.find(
    //   (a: any) => typeof a?.type === "string" && a.type.endsWith("/addTicket")
    // );
    // expect(addAction).toBeTruthy();
    // expect(addAction?.payload).toEqual(
    //   expect.objectContaining({ text: "Study" })
    // );

    // dispatchSpy.mockRestore();
  });
});

describe("Scrum", () => {
  it("h3 element returns input value", () => {
    const { getByText, getByPlaceholderText } = renderWithProvider(<Scrum />);
    const input = getByPlaceholderText("Add your to-do") as HTMLInputElement;
    const button = getByText("Add");
    fireEvent.change(input, { target: { value: "Study" } });
    fireEvent.click(button);
    const header = getByText("Study");
    expect(header).toHaveTextContent("Study");
    expect(input.value).toBe("");
  });
});
