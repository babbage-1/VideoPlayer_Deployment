# VideoPlayer Deployment

## Related Projects
- https://github.com/MovieOke_BackEnd/VideoPlayer_Module.git
- https://github.com/MovieOke_BackEnd/MainInfo_Module.git
- https://github.com/MovieOke_BackEnd/CastCrew_Module.git
- https://github.com/MovieOke_BackEnd/VideoPlayer_Proxy.git
- https://github.com/MovieOke_BackEnd/MainInfo_Proxy.git
- https://github.com/MovieOke_BackEnd/CastCrew_Proxy.git

## Requirements
  - PostgreSQL should be installed and running on your machine
  - Node 6.13.0

## Installing Dependencies
  From within the root directory:
  - npm install -g webpack
  - npm install
  - npm run build
  - npm run start

## CRUD API Routes
- READ video data and associated video data: /videos/:id
  - Example Response Body:[{id:1, name:'non et', url: 'https://www.youtube.com/watch?v=woGW-H770j4'}, {id:54420, name:'mollitia sint', url: 'https://www.youtube.com/watch?v=ttOcHmRxmQ8'}, {id:2179966, name:'tempora debitis', url: 'https://www.youtube.com/watch?v=wKvOud9GcRQ'}]

- CREATE video data to database: /videos/add
  - Example Request Body: {id:10000001, name:'new movie', url: 'https://www.youtube.com/watch?v=wKvOud9GcRQ'}

- UPDATE movie name and url in database: /videos/update
  - Example Request Body: {id:1, name:'updated movie', url: 'https://www.youtube.com/watch?v=woGW-H770j4'}

- DELETE association from database: /videos/delete
  - Example Request Body: {id: 1, associatedId: 54420}

