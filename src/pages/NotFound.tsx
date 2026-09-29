import Hero from "@/components/Hero";
import Button from "@/components/Button";
import { useTitle } from "@/lib/useTitle";

export default function NotFound() {
  useTitle("Page not found");
  return (
    <Hero title="Page not found" text="The page you’re looking for doesn’t exist or has moved.">
      <Button to="/">Back to home</Button>
    </Hero>
  );
}
