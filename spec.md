# SAS Solar Quotation

## Current State
- Off-Grid (and Hybrid) systems show a Battery Storage section in the form and a Battery Details page in the proposal
- Only Lithium Ion batteries are currently shown — no battery type selection exists
- Battery quantity (1–4) and backup kWh dropdowns exist for Hybrid/Off-Grid
- BatteryDetails proposal page shows Lithium Ion specs, backup calculation, and 5 brands (Tata, Waree, Luminous, Havells, Exide)

## Requested Changes (Diff)

### Add
- `batteryType` field (`"lithium" | "lead_acid"`) to `CustomerData` type
- `leadAcidCapacityAH` field (number, e.g. 100–500) to `CustomerData` type
- Battery Type toggle/dropdown in the QuotationForm battery section — **only visible for Off-Grid** (Hybrid stays Lithium Ion only)
- When Lead Acid is selected for Off-Grid:
  - Show Battery Capacity dropdown: 100AH, 150AH, 200AH, 250AH, 300AH, 350AH, 400AH, 500AH
  - Show Battery Quantity dropdown (1–4, same as existing)
  - Lead Acid brand names to display: Exide, Luminous, Amaron, Su-Kam, Okaya
- BatteryDetails proposal page: show Lead Acid specs section when `batteryType === "lead_acid"`
  - Show capacity in AH, quantity, brand names, and a note about maintenance
  - Hide Lithium Ion advantages section and replace with Lead Acid relevant info

### Modify
- `QuotationForm.tsx`: Add battery type toggle (Lithium Ion / Lead Acid) under Off-Grid battery section
- `types.ts`: Add `batteryType` and `leadAcidCapacityAH` fields
- `BatteryDetails.tsx`: Conditionally render Lithium Ion or Lead Acid specs based on `batteryType`
- `handleSystemTypeChange`: Default batteryType to `"lithium"` for Hybrid (Lead Acid not available for Hybrid), allow both for Off-Grid

### Remove
- Nothing removed

## Implementation Plan
1. Update `types.ts` to add `batteryType` and `leadAcidCapacityAH`
2. Update `QuotationForm.tsx`:
   - Add battery type toggle (Lithium Ion / Lead Acid) — visible only when systemType is offgrid
   - Add Lead Acid capacity dropdown (100AH–500AH) — visible when offgrid + lead_acid
   - Default batteryType to lithium; reset to lithium if user switches to Hybrid
3. Update `BatteryDetails.tsx`:
   - Conditionally render Lead Acid specs when batteryType === lead_acid
   - Lead Acid brands: Exide, Luminous, Amaron, Su-Kam, Okaya
   - Show capacity (AH), quantity, maintenance note
   - Keep Lithium Ion rendering unchanged for lithium type
