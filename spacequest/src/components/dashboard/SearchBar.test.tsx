import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { SearchBar } from "./search-bar"; // or "./SearchBar" depending on your file

describe("SearchBar", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the input with default placeholder", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("renders the input with custom placeholder", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} placeholder="Search characters..." />);
    expect(screen.getByPlaceholderText("Search characters...")).toBeInTheDocument();
  });

  it("debounces and calls onSearch with the latest value after 300ms", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Search...");

    // change value
    fireEvent.change(input, { target: { value: "Luke" } });

    // not yet (debounced)
    expect(onSearch).not.toHaveBeenCalledWith("Luke");

    // run debounce
    vi.advanceTimersByTime(300);

    expect(onSearch).toHaveBeenCalledWith("Luke");
  });

  it("cancels the previous debounce and only calls for the newest value", () => {
    const onSearch = vi.fn();
    render(<SearchBar onSearch={onSearch} />);

    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "Lu" } });
    vi.advanceTimersByTime(299);
    expect(onSearch).not.toHaveBeenCalledWith("Lu");

    // update before the timer finishes
    fireEvent.change(input, { target: { value: "Luke" } });

    // now finish debounce
    vi.advanceTimersByTime(300);

    // Should call only with latest final value
    expect(onSearch).toHaveBeenCalledWith("Luke");
    expect(onSearch).not.toHaveBeenCalledWith("Lu");
  });
});
