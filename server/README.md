# Server

This is a fairly straightforward `Express` server that prints out a color and
nothing else.

## Jenkins and Helm

This repository contains an Helm chart and Jenkins pipeline to deploy the
server to our Minikube cluster. A few problems need to be addressed:

- Create the Jenkins jobs programmatically instead of using the UI.
- The two pipelines (green and blue) should be refactored to share the code and
  use parametrization instead.

## Gotchas

Shockingly I ran into a sizeable gotcha. I was originally attempting to use:

```
CMD ["npm", "start"]
```

Which turned into a whole can of worms:

```
$ docker run -ti server sh
# echo $COLOR
green
# node
Welcome to Node.js v17.9.0.
Type ".help" for more information.
> console.log(process.env)
{
  NODE_VERSION: '17.9.0',
  HOSTNAME: '60989208b4cd',
  YARN_VERSION: '1.22.18',
  PORT: '8080',
  HOME: '/root',
  COLOR: 'green',
  TERM: 'xterm',
  PATH: '/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin',
  PWD: '/usr/src/app'
}
undefined
> console.log(process.env.COLOR)
green
undefined
# node src/index.js
"green-machine" listening on port 8080
# npm start

> service@1.0.0 start
> node src/index.js

"1-machine" listening on port 8080
```

As you can see the value of `$COLOR` turns into `1` when running with `npm
start`.

Digging into the issue I found out that `npm` (and apparently `yarn`) source
environments in an unexpected way. The better solution (as recommended by the
official [Best
Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#cmd))
is to use:

```
CMD ["node", "index.js"]
```

This is for a number of reasons including gracious handling of kernel signals,
secrets injection, and reducing the image size by removing the package manager
after packages have been installed.
