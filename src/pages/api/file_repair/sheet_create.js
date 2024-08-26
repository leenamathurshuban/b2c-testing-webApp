import { google } from "googleapis";

async function Sheethandler(req, res) {
    const { id, name, phone_number, email, mac, model, identifier, serviceIssue, description, APIResponse, status } = req.body;

    if (req.method === "POST") {

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                // client_id: process.env.GOOGLE_CLIENT_ID,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            },
            scopes: [
                'https://www.googleapis.com/auth/drive',
                'https://www.googleapis.com/auth/drive.file',
                'https://www.googleapis.com/auth/spreadsheets',
            ],
        });

        const sheets = google.sheets({
            auth,
            version: 'v4',
        });
     
        const response = await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Sheet1!A2:I',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [[id, name, phone_number, email, mac, model, identifier, serviceIssue, description, JSON.stringify(APIResponse), status]],
            },
        });

        res.status(200).json({ message: "Thanks to file a repair" })
    }
}

export default Sheethandler;