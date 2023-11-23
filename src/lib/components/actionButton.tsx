import { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button as MButton } from "@mantine/core";

function Button({children}: {
    children: ReactNode
}) {
    const { pending } = useFormStatus();
   
    return (
      <MButton className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md" aria-disabled={pending} loading={pending} type="submit">
        {children}
      </MButton>
    );
  }

  export default Button