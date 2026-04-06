# SAS Solar Quotation - Public Dashboard

## Current State
- App requires login (admin/sassolar123) to access anything
- Saved Quotations page exists but is behind login wall
- SavedQuotations component has a Delete button on each card
- No public/unauthenticated access route exists

## Requested Changes (Diff)

### Add
- A new `PublicDashboard` component: a read-only, publicly accessible page showing all saved quotations
- Public dashboard route accessible at app root (no login required) via a URL parameter or separate view state `publicDashboard`
- The public dashboard shows: customer name, quotation number, capacity (kW), sale price, system type, panel brand, saved date
- A "View Proposal" button on each card opens the full proposal (read-only)
- Public dashboard has a header with company logo and branding
- A counter showing total quotations
- A public URL link/button so users can share or navigate directly to it

### Modify
- `App.tsx`: Add logic so that if URL contains `?dashboard` or `#dashboard` query param, render public dashboard without requiring login
- `SavedQuotations.tsx` (admin view): Remove the Delete button entirely - no deletion allowed anywhere
- Backend `deleteQuotation` function stays in Motoko but is simply never called from the frontend
- The main QuotationForm page also shows a "Public Dashboard" link button so logged-in admins can share the dashboard URL

### Remove
- Delete button from both admin SavedQuotations view and public dashboard
- handleDelete function and all delete-related code from SavedQuotations.tsx

## Implementation Plan
1. Create `src/frontend/src/components/PublicDashboard.tsx` - read-only dashboard, no delete, no login needed, same dark premium style
2. Update `App.tsx` to check URL for `?view=dashboard` on load and show PublicDashboard without requiring auth
3. Remove delete button and handleDelete from `SavedQuotations.tsx`
4. Add a "Share Dashboard" button to the QuotationForm or SavedQuotations header that shows the public URL
5. Validate and deploy
