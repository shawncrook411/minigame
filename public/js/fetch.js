var fetchSnake = async function(height, width) {

    const object = { height: height, width: width}
    const data = await fetch(`/snake/newSnake`,
    {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    })

    const snake = await data.json()
    return snake
}
