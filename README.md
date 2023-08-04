## Coffee Delivery

Welcome to the "Delivery Coffee" app! This is a convenient application for buying and ordering coffee, which provides a wide selection of drinks. The application is developed using modern technologies such as **NextJS 13.4**, **TypeScript**, **Tailwind**, **Firebase** (Google Auth) and **Axios** to provide the best user experience. The hook was used to manage the application and its state **useContext**.
**Local-Storage** is used to store user data. The data is pre-encrypted using **crypto-js** to avoid stealing the user's identity.


## Application functionality
- **Authorization** - Users can sign in to the app with a Google account.
- **View** **and select coffee** - Users can view a list of available coffee drinks. For each drink, its name, description and price are displayed.
- **Checkout** - Users can add selected drinks to the shopping cart. The basket displays the total cost of the order and a list of selected drinks.
- **Location** **definition** - The app determines the user's location to provide an accurate shipping address.
- **Order** **payment** - Users can choose a convenient payment method for the order. After successful payment, the order is considered confirmed and transferred to processing.


![Screenshot from 2023-08-04 16-11-04](https://github.com/deceser/delivery-coffee-next-ts/assets/101974867/013d976a-0007-439c-b9fe-7162dfe84413)


## Deploy-server-api
A fake jason-server-api server was created as a server and deployed to hosting versel.
**https://vercel-api-lovat-omega.vercel.app/**

## Run project locally
- Git clone SSH or HTTPS
- Open project in IDE
- Run command in terminal **npm install**
- Open browser **http://localhost:3000/**


**Happy Development**

