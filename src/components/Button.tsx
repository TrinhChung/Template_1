import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  mode: string;
  text: string;
}

const Button = ({ mode, text, ...props }: ButtonProps) => {
  return (
    <>
      {mode === "white" && (
        <button
          {...props}
          className="bg-white text-secondaryBrown border border-secondaryBrown text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center rounded transition-all duration-300 hover:bg-secondaryBrown hover:text-white hover:shadow-lg active:scale-95 max-md:text-base"
        >
          {text}
        </button>
      )}

      {mode === "brown" && (
        <button
          {...props}
          className="text-white bg-secondaryBrown text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center rounded transition-all duration-300 hover:bg-secondaryBrown/80 hover:shadow-lg active:scale-95 max-md:text-base"
        >
          {text}
        </button>
      )}

      {mode === "transparent" && (
        <button
          {...props}
          className="text-secondaryBrown border-secondaryBrown border-2 text-center text-xl font-normal tracking-[0.6px] leading-[72px] w-full h-12 flex items-center justify-center rounded transition-all duration-300 hover:bg-secondaryBrown hover:text-white hover:shadow-lg active:scale-95 max-md:text-base"
        >
          {text}
        </button>
      )}

      {mode !== "white" && mode !== "brown" && mode !== "transparent" && (
        <p>No valid mode selected</p>
      )}
    </>
  );
};
export default Button;
