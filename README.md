# URL Shortener

URL shortener service built with NestJS and MongoDB.

## Quick Start

```bash
# Start MongoDB
docker-compose up -d

# Install dependencies
yarn install

# Setup the environment variables
cp .env-example .env

# Run development server
yarn run start:dev
```

## API Endpoints

### Authentication

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | `/auth/signup` | Register new user |
| POST   | `/auth/signin` | Login             |

### URL Management

| Method | Endpoint | Description              |
| ------ | -------- | ------------------------ |
| POST   | `/urls`  | Create short URL         |
| GET    | `/:hash` | Redirect to original URL |
| GET    | `/urls`  | Get user's URLs          |

### Analytics

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| GET    | `/metrics/statistics` | Get all statistics      |
| GET    | `/metrics/browsers`   | Get browser statistics  |
| GET    | `/metrics/os`         | Get OS statistics       |
| GET    | `/metrics/countries`  | Get country statistics  |
| GET    | `/metrics/regions`    | Get region statistics   |
| GET    | `/metrics/cities`     | Get city statistics     |
| GET    | `/metrics/timezones`  | Get timezone statistics |
| GET    | `/metrics/ips`        | Get IP statistics       |
| GET    | `/metrics/usages`     | Get usage count per URL |

## Architecture

- **Modules**: `auth`, `urls-handle`, `user-analytics`
- **Database**: MongoDB with Mongoose ODM
- **Metrics**: Stored in separate `url_metrics` collection with aggregation pipeline
