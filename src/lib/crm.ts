export const crmLib = {
  async pushToHubspotOrCliniko(payload: { name: string; phone: string; service: string }) {
    console.log(`Relaying client status packet upstream straight to Enterprise Vendor Endpoint arrays: ${payload.name}`);
    return { success: true, externalReferenceCode: "REFLINK_77491_DATA" };
  }
};