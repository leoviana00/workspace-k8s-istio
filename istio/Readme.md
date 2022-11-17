## Istio

- istio.io

## Passos

- Download Istio
- Instalação do Istio
- Configuration Profile
- Dashboard visualização

- [Documentação Instalação do Istio](https://istio.io/latest/docs/setup/getting-started/)
- [Addons Instio](https://istio.io/latest/docs/ops/integrations/)

## Entendendo componentes básicos do istio

1. Gateway
    - Ingress Gateway
    - Egress Gateway

2. Virtual Service
    - Match - Roteamento de tráfego
    - Subsets
    - Fault Injection
    - Retries
    - Timeout

3. Destination Rules
    - Selector
    - Tipo de Loadbalancer
    - Locality
    - Circuit Break

## Tráfego

<p align="center">
  <img alt="Istio" src="../images/trafego-istio.png">
</p>

- Acompanhando o envio de tráfego atrvés do Kiali

<a href="https://www.loom.com/share/4210ac7557d94679ae653a99fd8e2a8c">
    <p>Tráfego Istio - Watch Video</p>
    <img style="max-width:800px;" src="https://cdn.loom.com/sessions/thumbnails/4210ac7557d94679ae653a99fd8e2a8c-with-play.gif">
</a>

## Balanceador

- ROUND_ROBIN (Padrão)
- LEAST_CONN
- RANDON

# STICK SESSION e CONSISTENT HASH
