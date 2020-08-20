import React from "react";
import {
  render,
  screen,
  fireEvent,
  userEvent,
  waitFor,
  act,
} from "utils/test-utils";
import Autocomplete from ".";

const SUBJECT = "Test subject";
const NAME = "John";

describe("App component", () => {
  describe("input errors", () => {
    test("all input", async () => {
      render(<Autocomplete />);
      fireEvent.submit(screen.getByRole("button", { name: /Send/i }));
      expect(await screen.findAllByText("Required")).toHaveLength(2);
    });

    test("name input", async () => {
      render(<Autocomplete />);

      let input = await screen.findByLabelText("Name");

      userEvent.type(input, NAME);

      fireEvent.submit(screen.getByRole("button", { name: /Send/i }));

      expect(input).toHaveValue(NAME);
      expect(await screen.findAllByText("Required")).toHaveLength(1);
    });

    test("subject input", async () => {
      render(<Autocomplete />);

      let input = await screen.findByLabelText("Subject");

      userEvent.type(input, SUBJECT);

      fireEvent.submit(screen.getByRole("button", { name: /Send/i }));

      expect(input).toHaveValue(SUBJECT);
      expect(await screen.findAllByText("Required")).toHaveLength(1);
    });

    test("no error", async () => {
      render(<Autocomplete />);

      let name = screen.getByLabelText("Name");
      let subject = screen.getByLabelText("Subject");

      await userEvent.type(name, NAME);
      await userEvent.type(subject, SUBJECT);

      userEvent.click(screen.getByRole("button", { name: /Send/i }));

      await screen.findByText(/Loading.../i);
      await waitFor(() =>
        expect(screen.getByText(/Loaded/i)).toBeInTheDocument()
      );
      expect(name).toHaveValue(NAME);
      expect(subject).toHaveValue(SUBJECT);
      expect(screen.queryByText("Required")).not.toBeInTheDocument();
    });
  });

  describe("Select", () => {
    it("options value", async () => {
      render(<Autocomplete />);

      const select = screen.getByRole("button", { name: /Select None/i });

      userEvent.click(select);

      await waitFor(() =>
        expect(screen.getByRole("option", { name: "Test" })).toBeInTheDocument()
      );

      const options = screen.getAllByRole("option");

      expect(options).toHaveLength(3);
      expect(options[0]).toHaveAttribute("data-value", "default");
      expect(options[1]).toHaveAttribute("data-value", "test");
      expect(options[2]).toHaveAttribute("data-value", "test2");
    });

    it("click on option", async () => {
      const { container } = render(<Autocomplete />);

      const select = screen.getByRole("button", { name: /Select None/i });

      userEvent.click(select);

      await waitFor(() =>
        expect(screen.getByRole("option", { name: "Test" })).toBeInTheDocument()
      );

      const options = screen.getAllByRole("option");

      userEvent.click(options[1]);

      expect(options[1]).toHaveAttribute("aria-selected", "true");
      expect(container.querySelector("input[aria-hidden]")).toHaveValue("test");
    });
  });

  describe("Autocomplete", () => {
    it("open list", () => {
      render(<Autocomplete />);

      const textbox = screen.getByRole("textbox", { name: /Autocomplete/i });

      act(() => {
        textbox.focus();
      });

      const options = screen.getAllByRole("option");

      expect(options).toHaveLength(2);
      expect(options[0]).toHaveAttribute("aria-selected", "true");
      expect(options[0]).toHaveTextContent("John");
    });

    it("select second item", () => {
      render(<Autocomplete />);

      const textbox = screen.getByRole("textbox", { name: /Autocomplete/i });

      act(() => {
        textbox.focus();
      });

      const options = screen.getAllByRole("option");
      expect(options).toHaveLength(2);

      fireEvent.keyDown(textbox, { key: "ArrowDown" });
      fireEvent.keyDown(textbox, { key: "Enter" });

      expect(textbox).toHaveValue("Peter");
    });
  });
});
