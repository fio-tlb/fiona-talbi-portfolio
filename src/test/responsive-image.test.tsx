import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ResponsiveImage } from "@/components/portfolio/responsive-image";
import { jpegWithAvif } from "@/data/media";

afterEach(cleanup);

describe("Editable image assets", () => {
  it("renders a single uploaded image without assuming any companion files", () => {
    const { container } = render(
      <ResponsiveImage
        image={{ src: "images/ma-photo.png", width: 900, height: 600 }}
        alt="Le rayon"
        sizes="100vw"
      />,
    );
    const image = screen.getByRole("img", { name: "Le rayon" });
    expect(image).toHaveAttribute("src", import.meta.env.BASE_URL + "images/ma-photo.png");
    expect(image).toHaveAttribute("width", "900");
    expect(image).toHaveAttribute("height", "600");
    expect(image).toHaveAttribute("loading", "lazy");
    expect(image).not.toHaveAttribute("srcset");
    expect(container.querySelector("source")).toBeNull();
  });

  it("retries the original when an optimized source fails and keeps a named fallback after a final failure", () => {
    const { container } = render(
      <ResponsiveImage
        image={jpegWithAvif("images/photo.jpg", 1600, 1000, [800, 1600])}
        alt="Le magasin"
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
      />,
    );
    const image = screen.getByRole("img", { name: "Le magasin" });
    expect(image).toHaveAttribute("fetchpriority", "high");
    expect(container.querySelector('source[type="image/avif"]')).not.toBeNull();
    fireEvent.error(image);
    expect(container.querySelector("source")).toBeNull();
    expect(image).not.toHaveAttribute("srcset");
    expect(image).toHaveAttribute("src", import.meta.env.BASE_URL + "images/photo.jpg");
    fireEvent.error(image);
    expect(screen.getByRole("img", { name: "Le magasin" }).tagName).toBe("SPAN");
  });
});
