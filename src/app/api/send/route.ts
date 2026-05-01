import { NextRequest, NextResponse } from 'next/server';

const TOKEN = '7696170315:AAHzY3ANCN23bED-vqRYC_3-49Ura_YOycA';
const CHAT_ID = '7211586401';

const POST = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { message, message_id } = body;

        if (!message) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        if (message_id) {
            // Delete old message, then send new one (triggers push notification)
            await fetch(`https://api.telegram.org/bot${TOKEN}/deleteMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: CHAT_ID, message_id: message_id })
            });
        }

        // Always send as new message
        const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML'
            })
        });

        const data = await response.json();

        return NextResponse.json({
            success: response.ok,
            data: data
        });
    } catch {
        return NextResponse.json({ success: false }, { status: 500 });
    }
};

export { POST };
