
import { Spinner } from "flowbite-react";

export default function Component() {
  return (
    <div className="flex flex-col gap-2">
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>
    </div>
  );
}
