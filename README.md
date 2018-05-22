# BeX

BeX is a webapp for students to find and exchange books. It is a college-level app. Self host it for your college.

## Installation

The project is divided into two, frontend (NodeJS) and backend (django) in their respective folders.

* Clone the repo
* From root folder of the cloned repo, run :
    ```
    cd frontend
    npm install
    ```

## Running

Webpack must be ran in background to compile when the source files are changed :

```
cd frontend && node_modules/.bin/webpack --config config/webpack.config.dev.js --watch
```

To run the web server, do :

```
python3 manage.py runserver
```

So two shells must be active for development. When each source file is changed, page must be reloaded to see the changes.
