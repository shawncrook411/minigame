var fetchSnake = async function(height, width) {
  const object = { height: height, width: width };
  const data = await fetch(`/snake/newSnake`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
  });

  const snake = await data.json();
  return snake;
};

var fetchApple = async function(snake) {
  const data = await fetch("/api/snake/newApple", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(snake),
  });

  const apple = await data.json();
  return apple;
};

var sendResult = async function(score) {
  const data = await fetch("/api/snake/record", {
    method: "PUT",
    body: JSON.stringify({
      snake_score: score,
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
