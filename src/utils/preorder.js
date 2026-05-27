const API_URL = "https://api.nexobite.com/api/v1/commerce/preorders";

export async function sendPreorder(payload) {
  const idempotencyKey = crypto.randomUUID();

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Preorder request failed with status ${response.status}`);
  }
}
