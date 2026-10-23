// Single source for Orion's contact details.
//
// Library copy (`library` branch): Orion's own numbers and inboxes are replaced by the Manestream demo
// number, and the landline, second mobile and emails are left out, so nothing here reaches the client.
// `main` keeps the real details.

export const PHONE_PRIMARY = { display: "+91 98230 12345", tel: "+919823012345" };

// Every WhatsApp link on the site reads from here.
export const WHATSAPP_NUMBER = "919823012345";

export function whatsappUrl(
  message = "Hi Orion, I'd like to discuss a pre-engineered building project."
) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
