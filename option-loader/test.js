fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(json => json.map(x => x.name))
  .then(data => $('.test').optionLoader('load', {
    data: data,
  }))
  .then(() => setTimeout(() => $('.test').optionLoader('remove', {
    keepFirst: false
  }), 5000));