## Getting Started

### Routes

* `/clock`: Homepage and shows a clock that caches the time for roughly 30 seconds. Refreshing after that will trigger fetch for new time data.
* `/characters`: Landing page for Marvel characters.
* `/characters/{id}`: Specific page of a Marvel character.

### Prerequisites

To run this application to its full extent, you need a private and public API key for the [Marvel Developer Portal](https://developer.marvel.com/). Copy `.env.dist` and save it as `.env.local`. Open that file and enter the keys in the appropriate fields. After that you are good to go.

### Running Locally

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Running a productive build

First run `npm run build`. This will build the necessary pages. After that you can deploy the build or run it with `npm run start`.