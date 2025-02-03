import { ProgressSpinner } from "primereact/progressspinner";

export default function Spinner() {
  return (
    <div className="spinner-container">
      <ProgressSpinner
        style={{ width: "80px", height: "80px" }}
        strokeWidth="3"
        fill="var(--surface-ground)"
        animationDuration="1s"
      />
    </div>
  );
}
