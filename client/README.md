# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

**************************Frontend applolo client for graph ql *******************************************
<!-- documentation appolocalinet   >>> https://www.apollographql.com/docs/react/get-started -->

>>*****) How to react work with client side 
  >>for this firts we need to install react dependecy if folder created than for file use path npx create react app .
  >>we use applo client for use graphql in front

  1)Install npm for this
  >>npm install @apollo/client graphql

  2)fisrt of all import karvu 

  3)aftre tat client valu document mathi lakhavu ema path backend ma apploserver run thay chhe e apvo

  4)che ma in memory cache avse 

  5)pachi queri lakhvi ema oela tamare je name apvu hoy e apine apde je rite lahta hata appolo server ma e tite string ma lakhvi 

  example >> const data= 
  `query getAllTodods{
  getTodos {
    title
    userId
    completed
    user{
      name
      id
    }
  }
  
}`

6)have aa query ma first tamare query pachhi je ame apvu hoy e api sakso pan pachhi tame typedef ma ge function name define karyu e apvu and data define karva

7)>>have query connect kai rite karso 
client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  }) 
>>aa rite client.query thi gql sathe query pass kari sako chho..

8)>>Tamare app ma na karvu hoy connection to fisrt index vali file ma connection krisu appoloproviedr thi
and tyathi clint pass larisu 

9)>>App ma useQuery thi qiery no use karisu
>>gql no use query run karva karisu

10)const {data,loading}=useQuery(query)
>>Ahi tame je query lakho chho eno use karva mate usequery no use karso

11)difference between local and remote data 
>>Remote data means fetch data from graphql server
>>local data >> find data from client side not use server for fetch data
>>in-memory cache >> so using in-memory cache server thi get karela data ne local store kari sakiye chhiye
jethi secondvar e data no use karvo hoy to server call na karvu pade local store mathi mali jay..


12)