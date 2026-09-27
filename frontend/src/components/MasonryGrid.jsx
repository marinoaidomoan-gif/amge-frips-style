export default function MasonryGrid({ children, columns = 3, className = '' }) {
  const columnClass =
    columns === 4
      ? 'columns-2 md:columns-3 xl:columns-4'
      : columns === 2
        ? 'columns-1 sm:columns-2'
        : 'columns-2 md:columns-3';

  return <div className={`${columnClass} gap-5 ${className}`}>{children}</div>;
}