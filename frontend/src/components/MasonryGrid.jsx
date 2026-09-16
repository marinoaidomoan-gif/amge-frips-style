export default function MasonryGrid({ children, columns = 'columns-1 sm:columns-2 lg:columns-3' }) {
  return <div className={`${columns} gap-5`}>{children}</div>;
}