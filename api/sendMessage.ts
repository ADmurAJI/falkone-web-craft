export default async function handler(req: Request) {
	if (req.method !== 'POST') {
		return new Response('Method Not Allowed', { status: 405 })
	}
	
	const body = await req.json()
	const { name, projectType, budget, timeline, message } = body
	
	const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
	const CHAT_ID = process.env.TELEGRAM_CHAT_ID
	
	if (!TELEGRAM_TOKEN || !CHAT_ID) {
		console.error('❌ Переменные окружения не определены', { TELEGRAM_TOKEN, CHAT_ID })
		return new Response('Missing env vars', { status: 500 })
	}
	
	const text = `
📩 Новая заявка с сайта:

👤 Имя: ${name}
💼 Тип проекта: ${projectType}
💰 Бюджет: ${budget}
🕒 Сроки: ${timeline || 'Не указано'}
📝 Задача:
${message}
`
	
	const resTelegram = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			chat_id: CHAT_ID,
			text,
		}),
	})
	
	if (!resTelegram.ok) {
		const error = await resTelegram.text()
		return new Response(error, { status: 500 })
	}
	
	return new Response(JSON.stringify({ ok: true }), {
		headers: { 'Content-Type': 'application/json' },
	})
}
