# Sezzle Calculator

## About / Synopsis

You can view the deployed application at:
https://secure-brushlands-51526.herokuapp.com

- JavaScript calculator
- API's written in Node / Express
- Expression history persists with MongoDB
- Connected users are updated on expression history in real time with Socket.io

## Table of contents

> - [Sezzle Calculator](#sezzle-calculator)
>   - [About / Synopsis](#about--synopsis)
>   - [Table of contents](#table-of-contents)
>   - [Installation](#installation)
>   - [Code](#code)
>     - [Tech Stack](#tech-stack)
>     - [TODO / Things That Would Make The App Better](#todo--things-that-would-make-the-app-better)
>     - [Deploy](#deploy)
>   - [Resources (Documentation and other links)](#resources-documentation-and-other-links)
>   - [Contributing / Reporting issues](#contributing--reporting-issues)
>   - [License](#license)

## Installation

Installation requires NodeJS and Node Package Manager.

Clone repository and install dependencies:

```bash

git clone https://github.com/PFurtak/sezzle-calc.git

npm i

```

After installing dependencies, you will need to create a file name default.json in the config directory:

```bash

cd config
touch default.json

```

In this file, you will need to create a json object with your own MongoDB URI:

```JavaScript

{
    "mongoURI": "[YOUR OWN MONGO URI]"
}

```

The steps above will connect the app to your own instance to of MongoDB.

## Code

### Tech Stack

- JavaScript
- Node
- Express
- MongoDB
- SocketIO
- HTML & CSS

### TODO / Things That Would Make The App Better

- Media Queries on calculator grid sizes. For the most part the app is mobile friendly, but smaller phones do require some lateral scrolling.

- Remove JQuery and update client socketIO code. This was my first time working with SocketIO, so I adapted the documentation to get a working result. If I had more time, I would local install the socketIO client library, and refactor the socket scripts out of the HTML script tag. The socket emit should also occur at computation, rather than on click of the equals button. I would also opt to use plain JavaScript rather than JQuery.

- Break up the functions getHistoryAndRender and marshallAndSend:

```javascript

getHistoryAndRender() {
    fetch('/api/history')
      .then((res) => res.json())
      .then((data) => this.renderHistory(data));
  }

  renderHistory(data) {
    this.expressionTextElement.innerHTML = '';
    data.map((element) => {
      this.expressionTextElement.innerHTML += `<li>${element.expression}</li>`;
    });
  }

marshallAndSend(prev, op, current, computation) {
    let expression = {
      expression: `${prev.toString()} ${op.toString()} ${current.toString()} = ${computation.toString()}`,
    };
    expression = JSON.stringify(expression);
    window.fetch('/api/history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: expression,
    });
  }
```

We could gain much better testability, scalability, and more efficient code re-use by making these functions do one thing and do it well.

### Deploy

This application is deployed on Heroku following their official documentation, which you can find here:
https://devcenter.heroku.com/articles/deploying-nodejs

## Resources (Documentation and other links)

- Node: https://nodejs.org/en/docs/
- Express: https://expressjs.com
- MongoDB: https://docs.mongodb.com
- Mongoose: https://mongoosejs.com
- SocketIO: https://socket.io/docs/
- Heroku Deployment: https://devcenter.heroku.com/articles/deploying-nodejs

## Contributing / Reporting issues

Feel free to comment, report, and make suggestions on the GitHub issue board.

Please send your Pull-Requests to the Dev branch.

## License

### MIT

Copyright (c) 2020 Patrick Furtak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
