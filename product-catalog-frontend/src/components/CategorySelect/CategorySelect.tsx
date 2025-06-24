import { useState, useRef } from "react";
import { useClickOutside } from "../../shared/hooks/useClickOutside";
import { Category } from "../../shared/interfaces/product";

type CategorySelectProps = {
  categories: Category[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
};

const allOption = { id: 0, name: "All" };

export default function CategorySelect({
  categories,
  value,
  onChange,
  className = "",
}: CategorySelectProps) {
  const [open, setOpen] = useState(false);
  const options = [allOption, ...categories];
  const selected = options.find((cat) => cat.name === value) || allOption;
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className={`relative w-full max-w-xs ${className}`}>
      <button
        type="button"
        className={`w-full flex justify-between items-center rounded-xl border-2 border-gray-700 bg-gray-100 px-6 py-3 font-semibold text-gray-900 shadow-md transition-all duration-200 hover:bg-gray-200 hover:shadow-xl focus:outline-none focus:border-black ${
          open ? "ring-2 ring-black" : ""
        }`}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{selected.name}</span>
        <svg
          className={`ml-2 h-6 w-6 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="black"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute left-0 z-10 mt-2 w-full rounded-xl bg-white border-2 border-gray-700 shadow-2xl animate-dropdown">
          {options.map((cat) => (
            <div
              key={cat.id}
              className={`px-6 py-3 cursor-pointer transition-all ${
                value === cat.name
                  ? "bg-gray-800 text-white font-bold"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
              onClick={() => {
                onChange(cat.name);
                setOpen(false);
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      )}
      <style>
        {`
          @keyframes dropdown {
            0% { opacity: 0; transform: scaleY(0.95);}
            100% { opacity: 1; transform: scaleY(1);}
          }
          .animate-dropdown {
            animation: dropdown 0.15s ease;
            transform-origin: top;
          }
        `}
      </style>
    </div>
  );
}
