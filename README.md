This app builded with:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [daisyUI](https://daisyui.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [mongoDB](https://www.mongodb.com/)

And already deployed on [Vercel](https://vercel.com/) - https://sea-cinema-phi.vercel.app/

# About this app

## Features

- Home page: show all movies
- Login page: login with username and password
- Register page: register with full name, username, age, and password
- Movie detail page: show movie detail and show time
- Book ticket: this feature only available for logged in user in detail movie page
- Balance: this feature only available for logged in navbar
- Top up Balance: this feature available in balance menu
- Withdraw Balance: this feature available in balance menu
- My ticket: this feature only available for logged in navbar
- Withdraw ticket: this feature only available for logged in my ticket menu
- Logout: this feature only available for logged in navbar

## Disclaimer

- Not all movies have show time

# Develop this app

## Getting Started with this App

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.js.org/)
- [mongoDB](https://www.mongodb.com/)
- [mongoDB Cluster](https://www.mongodb.com/cloud/atlas)

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/farhan15r/sea-cinema.git
   ```
2. Install NPM packages
   ```sh
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```
3. Copy .env.example to .env
   ```sh
   cp .env.example .env
   ```
4. Fill the .env file with your mongoDB cluster connection string
5. Fill the ACCESS_TOKEN_KEY and REFRESH_TOKEN_KEY with your own secret key
6. Set the ACCESS_TOKEN_AGE and REFRESH_TOKEN_AGE with your own token age

### Fill mongoDB with dummy movie

1. open _src\lib\service\mongo\MoviesService.js_
2. uncomment line 13
3. run the app
4. the dummy movie will be filled after you open the home page (http://localhost:3000), this is running when app getting movies data from API (https://localhost:3000/api/movies)

> **IMPORTANT:** don't forget to comment line 13 again after you filled the database with dummy movie

### Run the app

1. run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Fill mongoDB with dummy movie show time

1. open _src\lib\service\mongo\ShowTimesService.js_
2. go to line 102 you will see dummy function
3. adjust the _movieID_, _date_, and _time_. You can get movieID in url when you open the movie detail page (http://localhost:3000/movie/[movieID])
4. uncomment line 14
5. run the app and open the movie detail page (http://localhost:3000/movie/[movieID])

> **IMPORTANT:** don't forget to comment line 14 again after you filled the database with dummy movie show time

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
