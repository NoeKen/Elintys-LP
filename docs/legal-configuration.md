# Legal configuration

`src/config/legal.ts` is the source of truth for public legal and administrative facts used by Elintys landing pages, JSON-LD, tests, and `llms.txt` consistency checks.

## Current status

- Public project name: Elintys
- Current operator: Aurel Noe Kenfack
- Official contact email: contact@elintys.com
- Privacy officer: Aurel Noe Kenfack
- Registration status: `unregistered`
- Legal name: `null`
- Legal form: `null`
- NEQ: `null`
- Public business address: `null`
- Policy last updated date: `2026-07-18`

Unknown information must remain `null`, never an empty string or placeholder.

## Dependent files

- `src/lib/legal.ts`: pure helpers for registration status, public identity, missing public fields, and localized policy dates.
- `src/app/components/legal/LegalContentPages.tsx`: renders legal pages with values from `legalConfig`.
- `src/lib/json-ld.ts`: exposes only confirmed public organization data.
- `public/llms.txt`: static public Markdown file checked against `legalConfig`.
- `src/messages/fr.ts` and `src/messages/en.ts`: contain interpolation templates, not hardcoded mutable legal facts.

## When registration steps begin

If registration is actually initiated but not finalized, update only:

```ts
registration: {
  status: "registration-pending",
  legalName: null,
  legalForm: null,
  neq: null,
  registrationDate: null,
}
```

Then review the French and English registration-status messages and rerun all tests.

## After registration is complete

Update `src/config/legal.ts` with confirmed public information:

- `registration.status`
- `registration.legalName`
- `registration.legalForm`
- `registration.neq`
- `registration.registrationDate`
- `address.publicAddress`, only if a professional public address is appropriate

Do not add residential or personal addresses.

## Post-registration checklist

- [ ] Passer le statut à `registered`
- [ ] Ajouter le nom légal
- [ ] Ajouter la forme juridique
- [ ] Ajouter le NEQ
- [ ] Ajouter la date d'immatriculation
- [ ] Ajouter une adresse professionnelle publique si approprié
- [ ] Réviser les conditions d'utilisation
- [ ] Réviser la politique de confidentialité
- [ ] Mettre à jour le JSON-LD
- [ ] Mettre à jour `llms.txt`
- [ ] Mettre à jour les metadata si nécessaire
- [ ] Exécuter tous les tests
- [ ] Faire valider les textes juridiques

## Validation commands

Run these before publishing legal changes:

```bash
npm run lint
npx tsc --noEmit
npm run test:unit
npm run build
npm run test:playwright -- --reporter=line
```

Also inspect:

- `/fr/confidentialite`
- `/en/privacy`
- `/fr/conditions`
- `/en/terms`
- `/llms.txt`
- JSON-LD in page source
- raw `<html lang="...">` in server HTML
