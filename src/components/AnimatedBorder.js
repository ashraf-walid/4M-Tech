import "@/app/globals.css";

export default function AnimatedBorder({ children, className }) {
  return (
    <div className={`animated-border ${className || ""}`}>
      <div className="inner">{children}</div>
    </div>
  );
}