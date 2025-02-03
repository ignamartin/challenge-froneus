import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { TabPanel, TabView } from "primereact/tabview";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import { useRef, useState, useEffect } from "react";
import ButtonCreateCampaing from "../components/ButtonCreateCampaing/ButtonCreateCampaing";
import ClientCount from "../components/ClientCount/ClientCount";
import { useNavigate } from "react-router-dom";
import { useCampaignStore } from "../store/campaignStore";
import type { Campaign } from "../types/campaign";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { campaignService } from "../services/services";

export default function CampaignDashboard() {
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const toast = useRef<Toast>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { campaigns, selectedCampaign, setCampaigns, setSelectedCampaign } =
    useCampaignStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["campaigns"],
    queryFn: campaignService.getCampaigns,
  });

  useEffect(() => {
    if (data) {
      setCampaigns(data);
    }
  }, [data, setCampaigns]);

  const deleteMutation = useMutation({
    mutationFn: campaignService.deleteCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Campaña eliminada correctamente",
        life: 3000,
      });
      setDeleteModalVisible(false);
      setSelectedCampaign(null);
    },
    onError: () => {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar la campaña",
        life: 3000,
      });
    },
  });

  const handleDelete = async () => {
    if (selectedCampaign) {
      deleteMutation.mutate(selectedCampaign.id);
    }
  };

  const stateTemplate = (rowData: Campaign) => {
    const severity =
      rowData.state === "activa"
        ? "success"
        : rowData.state === "finalizada"
        ? "danger"
        : "warning";
    return <Tag value={rowData.state} severity={severity} />;
  };

  const formatDate = (dateString: string | Date) => {
    const date =
      typeof dateString === "string" ? new Date(dateString) : dateString;
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const recordTemplate = (rowData: Campaign) => {
    return rowData.record ? "Sí" : "No";
  };

  const actionTemplate = (rowData: Campaign) => {
    return (
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <Button
          icon="pi pi-pencil"
          link
          onClick={() => navigate(`/campaign/edit/${rowData.id}`)}
          rounded
          outlined
          severity="secondary"
        />
        {rowData.state === "en espera" && (
          <Button
            icon="pi pi-trash"
            rounded
            outlined
            severity="danger"
            onClick={(e) => {
              e.preventDefault();
              setSelectedCampaign(rowData);
              setDeleteModalVisible(true);
            }}
          />
        )}
      </div>
    );
  };

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error al cargar las campañas</div>;
  if (!campaigns) return <div>No hay campañas disponibles</div>;

  return (
    <>
      <Toast ref={toast} />
      <Dialog
        visible={deleteModalVisible}
        onHide={() => setDeleteModalVisible(false)}
        header="Confirmar Eliminación"
        footer={
          <div>
            <Button
              label="No"
              icon="pi pi-times"
              outlined
              onClick={() => setDeleteModalVisible(false)}
              className="mr-2"
            />
            <Button
              label="Sí"
              icon="pi pi-check"
              severity="danger"
              onClick={handleDelete}
            />
          </div>
        }
      >
        <div className="m-0">
          ¿Está seguro que desea eliminar la campaña "{selectedCampaign?.name}"?
        </div>
      </Dialog>

      <Card title="Dashboard de Campañas" className="m-3">
        <ButtonCreateCampaing />

        <TabView>
          {["activa", "finalizada", "en espera"].map((state) => (
            <TabPanel
              key={state}
              header={state.charAt(0).toUpperCase() + state.slice(1)}
            >
              <div>
                <DataTable
                  value={campaigns.filter((c) => c.state === state)}
                  stripedRows
                >
                  <Column field="name" header="Nombre" sortable />
                  <Column
                    field="creationDate"
                    header="Fecha de Creación"
                    body={(rowData: Campaign) =>
                      formatDate(rowData.creationDate)
                    }
                    sortable
                  />
                  <Column
                    field="callStartDate"
                    header="Fecha Inicio de Llamada"
                    body={(rowData: Campaign) =>
                      formatDate(rowData.callStartDate)
                    }
                    sortable
                  />
                  <Column
                    field="record"
                    header="Grabar"
                    body={recordTemplate}
                    sortable
                  />
                  <Column
                    field="state"
                    header="Estado"
                    body={stateTemplate}
                    sortable
                  />
                  <Column
                    header="Acciones"
                    body={actionTemplate}
                    exportable={false}
                  />
                </DataTable>
                <ClientCount
                  campaigns={campaigns.filter((c) => c.state === state)}
                />
              </div>
            </TabPanel>
          ))}
        </TabView>
      </Card>
    </>
  );
}
