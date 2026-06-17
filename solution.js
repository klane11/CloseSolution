const { Fragment, useState, useCallback, memo } = React;

// Implement a feature to allow item selection with the following requirements:
// 1. Clicking an item selects/unselects it.
// 2. Multiple items can be selected at a time.
// 3. Make sure to avoid unnecessary re-renders of each list item in the big list (performance).
// 4. Currently selected items should be visually highlighted.
// 5. Currently selected items' names should be shown at the top of the page.

const ListItem = memo(({ name, color, isSelected, onToggle }) => {
  const className = ['List__item', `List__item--${color}`, isSelected && 'List__item--selected']
    .filter(Boolean)
    .join(' ');

  return (
    <li
      data-name={name}
      onClick={(e) => onToggle(e.currentTarget.dataset.name)}
      className={className}
      role="option"
      aria-selected={isSelected}
    >
      {name}
    </li>
  );
});

const SelectedBadge = ({ name, color, onRemove }) => (
  <span className={`Badge List__item--${color}`}>
    {name}
    <button
      className="Badge__remove"
      onClick={() => onRemove(name)}
      aria-label={`Deselect ${name}`}
    >
      ×
    </button>
  </span>
);

const SelectedItems = ({ selected, selectedItems, onRemove, onClear }) => (
  <div className="List__selected" aria-live="polite">
    {selected.size > 0 && (
      <Fragment>
        <div className="List__selected-header">
          <span className="List__selected-count">{selected.size} selected</span>
          <button className="List__clear" onClick={onClear}>Clear all</button>
        </div>
        <div className="List__badges">
          {selectedItems.map(item => (
            <SelectedBadge
              key={item.name}
              name={item.name}
              color={item.color}
              onRemove={onRemove}
            />
          ))}
        </div>
      </Fragment>
    )}
  </div>
);

const List = ({ items }) => {
  const [selected, setSelected] = useState(() => new Set());

  const handleToggle = useCallback((name) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  }, []);

  const handleClear = useCallback(() => {
    setSelected(new Set());
  }, []);

  const selectedItems = items.filter(item => selected.has(item.name));

  return (
    <Fragment>
      <SelectedItems
        selected={selected}
        selectedItems={selectedItems}
        onRemove={handleToggle}
        onClear={handleClear}
      />
      <ul
        className="List"
        role="listbox"
        aria-multiselectable="true"
        aria-label="Selectable items"
      >
        {items.map(item => (
          <ListItem
            key={item.name}
            name={item.name}
            color={item.color}
            isSelected={selected.has(item.name)}
            onToggle={handleToggle}
          />
        ))}
      </ul>
    </Fragment>
  );
};

// ---------------------------------------
// Do NOT change anything below this line.
// ---------------------------------------

const sizes = ['tiny', 'small', 'medium', 'large', 'huge'];
const colors = ['navy', 'blue', 'aqua', 'teal', 'olive', 'green', 'lime', 'yellow', 'orange', 'red', 'maroon', 'fuchsia', 'purple', 'silver', 'gray', 'black'];
const fruits = ['apple', 'banana', 'watermelon', 'orange', 'peach', 'tangerine', 'pear', 'kiwi', 'mango', 'pineapple'];

const items = sizes.reduce(
  (items, size) => [
    ...items,
    ...fruits.reduce(
      (acc, fruit) => [
        ...acc,
        ...colors.reduce(
          (acc, color) => [
            ...acc,
            {
              name: `${size} ${color} ${fruit}`,
              color,
            },
          ],
          [],
        ),
      ],
      [],
    ),
  ],
  [],
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <List items={items}/>,
);
