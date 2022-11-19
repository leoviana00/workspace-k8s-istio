<h1 align="center">Kubernetes </h1>

<p align="center">
  <img alt="k8s" src="../images/k8s-lens.jpg">
</p>

## Configurações

1. Configurações iniciais do cluster
  - [ Acessar VM - Master](/vagrant/Readme.md)
  - Configurar o `kubectl`

    ```bash
    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    ```
2. Dashboard com lens
  - [ Acessar VM - Master](/vagrant/Readme.md)
  - Copiar o admin.conf

    ```bash
    sudo cat /etc/kubernetes/admin.conf
    ```
  - [Ter o lens instalado](https://k8slens.dev/)
  - Copiar o arquivo admin.conf para o lens

## Deployments file

1. weight
    - Aplicando regras de prioridade de requisição utilizando `vs` e `dr`
    
2. loadbalancer
    - Aplicando regras de traffic policy - `loadbalancer` na `dr` e `subsets`

