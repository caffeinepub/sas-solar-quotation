# SAS Solar Quotation Generator

## Current State
- 9-page A4 proposal with dark navy + gold design
- Pages: Cover, About Company, Solar Benefits, Financial Analysis, System Specs, Proforma Invoice, Payment Schedule, Warranty & AMC, Work Execution Plan
- Login page with admin/sassolar123 credentials
- Live calculation form

## Requested Changes (Diff)

### Add
- PM Surya Ghar Yojana project mention on Cover Page (Page 1)
- New Thanks / Thank You page as the final page
- Bottle green, white, and blue color scheme across the entire proposal and UI

### Modify
- Page 2: Merge About Company + Solar Benefits into a single A4 page
- Page 3: Merge Financial Analysis + System Specifications into a single A4 page
- Page 4: Merge Proforma Invoice + Payment Terms & Schedule into a single A4 page
- Fix payment term percentage total to be 100% (not 105%)
- Page 5: Merge Warranty & AMC + Work Execution Plan into a single A4 page
- All pages: apply bottle green (#1B6B45), white (#FFFFFF), and blue (#1A4FA0) color palette replacing navy+gold theme

### Remove
- Old navy and gold color references
- Separate Solar Benefits page (merged into Page 2)
- Separate System Specs page (merged into Page 3)
- Separate Payment Schedule page (merged into Page 4)
- Separate Work Execution Plan page (merged into Page 5)

## Implementation Plan
1. Update index.css and tailwind config with bottle green + blue + white tokens
2. Update CoverPage.tsx: add PM Surya Ghar Yojana section, new color scheme
3. Merge AboutCompany.tsx + SolarBenefits.tsx into one component (Page 2)
4. Merge FinancialAnalysis.tsx + SystemSpecs.tsx into one component (Page 3)
5. Merge ProformaInvoice.tsx + PaymentSchedule.tsx into one component (Page 4), fix payment percentages to sum to 100%
6. Merge WarrantyAMC.tsx + WorkExecution.tsx into one component (Page 5)
7. Create new ThanksPage.tsx component (Page 6)
8. Update App.tsx / proposal rendering to use new 6-page structure
9. Update LoginPage.tsx and QuotationForm.tsx with new color scheme
