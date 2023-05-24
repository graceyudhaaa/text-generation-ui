## requirement
- Python>=3.8

## How to run
- Make a virtual environment for the package using the command
    ```python -m venv .venv```
- activate the virtual environment

    for windows:
        ``` .\.venv\Scripts\activate```

    for MacOS/linux
        ```source myvenv/bin/activate```

- install the required library in the `requirements.txt`
    ```pip install -r requirements.txt```

- run the server using waitress
    ```waitress-serve --host 127.0.0.1 --port 5000 --call app.app:create_app```