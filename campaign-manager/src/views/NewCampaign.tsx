import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Card } from "primereact/card";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import { Toast } from "primereact/toast";
import { classNames } from "primereact/utils";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { campaignService } from "../services/campaign.service";
import { useCampaignStore } from "../store/campaignStore";

export default function NewCampaign() {
  const {
    campaign,
    newClient,
    submitted,
    updateCampaignField,
    updateNewClientField,
    addClient,
    removeClient,
    setSubmitted,
    resetCampaign,
    resetNewClient,
  } = useCampaignStore();

  const navigate = useNavigate();
  const toast = useRef<Toast>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCampaignField(name as keyof typeof campaign, value);
  };

  const handleDateChange = (
    e: { value: Date | null },
    field: "creationDate" | "callStartDate"
  ) => {
    updateCampaignField(field, e.value);
  };

  const handleSwitchChange = (e: { value: boolean }) => {
    updateCampaignField("record", e.value);
  };

  const handleClientInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateNewClientField(name, value);
  };

  const handleAddClient = () => {
    if (newClient.name && newClient.lastname && newClient.telephone) {
      const clientId = {
        ...newClient,
        id: uuidv4(),
      };

      addClient(clientId);
      resetNewClient();
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: "Por favor, complete todos los campos del cliente",
        life: 3000,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (
      campaign.name &&
      campaign.creationDate &&
      campaign.callStartDate &&
      campaign.clients.length > 0
    ) {
      try {
        const createdCampaign = await campaignService.createCampaign(campaign);
        console.log("Campaña creada:", createdCampaign);

        toast.current?.show({
          severity: "success",
          summary: "Éxito",
          detail: "Campaña creada correctamente",
          life: 3000,
        });

        handleReset();
        setSubmitted(false);
      } catch (error) {
        console.error("Error al crear la campaña:", error);
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Error al crear la campaña. Por favor, intente nuevamente.",
          life: 3000,
        });
      }
    } else {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail:
          "Por favor, complete todos los campos obligatorios y agregue al menos un cliente",
        life: 3000,
      });
    }
  };

  const handleReset = () => {
    resetCampaign();
    resetNewClient();
    setSubmitted(false);
  };

  return (
    <div className="container-form">
      <Toast ref={toast} />
      <Card title="Crear Nueva Campaña" className="card-container">
        <Button
          icon="pi pi-arrow-left"
          onClick={() => navigate("/")}
          className="button button-back mb-4"
          label="Volver al Dashboard"
        />
        <form onSubmit={handleSubmit} className="form-container">
          <div className="field">
            <label htmlFor="name" className="field-label">
              Nombre
            </label>
            <InputText
              id="name"
              name="name"
              value={campaign.name}
              onChange={handleInputChange}
              className={classNames("field-input", {
                "p-invalid": submitted && !campaign.name,
              })}
            />
            {submitted && !campaign.name && (
              <Message
                severity="error"
                className="field-error"
                text="El nombre es obligatorio."
              />
            )}
          </div>

          <div className="field">
            <label htmlFor="creationDate" className="field-label">
              Fecha y Hora de Creación
            </label>
            <Calendar
              id="creationDate"
              value={campaign.creationDate}
              onChange={(e) => handleDateChange(e, "creationDate")}
              showTime
              hourFormat="24"
              className={classNames("field-input", {
                "p-invalid": submitted && !campaign.creationDate,
              })}
            />
            {submitted && !campaign.creationDate && (
              <Message
                severity="error"
                className="field-error"
                text="La fecha de creación es obligatoria."
              />
            )}
          </div>

          <div className="field">
            <label htmlFor="callStartDate" className="field-label">
              Fecha y Hora para Iniciar Llamada
            </label>
            <Calendar
              id="callStartDate"
              value={campaign.callStartDate}
              onChange={(e) => handleDateChange(e, "callStartDate")}
              showTime
              hourFormat="24"
              className={classNames("field-input", {
                "p-invalid": submitted && !campaign.callStartDate,
              })}
            />
            {submitted && !campaign.callStartDate && (
              <Message
                severity="error"
                className="field-error"
                text="La fecha de inicio es obligatoria."
              />
            )}
          </div>

          <div className="switch-container">
            <label htmlFor="record" className="switch-label">
              Grabar Llamadas
            </label>
            <InputSwitch
              id="record"
              checked={campaign.record}
              onChange={handleSwitchChange}
            />
          </div>

          <div className="client-section">
            <h3 className="text-lg font-medium mb-4">Agregar Clientes</h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="field">
                <label htmlFor="clientName" className="field-label">
                  Nombre
                </label>
                <InputText
                  id="clientName"
                  name="name"
                  value={newClient.name}
                  onChange={handleClientInputChange}
                  className="field-input"
                />
              </div>
              <div className="field">
                <label htmlFor="clientLastname" className="field-label">
                  Apellido
                </label>
                <InputText
                  id="clientLastname"
                  name="lastname"
                  value={newClient.lastname}
                  onChange={handleClientInputChange}
                  className="field-input"
                />
              </div>
              <div className="field">
                <label htmlFor="clientTelephone" className="field-label">
                  Teléfono
                </label>
                <InputText
                  id="clientTelephone"
                  name="telephone"
                  value={newClient.telephone}
                  onChange={handleClientInputChange}
                  className="field-input"
                />
              </div>
            </div>
            <Button
              type="button"
              label="Agregar Cliente"
              icon="pi pi-plus"
              onClick={handleAddClient}
              className="button button-secondary mb-4"
            />

            {campaign.clients.length > 0 && (
              <div className="client-list">
                <h4 className="text-md font-medium mb-2">Clientes Agregados</h4>
                {campaign.clients.map((client, index) => (
                  <div
                    key={index}
                    className="client-item flex justify-between items-center p-3 bg-gray-50 rounded-lg mb-2"
                  >
                    <div>
                      <span className="font-medium">
                        {client.name} {client.lastname}
                      </span>
                      <span className="ml-4 text-gray-600">
                        {client.telephone}
                      </span>
                    </div>
                    <Button
                      type="button"
                      icon="pi pi-trash"
                      onClick={() => removeClient(index)}
                      className="p-button-danger p-button-text"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="button-container">
            <Button
              type="button"
              label="Borrar Campos"
              icon="pi pi-trash"
              onClick={handleReset}
              className="button button-danger"
            />
            <Button
              type="submit"
              label="Crear Campaña"
              icon="pi pi-check"
              className="button button-success"
            />
          </div>
        </form>
      </Card>
    </div>
  );
}
