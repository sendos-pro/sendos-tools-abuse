# sendos-tools-abusenet

```
npm i sendos-tools-abusenet
```

## Usage

``` js
var abusenet = require('sendos-tools-abusenet');

var opts = {
  timeout: 10000,
  server: "127.0.0.1",
  port: 10053,
};

abusenet.lookup('yandex.ru', opts)
.then(result => console.log(result))
.catch(err => console.log(err));
```