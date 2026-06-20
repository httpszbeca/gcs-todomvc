import React from 'react';

const FooterStats = ({ count, completedCount }) => {
  const activeCount = count - completedCount;
  const itemWord = activeCount === 1 ? 'item' : 'items';

  return (
    <span className="todo-count">
      <strong>{activeCount}</strong> {itemWord} left
    </span>
  );
};

export default FooterStats;