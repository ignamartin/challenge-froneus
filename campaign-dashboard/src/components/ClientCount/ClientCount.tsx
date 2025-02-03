import type { Campaign } from "../../types/campaign";

interface ClientCountProps {
  campaigns: Campaign[];
}

export default function ClientCount({ campaigns }: ClientCountProps) {
  const totalClients = campaigns.reduce(
    (acc, campaign) => acc + campaign.clients.length,
    0
  );

  return (
    <div style={{ display: "flex", marginTop: "1rem" }}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            padding: "1rem",
            backgroundColor: "var(--surface-card)",
            borderRadius: "6px",
            border: "1px solid var(--surface-border)",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <h3
            style={{
              margin: "0",
              color: "var(--text-color)",
              fontSize: "1.2rem",
            }}
          >
            Total de Clientes: {totalClients}
          </h3>
        </div>
      </div>
    </div>
  );
}
