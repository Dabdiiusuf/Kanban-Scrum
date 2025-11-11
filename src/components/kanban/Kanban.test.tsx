import { renderWithProvider } from "../../test-utils";
import Kanban from "./Kanban";

describe("Kanban", () => {
  it("render without crashing", () => {
    renderWithProvider(<Kanban />);
  });
});
