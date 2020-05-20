# Publish–Subscribe Data Delivery API v0.1.6

The api provides you a fast access to your data api. The api aspects queries in the [JMESPath Specification](http://jmespath.org/specification.html).

## Error Handling

If an error occures, the api will close the connection with a close code. You can find a documentation of the websocket close codes [here](https://github.com/Luka967/websocket-close-codes).


## Data Sources

Serves data by the given data source id. The data gets queried by the defined jmespath query in the data source entity (Uses cache first, then send update message).

#### publish: /data-sources/:id
Message payload:
```jsx
{
    "channel": "/data-sources/a1aMczof"
}
```

#### subscribe: /data-sources/:id
Message payload:
```jsx
{
    "channel": "/data-sources/a1aMczof",
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
