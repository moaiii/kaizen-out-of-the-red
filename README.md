### Out of the Red

# Run
`npm i`

`npm start`

# Deploy
`npm run build`

Your build files will be placed in `./build` 

Feel free to throw the `manifest.json` and `service-worker.js` files as they are not needed. 

# Application

Its a React/ Redux app. 
- All of the Redux functionality is in the `./db` folder as is the data set. 
- UI is responsible for firing actions and listening to store changes only. 
- Ive tried for the most part to keep the entire apps state in the store. 
- The console should give you good logs so you can see what actions are firing and how its changing the state. 
- Middleware is used to process action payloads or doing some currency logic before setting values in the reducer/store.

I didnt know id be handing it over so appologies if some bits of the JS is a bit of a brain fart. 

# Flow
This was built with my own cookie-cutter application so there is pieces of Flow type in different files. 
You can just ignore these as babel will strip them out when building. 

That said you might want to install the Flow plugin in your IDE to avoid red squigly lines annoying you. 

I use [this one](https://marketplace.visualstudio.com/items?itemName=flowtype.flow-for-vscode)
