import { SidebarPage } from "@/components/Layout";
import Button from "@/components/Button";
import { useTitle } from "@/lib/useTitle";

export default function NotFound() {
  useTitle("Page not found");
  return (
    <SidebarPage title="Page not found" intro="The page you’re looking for doesn’t exist or has moved.">
      <Button to="/">Back to home</Button>
    </SidebarPage>
  );
}
