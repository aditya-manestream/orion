// Single source for Orion's contact details.

export const PHONE_PRIMARY = { display: "+91 70204 75455", tel: "+917020475455" };
export const PHONE_SECONDARY = { display: "+91 85301 22776", tel: "+918530122776" };
export const LANDLINE = { display: "0253 691 1208", tel: "02536911208" };
export const EMAIL_PRIMARY = "orionpeb@gmail.com";
export const EMAIL_SECONDARY = "mayur.orion@gmail.com";

// TODO(launch): confirm with Orion which number is on WhatsApp.
// Every WhatsApp link on the site reads from here.
export const WHATSAPP_NUMBER = "917020475455";

export function whatsappUrl(
  message = "Hi Orion, I'd like to discuss a pre-engineered building project."
) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
