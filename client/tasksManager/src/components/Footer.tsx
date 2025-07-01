
import { Footer, FooterCopyright } from "flowbite-react";

export default function FooterComponent() {
  return (
    <Footer container className="w-full max-h-fit bg-gray-800">
      <div className="w-full text-center">
        <FooterCopyright
          href="mailto:sterogam@gmail.com"
          by="S-Digital"
          year={2025}
          className="text-white"
        />
      </div>
    </Footer>
  );
}