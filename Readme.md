# Viaplay

 Trailer Service.
   This service accepts a movie url input and relies on a third party service (https://www.themoviedb.org/) to provide the Youtube link to a movie trailer.

## Running the project
To run the project, I've included the "build" folder containing the compiled code and it can be run using the command below

```bash
npm run start
```

It is also important to start the "Redis/redis-server.exe" file. 
Though optional(as the code will work with or without the redis server started), it is advisable to have it running. 

This would help improve the response time as the service caches responses from the third party api service.

## Notes
To ensure the project is easy to get started with, I have left the ".env" file as part of the project files. 
The file would naturally be git ignored if this was a production ready app

