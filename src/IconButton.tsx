import type { LucideIcon } from "lucide-react";

interface IconButtonProps {
  readonly icon?: LucideIcon;
  readonly onClick?: () => void;
  readonly disabled?: boolean;
  readonly active?: boolean;
  readonly title?: string;
  readonly danger?: boolean;
}

function IconButton({
  icon: Icon,
  onClick,
  disabled,
  active,
  title,
  danger,
}: IconButtonProps) {
  let color = "#37474f";
  if (active) {
    color = "#1976d2";
  } else if (danger) {
    color = "#d32f2f";
  }

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <button
        onClick={onClick}
        disabled={disabled}
        title={title}
        style={{
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          background: "transparent",
          color: color,
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.4 : 1,
          padding: "0",
          transition: "color 0.2s ease, background-color 0.2s ease",
          borderRadius: "0px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.08)",
          fontSize: "20px",
          fontWeight: "500",
        }}
        onMouseEnter={(e) => {
          if (!disabled) {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.04)";
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {Icon && <Icon size={20} strokeWidth={1.5} />}
      </button>

      {/* Tooltip */}
      <div
        style={{
          position: "absolute",
          left: "48px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.87)",
          color: "#fff",
          padding: "6px 10px",
          borderRadius: "4px",
          fontSize: "12px",
          fontWeight: "500",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          opacity: "0",
          transition: "opacity 0.2s ease",
          zIndex: 1000,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
        className="tooltip"
      >
        {title}
      </div>

      <style>{`
        button:hover ~ .tooltip,
        button:focus ~ .tooltip {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}

export default IconButton;
