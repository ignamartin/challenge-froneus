import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { campaignService } from "../services/campaign.service";
import { useCampaignStore } from "../store/campaignStore";
import type { Client } from "../types/client";

export default function EditCampaign() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const {
    selectedCampaign,
    loading,
    clientDialog,
    deleteClientDialog,
    selectedClient,
    newClient,
    setSelectedCampaign,
    setLoading,
    setClientDialog,
    setDeleteClientDialog,
    setSelectedClient,
    updateNewClientField,
    resetNewClient,
  } = useCampaignStore();

  useEffect(() => {
    if (id) {
      loadCampaign();
    }
  }, [id]);

  const loadCampaign = async () => {
    try {
      const data = await campaignService.getCampaign(id!);
      setSelectedCampaign(data);
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al cargar la campaña",
        life: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const openNew = () => {
    resetNewClient();
    setSelectedClient(null);
    setClientDialog(true);
  };

  const hideDialog = () => {
    setClientDialog(false);
    setSelectedClient(null);
  };

  const hideDeleteClientDialog = () => {
    setDeleteClientDialog(false);
  };

  const editClient = (client: Client) => {
    setSelectedClient(client);
    const { name, lastname, telephone } = client;
    updateNewClientField("name", name);
    updateNewClientField("lastname", lastname);
    updateNewClientField("telephone", telephone);
    setClientDialog(true);
  };

  const confirmDeleteClient = (client: Client) => {
    setSelectedClient(client);
    setDeleteClientDialog(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateNewClientField(name, value);
  };

  const saveClient = async () => {
    if (!selectedCampaign) return;

    if (newClient.name && newClient.lastname && newClient.telephone) {
      try {
        let updatedClients: Client[];
        if (selectedClient) {
          updatedClients = selectedCampaign.clients.map((client) =>
            client.id === selectedClient.id
              ? { ...newClient, id: selectedClient.id }
              : client
          );
        } else {
          updatedClients = [
            ...selectedCampaign.clients,
            { ...newClient, id: uuidv4() },
          ];
        }

        const updatedCampaign = await campaignService.updateCampaign(
          selectedCampaign.id,
          {
            clients: updatedClients,
          }
        );

        setSelectedCampaign(updatedCampaign);
        setClientDialog(false);
        resetNewClient();
        setSelectedClient(null);

        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: selectedClient
            ? "Cliente actualizado correctamente"
            : "Cliente agregado correctamente",
          life: 3000,
        });
      } catch (error) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al guardar el cliente",
          life: 3000,
        });
      }
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Todos los campos son obligatorios",
        life: 3000,
      });
    }
  };

  const deleteClient = async () => {
    if (!selectedCampaign || !selectedClient) return;

    try {
      const updatedClients = selectedCampaign.clients.filter(
        (client) => client.id !== selectedClient.id
      );

      const updatedCampaign = await campaignService.updateCampaign(
        selectedCampaign.id,
        {
          clients: updatedClients,
        }
      );

      setSelectedCampaign(updatedCampaign);
      setDeleteClientDialog(false);
      setSelectedClient(null);

      toast.current?.show({
        severity: "success",
        summary: "Éxito",
        detail: "Cliente eliminado correctamente",
        life: 3000,
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Error al eliminar el cliente",
        life: 3000,
      });
    }
  };

  const actionBodyTemplate = (rowData: Client) => {
    return (
      <div className="flex gap-2">
        <Button
          icon="pi pi-pencil"
          rounded
          outlined
          className="mr-2"
          onClick={() => editClient(rowData)}
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="danger"
          onClick={() => confirmDeleteClient(rowData)}
        />
      </div>
    );
  };

  const deleteClientDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        outlined
        onClick={hideDeleteClientDialog}
      />
      <Button
        label="Sí"
        icon="pi pi-check"
        severity="danger"
        onClick={deleteClient}
      />
    </>
  );

  return (
    <div className="container-form">
      <Toast ref={toast} />
      <Card title="Editar Campaña" className="card-container">
        <Button
          icon="pi pi-arrow-left"
          onClick={() => navigate("/")}
          className="button button-back mb-4"
          label="Volver al Dashboard"
        />

        {loading ? (
          <div>Cargando...</div>
        ) : selectedCampaign ? (
          <div>
            <div className="client-section">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Clientes de la Campaña</h3>
                <Button
                  label="Nuevo Cliente"
                  icon="pi pi-plus"
                  className="button button-secondary"
                  onClick={openNew}
                />
              </div>

              <DataTable
                value={selectedCampaign.clients}
                showGridlines
                stripedRows
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25]}
                tableStyle={{ minWidth: "50rem" }}
              >
                <Column field="name" header="Nombre" sortable />
                <Column field="lastname" header="Apellido" sortable />
                <Column field="telephone" header="Teléfono" sortable />
                <Column
                  body={actionBodyTemplate}
                  exportable={false}
                  style={{ minWidth: "12rem" }}
                />
              </DataTable>
            </div>

            <Dialog
              visible={clientDialog}
              style={{ width: "32rem" }}
              breakpoints={{ "960px": "75vw", "641px": "90vw" }}
              header={selectedClient ? "Editar Cliente" : "Nuevo Cliente"}
              modal
              className="p-fluid"
              footer={
                <div className="flex justify-end gap-2">
                  <Button
                    label="Cancelar"
                    icon="pi pi-times"
                    outlined
                    onClick={hideDialog}
                  />
                  <Button
                    label="Guardar"
                    icon="pi pi-check"
                    onClick={saveClient}
                  />
                </div>
              }
              onHide={hideDialog}
            >
              <div className="field">
                <label htmlFor="name">Nombre</label>
                <InputText
                  id="name"
                  name="name"
                  value={newClient.name}
                  onChange={handleInputChange}
                  required
                  autoFocus
                />
              </div>
              <div className="field">
                <label htmlFor="lastname">Apellido</label>
                <InputText
                  id="lastname"
                  name="lastname"
                  value={newClient.lastname}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="telephone">Teléfono</label>
                <InputText
                  id="telephone"
                  name="telephone"
                  value={newClient.telephone}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </Dialog>

            <Dialog
              visible={deleteClientDialog}
              style={{ width: "32rem" }}
              breakpoints={{ "960px": "75vw", "641px": "90vw" }}
              header="Confirmar"
              modal
              footer={deleteClientDialogFooter}
              onHide={hideDeleteClientDialog}
            >
              <div className="confirmation-content">
                <i
                  className="pi pi-exclamation-triangle mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {selectedClient && (
                  <span>
                    ¿Está seguro que desea eliminar a{" "}
                    <b>
                      {selectedClient.name} {selectedClient.lastname}
                    </b>
                    ?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        ) : (
          <div>No se encontró la campaña</div>
        )}
      </Card>
    </div>
  );
}
