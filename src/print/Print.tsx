import { Button, Card, ListGroup } from "react-bootstrap";
import { Objects_objects_data } from "../graphql/__generated__/Objects";

export function Print(props: { print: Objects_objects_data }) {
  const { print } = props;
  return (
    <Card style={{ width: "38rem" }}>
      <Card.Img
        variant="top"
        src={print.primaryImageUrl ?? "holder.js/100px180"}
      />
      <Card.Body>
        <Card.Title>{print.title}</Card.Title>
        <ListGroup variant="flush">
          <ListGroup.Item>{print.technique}</ListGroup.Item>
          <ListGroup.Item>{print.division}</ListGroup.Item>
          <ListGroup.Item>Rank: {print.rank}</ListGroup.Item>
          <ListGroup.Item>
            Verification: {print.verificationLevelDescription}
          </ListGroup.Item>
          <Button variant="primary" target="_blank" href={print.url}>
            View
          </Button>
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          Creation began since {print.dateBegin}
        </small>
      </Card.Footer>
    </Card>
  );
}
