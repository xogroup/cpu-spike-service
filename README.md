# cpu-spike-service
A web server to help stress cpu.

Lead Maintainer: [Lam Chan](https://github.com/lamchakchan)

## Installation

Or using Docker
```
docker pull xogroup/cpu-spike-service
```

## Usage

```
helm-chart-publisher
```

Or using Docker
```
docker run -d -p 8080:8080 xogroup/cpu-spike-service
```

## Documentation

### API

* `/set-cpu` - end point for setting the desired cpu spikes
  * `cpu` - query parameter accepting a number value of `0-100`

