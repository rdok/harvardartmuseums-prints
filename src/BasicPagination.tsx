import { Pagination } from "react-bootstrap";

export function BasicPagination(props: { active: number; totalPages: number }) {
  let { active, totalPages } = props;
  let prevPage = active - 1;
  prevPage = prevPage < 1 ? 1 : prevPage;

  let items = [];
  for (let number = 1; number <= 7; number++) {
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
        <Pagination.First href={`?currentPage=1`} key={1} />
        <Pagination.Prev href={`?currentPage=${prevPage}`} key={prevPage} />
        {items}
        <Pagination.Last href={`?currentPage=${totalPages}`} key={totalPages} />
      </Pagination>
    </div>
  );
}
