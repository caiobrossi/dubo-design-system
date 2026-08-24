# Forms and selection

## Choosing a control

- Free short text: `Input`.
- Free long text or notes: `TextArea`.
- Search: `SearchField`.
- Visible mutually exclusive choices: `RadioGroup`.
- Searchable predefined choice: `Combobox`.
- Compact predefined choice: `Select`.
- Independent boolean in a form: `Checkbox`.
- Immediate setting toggle: `Switch`.
- Suggested text with free entry: `Autocomplete`.
- Date/time: `DateField`, `DatePicker`, or `TimeField`.
- Filter that opens configuration: `FilterChip`.

## Rules

- Always provide a visible label unless the surrounding context is unambiguous and accessibility is
  preserved with an accessible name.
- Put validation near the affected field and keep the control's geometry stable.
- Do not use placeholders as the only label.
- Use controlled state when other UI depends on the value.
- Preserve keyboard navigation and focus styles.
- Do not recreate country, calendar, dental, OTP, or date-range behavior with generic inputs.
