# ⚡ n8n Workflow Automation Architecture

This directory houses the deployment-ready JSON schema blueprints for orchestrating communication pipes, lead extraction rules, and calendar matrix integrations.

## 📁 System Topology

- `workflows/lead-flow.json` ➔ Captures incoming leads, scores payload schemas via Next.js API nodes, and archives them to Google Sheets.
- `workflows/appointment-flow.json` ➔ Handles immediate scheduling actions, patches Google Calendar event links, and performs data-mutation sync callbacks.
- `workflows/whatsapp-flow.json` ➔ Real-time processing bridge connecting the Meta WhatsApp Cloud API directly with our cognitive Next.js routing logic.
- `workflows/messenger-flow.json` & `instagram-flow.json` ➔ Meta social communication hooks capture engine.

## 🚀 Deployment Manual

### 1. Workflow Import
1. Access your running **n8n Instance dashboard**.
2. Click **Workflows** ➔ **Add Workflow** (Create Blank).
3. Open the top-right options grid menu and select **Import from File**.
4. Upload any corresponding template configuration schema from `./workflows/`.

### 🔐 2. Target Environment Global Credentials Configurations
Ensure the following environmental parameters are provisioned inside your global ecosystem layer parameters or local `.env` runtime allocations before triggering node executions:

```env
# Meta Communication Network Mapping Token Key Configurations
META_PHONE_NUMBER_ID=your_meta_cloud_phone_id
HTTP_HEADER_AUTH_TOKEN=Bearer your_long_lived_system_access_token

# Google Services Integration Access Tokens
GOOGLE_BACKUP_SHEET_ID=your_production_secure_spreadsheet_uuid