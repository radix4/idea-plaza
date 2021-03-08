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
      <link
        rel='stylesheet'
        href='https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css'
        integrity='sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T'
        crossorigin='anonymous'
      />

      <ListItems />
    </div>
  )
}
