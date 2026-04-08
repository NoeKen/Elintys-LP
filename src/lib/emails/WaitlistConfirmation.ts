function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export default function waitlistConfirmationEmail(email: string) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://elintys.com";
  const safeEmail = escapeHtml(email);
  const unsubscribeUrl = `${siteUrl}/unsubscribe?email=${encodeURIComponent(email)}`;

  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
            <tr>
              <td style="padding:0 0 32px 0;">
                <p style="margin:0;font-size:24px;font-weight:700;color:#0D9488;letter-spacing:-0.5px;">Elintys</p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 24px 0;">
                <h1 style="margin:0;font-size:32px;font-weight:700;color:#1C2B3A;line-height:1.2;">
                  Vous êtes sur la liste !
                </h1>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 32px 0;">
                <p style="margin:0;font-size:16px;color:#1C2B3A;line-height:1.6;">Bienvenue ${safeEmail} ! 🎉</p>
                <p style="margin:16px 0 0 0;font-size:16px;color:#1C2B3A;line-height:1.6;">
                  Votre inscription à la liste d'attente Elintys est confirmée. Vous ferez partie des premiers à accéder à la bêta lors du lancement, avec un accès prioritaire et des avantages exclusifs réservés aux membres fondateurs.
                </p>
                <p style="margin:16px 0 0 0;font-size:16px;color:#1C2B3A;line-height:1.6;">
                  On vous contactera dès que les portes s'ouvrent. D'ici là, gardez un oeil sur votre boîte mail !
                </p>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 32px 0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F9FAFB;border-radius:12px;">
                  <tr>
                    <td style="padding:28px 32px;">
                      <h2 style="margin:0 0 20px 0;font-size:18px;font-weight:600;color:#1C2B3A;">Ce qui vous attend</h2>
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="padding:0 0 16px 0;">
                            <table role="presentation" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="vertical-align:top;padding-right:12px;padding-top:2px;">
                                  <div style="width:8px;height:8px;border-radius:50%;background-color:#0D9488;margin-top:6px;"></div>
                                </td>
                                <td>
                                  <p style="margin:0;font-size:15px;color:#1C2B3A;line-height:1.6;">
                                    <strong>Parcours événementiel complet</strong> - Découvrez, planifiez et vivez chaque événement de A à Z, sans friction.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td style="padding:0 0 16px 0;">
                            <table role="presentation" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="vertical-align:top;padding-right:12px;padding-top:2px;">
                                  <div style="width:8px;height:8px;border-radius:50%;background-color:#0D9488;margin-top:6px;"></div>
                                </td>
                                <td>
                                  <p style="margin:0;font-size:15px;color:#1C2B3A;line-height:1.6;">
                                    <strong>Plateforme bilingue FR/EN</strong> - Une expérience fluide dans les deux langues officielles du Canada.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table role="presentation" cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="vertical-align:top;padding-right:12px;padding-top:2px;">
                                  <div style="width:8px;height:8px;border-radius:50%;background-color:#0D9488;margin-top:6px;"></div>
                                </td>
                                <td>
                                  <p style="margin:0;font-size:15px;color:#1C2B3A;line-height:1.6;">
                                    <strong>Lancement à Montréal</strong> - Conçu pour la scène culturelle et événementielle montréalaise, avec une vision nationale.
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 40px 0;">
                <a
                  href="${siteUrl}"
                  style="display:inline-block;padding:14px 28px;background-color:#0D9488;color:#ffffff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:600;"
                >
                  En savoir plus →
                </a>
              </td>
            </tr>

            <tr>
              <td style="padding:0 0 24px 0;border-top:1px solid #E5E7EB;"></td>
            </tr>

            <tr>
              <td>
                <p style="margin:0;font-size:13px;color:#6B7280;line-height:1.6;">
                  © 2026 Elintys · hello@elintys.com · Montréal, Québec
                </p>
                <p style="margin:8px 0 0 0;font-size:12px;color:#9CA3AF;">
                  Vous recevez cet email car vous vous êtes inscrit sur
                  <a href="${siteUrl}" style="color:#9CA3AF;"> elintys.com</a>.
                  <a href="${unsubscribeUrl}" style="color:#9CA3AF;"> Se désabonner</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;
}
