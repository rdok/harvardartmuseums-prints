import { useQuery } from "@apollo/client";
import {
  Classification,
  SortByFields,
  SortOrder,
  VerificationLevel,
} from "../graphql/__generated__/globalTypes";

import {
  Objects,
  Objects_objects_data,
  ObjectsVariables,
} from "../graphql/__generated__/Objects";
import { TOP_PRINTS } from "../graphql/TOP_PRINTS";
import { Print } from "./Print";
import { CardGroup, Row } from "react-bootstrap";
import { BasicPagination } from "../BasicPagination";
import { useSearchParams } from "react-router-dom";

export function TopPrints() {
  const [searchParams] = useSearchParams();
  const pageNumber = Number(searchParams.get("currentPage")) ?? 1;
  const pageSize = 10;

  const { loading, error, data } = useQuery<Objects, ObjectsVariables>(
    TOP_PRINTS,
    {
      variables: {
        input: {
          pageNumber,
          pageSize,
          orderBy: {
            sortBy: SortByFields["RANK"],
            sortOrder: SortOrder.DESC,
          },
          filter: {
            hasImage: true,
            classification: Classification.PRINTS,
            verificationLevel: VerificationLevel.BEST,
          },
        },
      },
    }
  );

  if (loading) return <>Loading...</>;
  if (error) return <>Error: {error}</>;
  if (!data || !data.objects) return <></>;

  const prints = data.objects.data ?? [];
  const pagination = data.objects;
  const totalPages = Math.floor(pagination.totalPages / pageSize);

  return (
    <>
      <BasicPagination
        active={pagination.currentPage}
        totalPages={totalPages}
      />
      <CardGroup>
        <Row xs={1} md={2} className="g-4">
          {prints.map((print: Objects_objects_data) => (
            <Print key={print.id} print={print} />
          ))}
        </Row>
      </CardGroup>
    </>
  );
}
