import DebitNote from "@/components/DebitNote";
import { render, screen } from "@testing-library/react";

describe("Debit Note", async () => {
  it("Should render the basic element", () => {
    render(<DebitNote />);
    expect(screen.getByText("New Debit note")).toBeInTheDocument();
    expect(screen.getByText("Supplier name")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Reference no")).toBeInTheDocument();
  });
  it("Should render the required fields", () => {
    render(<DebitNote />);
    expect(screen.getByText("Eg: Globex Corporation")).toBeInTheDocument();
    expect(screen.getByText("dd/mm/yyyy")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("reference no")).toBeInTheDocument();
  });
});
