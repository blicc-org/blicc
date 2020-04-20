# Publish–Subscribe Data Delivery API v0.1.5

The api provides you a fast access to your data api. The api aspects queries in the [JMESPath Specification](http://jmespath.org/specification.html).

## Error Handling

If an error occures, the api will return a json object with the channel and an error object containing a status code and a message. You can find a documentation of the websocket close codes [here](https://github.com/Luka967/websocket-close-codes).

```jsx
{
    "channel": "/data-delivery/3rE8d3ef",
    "error": {
        "status": 1011,
        "message": "Error message"
    }
}
```

## Data Delivery

Fetches data from api and queries JSON response with jmespath query (Uses cache first, then send update message).

#### publish: /data-delivery/:id
Message payload:
```jsx
{
    "channel": "/data-delivery/a1aMczof",
    "data": {
        "request": {
            "url": "https://api.example.com/data",
            "headers": [{ "key": "", "value": "" }],
        },
        "interval": 86400000,
        "query": "{ labels: ['Category 1', 'Category 2'], datasets: [{label: 'Value', data: [].someValue}]}"
    }
}
```

#### subscribe: /data-delivery/:id
Message payload:
```jsx
{
    "channel": "/data-delivery/a1aMczof",
    "data": {
        "labels": [
            "Category 1",
            "Category 2"
        ],
        "datasets": [
            {
                "label": "Value",
                "data": [
                    72.2,
                    68.8
                ]
            }
        ]
    }
}
```

## Forwarding

Forwards api request to prevent CORS issues.

#### publish: /forwarding/:id
Message payload:
```jsx
{
    "channel": "/forwarding/a1aMczof",
    "data": {
        "request": {
            "url": "https://api.example.com/data",
            "headers": [{ "key": "", "value": "" }],
        },
    }
}
```

#### subscribe: /forwarding/:id
Message payload:
```jsx
{
    "channel": "/forwarding/a1aMczof",
    "data": {
        "content": "content from api request"
    }
}
```
