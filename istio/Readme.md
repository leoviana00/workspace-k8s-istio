## Instalação

- [Documentação Instalação do Istio](https://istio.io/latest/docs/setup/getting-started/)
    - Download Istio
    - Instalação do Istio
        - OBS: Adicione um rótulo de namespace para instruir o Istio a injetar automaticamente proxies secundários do Envoy quando você implantar seu aplicativo posteriormente
            ```bash
            kubectl label namespace default istio-injection=enabled
            ```
    - [Configuração de Profiles](https://istio.io/latest/docs/setup/additional-setup/config-profiles/)
        - Exemplo:
            ```bash
            istioctl install --set profile=demo -y
            ```
- [Addons Instio](https://istio.io/latest/docs/ops/integrations/)
    - Dashboard visualização

## Gerenciamento de tráfego com o Istio, ponstos a estudar:

1. Conceitos básicos: 
    - Gateway
    - Virtual Service
    - Destination Rules
2. Criação de versões de deployments
3. Criação de Virtual Service e Destionation Rule
4. Práticas aplicando regras no `vs` e `dr`
    - Pesos de prioridades de requisição entre `subsets`
    - Tipos de Load Balancer
    - Consistent Hash
    - Fault Injection
    - Circuit Braker

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

## Prática 1: Pesos de prioridade nas requisições

- Acompanhamento do tráfego simulando pesos de prioridade nas requisições aos workloads através da dashboard no `Kiali`

<p align="center">
    <img style="max-width:800px;" src="https://cdn.loom.com/sessions/thumbnails/4210ac7557d94679ae653a99fd8e2a8c-with-play.gif">
</p>

## Prática 2: Tipos de Load Balancer

- ROUND_ROBIN (Padrão)
- LEAST_CONN
- RANDON

## Prática 3: Consistent Hash

- Estudar

## Prática 4: Fault Injection

- Estudar

## Prática 5: Circuit Braker

- Estudar