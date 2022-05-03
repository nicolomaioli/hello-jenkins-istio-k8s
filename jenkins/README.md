# Jenkins

## Install

```sh
kubectl apply -f namespace.yaml
helm repo add jenkins https://charts.jenkins.io
helm repo update
helm upgrade --install jenkins jenkins/jenkins -f values.yaml --namespace jenkins
kubectl apply -f cluster-role.yaml

# Get the admin password
kubectl exec --namespace jenkins -it svc/jenkins -c jenkins -- /bin/cat /run/secrets/chart-admin-password && echo
# Access Jenkins
kubectl --namespace jenkins port-forward svc/jenkins 8080:8080
```

## Gotchas

Jenkins is resource hungry so ensure that the Minikube cluster is beefy enough:

```sh
minikube start --memory 8192 --cpus 6
```

[This](https://github.com/helm/helm/issues/7139) took a long time to figure
out. Helm creates a secret in the namespace it's deploying to as a lock:
because it didn't have access to the `update` verb, the value of the secret
would stay in `pending-install` and after the first successful pipeline, all
subsequent runs would fail.
