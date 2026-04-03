# SAS Solar Quotation

## Current State

The Hybrid/Off-Grid form section shows a static battery info box that auto-calculates backup from system capacity (e.g. 3kW = 3kWh = 1 hr at 3kW). There is no way for the user to select battery quantity or change the backup kWh. The `CustomerData` type has `batteryCapacityKWh?: number` but no quantity field. The `BatteryDetails` proposal page always uses `customer.capacity` for battery kWh.

## Requested Changes (Diff)

### Add
- `batteryQuantity?: number` field to `CustomerData` type (defaults to 1)
- `batteryBackupKWh?: number` field to `CustomerData` type (separate from `batteryCapacityKWh`)
- **Battery Quantity dropdown** in the form (visible only when Hybrid/Off-Grid is selected): options 1, 2, 3, 4 batteries
- **Battery Backup dropdown** in the form (visible only when Hybrid/Off-Grid is selected):
  - For **3kW system**: only one option — `3 kWh` (fixed, no choice)
  - For **5kW system**: two options — `5 kWh` (default, no extra cost) and `10 kWh` (adds ₹1,60,000 to sale price automatically)
  - For **all other system sizes**: fixed at `{capacity} kWh` (no choice, same as current)
- When 10kWh is selected for 5kW system, auto-add ₹1,60,000 to the displayed sale price total and show a note explaining the upgrade cost

### Modify
- `BatteryDetails` proposal page: use `customer.batteryBackupKWh ?? customer.capacity` for kWh values shown in specs and backup calculation, and show battery quantity if > 1
- `handleSystemTypeChange` and `handleCapacityChange` in QuotationForm: initialize `batteryBackupKWh` to `capacity` and `batteryQuantity` to 1 when switching to Hybrid/Off-Grid
- Battery info box in form: show selected quantity and backup kWh
- Sale price field: when 5kW system + 10kWh backup selected, the base sale price should remain what user entered, but the total/final price shown should include the ₹1,60,000 surcharge; pass adjusted price through to the proposal

### Remove
- Nothing removed

## Implementation Plan

1. **types.ts**: Add `batteryQuantity?: number` and `batteryBackupKWh?: number` to `CustomerData`
2. **QuotationForm.tsx**:
   - In `handleSystemTypeChange`: set `batteryBackupKWh: cap, batteryQuantity: 1` when non-ongrid
   - In `handleCapacityChange`: reset `batteryBackupKWh` to new capacity (unless user has manually chosen upgrade, in which case reset on capacity change)
   - Add Battery Quantity dropdown (1–4) inside the Hybrid/Off-Grid battery info section
   - Add Battery Backup dropdown:
     - 3kW: single option `3 kWh` (disabled/fixed)
     - 5kW: options `5 kWh` (base) and `10 kWh` (+₹1,60,000)
     - Other: single option `{capacity} kWh` (fixed)
   - When 5kW + 10kWh selected: show upgrade note "Extra 5kWh backup: +₹1,60,000 added to price"
   - Effective sale price passed to `onGenerate` = base salePrice + (5kW && 10kWh ? 160000 : 0)
3. **BatteryDetails.tsx**: Use `customer.batteryBackupKWh ?? customer.capacity` for kWh. Show `{quantity}x` battery label if quantity > 1.
4. **ProformaInvoice.tsx** (if needed): reflect updated sale price for 5kW+10kWh
