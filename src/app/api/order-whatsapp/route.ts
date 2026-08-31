import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      productTitle,
      sku,
      category,
      price,
      quantity,
      totalPrice,
      productUrl,
      customerName,
      customerPhone,
    } = body;

    const targetNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917829841646";
    const waApiUrl = process.env.WA_API_URL || "http://localhost:8000/api/whatsapp/send";

    const formattedMessage = `🛍️ *SILENT BACKGROUND ORDER NOTIFICATION*

📦 *Product:* ${productTitle}
🆔 *SKU:* ${sku || "N/A"}
🏷️ *Category:* ${category || "General"}
💰 *Unit Price:* ${price}
🔢 *Quantity:* ${quantity}
💵 *Total Amount:* ${totalPrice}
🔗 *Product Link:* ${productUrl}

👤 *Customer Details:*
• Name: ${customerName || "Customer"}
• Phone Number: ${customerPhone}

Sent automatically from Shopkara E-Commerce Storefront.`;

    console.log(`[WhatsApp Background Order] Sending order alert to ${targetNumber}:`, formattedMessage);

    // Attempt sending via local wa-api / gateway if available
    try {
      await fetch(waApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: targetNumber,
          phone: targetNumber,
          message: formattedMessage,
        }),
      });
    } catch (apiErr) {
      console.warn("[WhatsApp Background Order] wa-api gateway offline, order logged locally:", apiErr);
    }

    return NextResponse.json({
      success: true,
      message: "Order notification sent silently in background to seller.",
      sellerPhone: targetNumber,
    });
  } catch (error: any) {
    console.error("Order WhatsApp API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process background order" },
      { status: 500 }
    );
  }
}
