# Component catalog

Always select a component from this catalog before writing raw UI. All components are imported from
`dubo-design-system` unless a component-specific entrypoint is explicitly preferred.

## Actions and feedback

| Component | Also means | Purpose |
| --- | --- | --- |
| `Button` | CTA, action | Primary, secondary, outline, ghost, and destructive actions |
| `Toggle` | pressed button | Independent on/off action |
| `ToggleGroup` | grouped toggles | Related mutually exclusive or multi-select actions |
| `Badge` | chip, tag, status | Status, category, filter, count, or compact metadata |
| `Alert` | inline notice | Persistent contextual feedback |
| `AlertDialog` | destructive confirmation | Explicit confirmation before irreversible action |
| `Toaster`, `toast` | snackbar | Brief asynchronous feedback |
| `Progress` | progress bar | Determinate or indeterminate progress |
| `Spinner` | loader | Compact in-place loading |
| `Skeleton` | placeholder | Loading layout that preserves geometry |
| `EmptyState` | no-results state | Empty content with explanation and recovery action |
| `ErrorState` | failure state | Recoverable error with clear next step |

## Forms and selection

| Component | Also means | Purpose |
| --- | --- | --- |
| `Input` | text field | Single-line input |
| `TextArea`, `FloatingTextArea` | notes field | Multi-line input |
| `SearchField` | search box | Search entry using the shared field recipe |
| `Label` | field label | Required, optional, description, and info labels |
| `Checkbox` | boolean selection | Independent yes/no selection |
| `RadioGroup` | single choice | Mutually exclusive visible options |
| `Switch` | setting toggle | Immediate on/off setting |
| `Select` | dropdown | Choice from a predefined option list |
| `Combobox` | searchable select | Searchable choice with controlled options |
| `Autocomplete` | suggestions | Text entry with matching suggestions |
| `InputOTP` | code input | Multi-slot verification code |
| `PhoneInputSplit` | phone field | Country selector and phone number input |
| `DateField` | date input | Typed date with calendar access |
| `DatePicker` | calendar picker | Single date or date range selection |
| `TimeField` | time input | Typed time with time picker |
| `WeekdayPicker` | weekday selector | Compact recurring weekday selection |
| `DentalSelector` | tooth/quadrant selector | Dental clinical selection |
| `Slider` | range input | Numeric value or range selection |
| `FieldTrigger` | field-like trigger | Opens a picker while preserving field styling |
| `FilterChip` | filter control | Opens filter content and exposes active state |
| `DateRangeFilterChip` | date filter | Compact date-range filtering |

## Navigation and layout

| Component | Also means | Purpose |
| --- | --- | --- |
| `SideNavigation` | app sidebar | Persistent product-level navigation |
| `NavigationMenu` | top navigation | Links with structured dropdown content |
| `Breadcrumb` | path navigation | Hierarchical location context |
| `Tabs` | page tabs | Page-level or section-level content switching |
| `SegmentControl` | local mode switcher | Compact local view switching |
| `PageHeader` | page title bar | Title, description, back action, and page actions |
| `PageLayout` | page grid | Full, 50/50, 25/75, and 75/25 page structures |
| `LayoutCard` | content panel | Quiet panel inside a page layout |
| `Card` | grouped surface | General structured content container |
| `InteractiveCard` | selectable card | Single-select, multi-select, or linked card |
| `Separator` | divider | Visual or labelled content separation |
| `Pagination` | page controls | Responsive page navigation |

## Data, overlays, and advanced interaction

| Component | Also means | Purpose |
| --- | --- | --- |
| `Table` | static table | Dense scannable tabular content |
| `DataTable` | interactive table | Sortable and configurable data grid |
| `DataCards` | mobile rows | Responsive card representation of table data |
| `DataDisplay` | value display | Label/value content with consistent hierarchy |
| `StatsBar` | metrics bar | Compact KPI or summary strip |
| `Avatar` | profile image | Person/entity image, initials, group, and status |
| `Dialog` | modal | Focused task that overlays the page |
| `Sheet` | drawer | Edge-anchored secondary task or detail panel |
| `Popover` | anchored overlay | Small contextual interaction anchored to a control |
| `HoverCard` | hover preview | Rich preview for a link or entity |
| `Tooltip` | short hint | Brief label or explanation on hover/focus |
| `DropdownMenu` | action menu | Compact menu of commands and submenus |
| `Command` | command list | Searchable actions, options, or navigation |
| `FloatingPanel` | movable workspace | Secondary movable/minimizable workspace |
| `ResizablePanelGroup` | split view | User-resizable adjacent work areas |
| `ScrollArea` | custom scroll container | Controlled scrolling inside constrained content |
| `DragAndDrop` | sortable list | Reordering and prioritization |
| `Calendar` | calendar primitive | Calendar composition inside date workflows |

Read the category guideline that matches the component before using it.
