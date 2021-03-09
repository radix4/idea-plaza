import Card from 'react-bootstrap/Card'

export default function listProject() {
  const ListItems = () => {
    //   placeholder to print out project ideas etc.
    const numbers = [1, 2, 3, 4, 5].map((number) => (
      <div>
        <Card style={{ fontSize: '15px' }}>
          <Card.Header>Title of the Project</Card.Header>
          <Card.Body>
            <Card.Text>
              With supporting text below as a natural lead-in to additional
              content.
            </Card.Text>
          </Card.Body>
          <br />
        </Card>
        <br />
      </div>
    ))
    return <div>{numbers}</div>
  }
  return (
    <div>
      <ListItems />
    </div>
  )
}
