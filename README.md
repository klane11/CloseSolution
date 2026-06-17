# Close Fiddle Challenge

Live demo: [https://jsfiddle.net/07ohLmc4/12/](https://jsfiddle.net/07ohLmc4/13/)

## What I built

A performant, accessible multi-select list built in React.

## Requirements

- [x] Clicking an item selects/deselects it
- [x] Multiple items can be selected at a time
- [x] Unnecessary re-renders avoided on the large list
- [x] Selected items are visually highlighted
- [x] Selected items' names are shown at the top of the page

## Performance approach

- `memo` on `ListItem` — prevents re-rendering items whose props haven't changed
- `useCallback` on `handleToggle` — keeps the function reference stable so `memo` works correctly
- `Set` for selection state — O(1) lookup for `isSelected` checks across 800+ items
- `isSelected` passed as a boolean primitive — allows `memo` to do simple equality checks rather than comparing object references

## Extra touches

- Colored badges for selected items with individual deselect
- "Clear all" button
- `aria-live`, `role="listbox"`, `role="option"`, and `aria-selected` for screen reader support
- Poppins font and rounded corners for polish
- `data-name` attribute on list items to avoid stale closure issues with React's event delegation
