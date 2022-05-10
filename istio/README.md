# Istio

## Install

Note that this will also install Istio Ingress Gateway.

```sh
brew install istioctl
istioctl install
kubectl apply -f namespace.yaml
kubectl apply -f gateway.yaml
```

## Gotchas

- In Minikube you must open a tunnel to communicate with the ingress gateway.
  This is done by running `minikube tunnel` (requires sudo privileges).
- Istio injection needs to be enable in the namespace you are deploying the
  Gateway to.
- The Gateway may be deployed to a different namespace then the service is
  running in, but you need to modify the Gateway name when referencing it. See
  [this
  article](https://fabianlee.org/2021/04/09/kubernetes-istio-gateway-in-a-different-namespace-than-virtualservice/).
- Just like with Nginx ingress, uri matching needs to be rewritten, else the
  original route is forwarded to the application. Here's an example of prefix
  matching:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: nginx-1
  namespace: dev
spec:
  hosts:
  - "*"
  gateways:
  - application-gateway
  http:
  - match:
    - uri:
        prefix: /nginx
    rewrite:
      uri: /
    route:
    - destination:
        host: nginx
        port:
          number: 80
```
