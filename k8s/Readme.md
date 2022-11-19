<h1 align="center">Kubernetes </h1>

<p align="center">
  <img alt="k8s" src="../images/k8s-lens.jpg">
</p>

## Configurações

- Configurações iniciais do cluster
  1. [ Acessar VM - Master](/vagrant/Readme.md)
  2. Configurar o `kubectl`

    ```bash
    mkdir -p $HOME/.kube
    sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
    sudo chown $(id -u):$(id -g) $HOME/.kube/config
    ```
- Dashboard com lens
  1. [ Acessar VM - Master](/vagrant/Readme.md)
  2. Copiar o admin.conf

    ```bash
    sudo cat /etc/kubernetes/admin.conf
    ```
  3. [Ter o lens instalado](https://k8slens.dev/)
  4. Copiar o arquivo admin.conf para o lens

## Deployments file

  - weight
    - Aplicando regras de prioridade de requisição utilizando `vs` e `dr`
  - loadbalancer
    - Aplicando regras de traffic policy - `loadbalancer` na `dr` e `subsets`

