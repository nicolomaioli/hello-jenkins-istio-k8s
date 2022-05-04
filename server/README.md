# Server

This is a fairly straightforward `Express` server that prints out a color and
nothing else.

# Gotchas

Shockingly I ran into a sizeable gotcha. I was originally attempting to use:

```
CMD ["npm", "start"]
```

to run the container, which turned into a whole can of worms. Digging into the
issue I found out that `npm` (and apparently `yarn`) source environments in an
unexpected way. The better solution (as recommended by the official [Best
Practices](https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md#cmd))
is to use:

```
CMD ["node", "index.js"]
```

for a number of reasons including gracious handling of kernel signals, secrets
injection, and reducing the image size by removing the package manager after
packages have been installed.
