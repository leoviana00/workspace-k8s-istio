## Istio

- Conceitos básicos: 
    - Gateway
    - Virtual Service
    - Destination Rules
- Criação de versões de deployments
- Criação de Virtual Service e Destionation Rule
- Tipos de Load Balancer
- Fault Injection
- Circuit Braker

## Instalação

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

## Gerenciamento de Tráfego

<p align="center">
  <img alt="Istio" src="../images/trafego-istio.png">
</p>

- Acompanhamento do tráfego através da dashboard no `Kiali`

<p align="center">
    <img style="max-width:800px;" src="https://cdn.loom.com/sessions/thumbnails/4210ac7557d94679ae653a99fd8e2a8c-with-play.gif">
</p>

## Balanceador

- ROUND_ROBIN (Padrão)
- LEAST_CONN
- RANDON

# STICK SESSION e CONSISTENT HASH
