# Publish–Subscribe Data Delivery API v0.1.0

The api provides you a fast access to your data api. The api aspects queries in the [JMESPath Specification](http://jmespath.org/specification.html).

## Data Delivery

Fetches data from api and queries JSON response with jmespath query (Uses cache first, then send update message).

#### publish: /data-delivery/:id
Message payload:
```go
{
    "channel": "/data-delivery/a1aMczof",
    "data": {
        "url": "https://api.example.com/data",
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
```go
{
    "channel": "/forwarding/a1aMczof",
    "data": {
        "url": "https://api.example.com/data"
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
