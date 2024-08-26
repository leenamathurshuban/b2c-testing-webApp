import { google } from 'googleapis';

export default async function getEmojiList(req, res) {

    const reqId = req.query.id;
    try {
        const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
        const jwt = new google.auth.JWT(
            process.env.GOOGLE_CLIENT_EMAIL,
            null,
            (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
            target
        );

        const sheets = google.sheets({ version: 'v4', auth: jwt });
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Sheet1!A1:I', // sheet name
        });

        
        const rows = response.data.values;
        if (rows.length) {
            const allMap = rows.map((row) => ({
                id: row[0],
                name: row[1],
                phone_number: row[2],
                email: row[3],
                mac: row[4],
                model: row[5],
                identifier: row[6],
                issue: row[7],
                description: row[8],
                APIResponse: row[9],
                status: row[10]
            }));
            const finalData = allMap.find(e => e.id == reqId);
            if (finalData != undefined) {
                res.status(200).json({ data: finalData, message: "success", status: true });
            }
            else {
                res.status(200).json({ data: [], message: "Please Enter Correct Repair ID", status: false });
            }
        }
        else {
            res.status(200).json({ data: [], message: "Please Enter Correct Repair ID", status: false });
        }
    } catch (err) {
        // console.log(err);
    }
}