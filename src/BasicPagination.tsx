import { Pagination } from "react-bootstrap";

export function BasicPagination(props: { active: number; totalPages: number }) {
  let { active, totalPages } = props;
  let prevPage = active - 1;
  const minPage = Math.max(active - 3, 1);
  const maxPage = Math.min(minPage + 6, totalPages);
  prevPage = prevPage < 1 ? 1 : prevPage;

  let items = [];
  for (let number = minPage; number <= maxPage; number++) {
    items.push(
      <Pagination.Item
        key={number}
        href={`?currentPage=${number}`}
        active={number === active}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination>
        <Pagination.First href={`?currentPage=1`} key={"first-page"} />
        <Pagination.Prev href={`?currentPage=${prevPage}`} key={prevPage} />
        {items}
        <Pagination.Last href={`?currentPage=${totalPages}`} key={totalPages} />
      </Pagination>
    </div>
  );
}
