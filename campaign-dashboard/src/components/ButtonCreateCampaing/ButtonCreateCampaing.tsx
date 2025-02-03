import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function ButtonCreateCampaing() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "0.25rem",
      }}
    >
      <Button
        label="Nueva Campaña"
        onClick={() => navigate("/campaign/new")}
        icon="pi pi-address-book"
      />
    </div>
  );
}
