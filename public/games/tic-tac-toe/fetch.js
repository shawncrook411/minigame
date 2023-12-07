var fetchPlacement = async function(game) {
    const data = await fetch('/api/tic-tac-toe/placement',
    {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(game)
    })

    const placement = await data.json()
    return placement
}