var fetchPlacement = async function(game) {
    const data = await fetch('/api/connect4/placement', 
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

var sendResult = async function(result) {
    const data = await fetch("/api/connect4/record", {
      method: "PUT",
      body: JSON.stringify({
        result: result,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.ok) {
      return;
    } else {
      alert(data.statusText);
    }
  };