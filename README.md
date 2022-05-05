# Hello Jenkins, Istio, K8s

I will be soon starting on a role where they run Jenkins inside K8s and use
Istio, so I decided to throw together a little project to play around with
things. Each directory contains dedicated and detailed readmes you can dig
into.

## Install

Start by creating a Minikube cluster that is large enough to accommodate all of
the components (both Istio and Jenkins are resource hungry):

```sh
minikube start --memory 8192 --cpus 6
```

Follow the readme in the `istio/` folder to set up Istio.
Follow the readme in the `jenkins/` folder to set up Jenkins.
Create Jobs for `green-machine` and `blue-machine`.
Run the pipelines.

## Key takeaways

- Both Jenkins and Istio are resource hungry, if you don't allocate enough
  resources (roughly 8Gb of ram and 6 cpus) it will crash you Mac. I suspect
  playing with this on Linux would be far more forgiving.
- When handling Jenkins RBAC it's important to understand how Helm v3 operates
  in order to grant the correct access. There are some gotchas around how
  secrets are used to lock operations.
- Because the containers are built inside the cluster, Helm's image pull policy
  needs to be set to `Never`. This one had me scratch my head for a while.
- Don't use `npm` to run your `node` server, there's more context in the
  dedicated readme but long story short: it don't work.
