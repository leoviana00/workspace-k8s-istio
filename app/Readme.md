<h1 align="center">Docker - Nginx </h1>

<p align="center">
  <a href="#serviços">Serviços</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#dockerfile">Dockerfile</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#build">Build</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#push">Push</a>
</p>

<p align="center">
  <img alt="k8s" src="../images/docker-nginx.png">
</p>


## Serviços

- Criar dois services para utilizar nos testes

## Dockerfile

- Criar `Dockerfile` para os serviços

    - Dockerfile

    ```yaml
    FROM nginx:latest
    COPY ./index.html /usr/share/nginx/html/index.html
    ```
- Criar 2 index.html para exibição de uma msg na tela, um para cada serviço

    - Service A

    ```bash
    cd service a
    echo "Service A" >> index.html
    ```
    - Service B

    ```bash
    cd service b
    echo "Service B" >> index.html
    ```

## Build

- Buildar duas imagens com versões diferentes uma da outra

    - Service A

    ```bash
    cd service-a
    docker build -t leoviana00/nginx-web-server:a
    ```

    - Service B

    ```bash
    cd service-b
    docker build -t leoviana00/nginx-web-server:b
    ```

## Push

- Adicionar a um repositório de imagens
 
    - Logar no docker hub
    ```bash
    docker login
    ```
    - Push image
    ```bash
    docker push leoviana00/nginx-web-server:a
    docker push leoviana00/nginx-web-server:b
    ```