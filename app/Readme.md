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

- Criar dois services para cada feature a ser praticada 


## Weight

- Criar `Dockerfile` para os serviços

    - Dockerfile

    ```yaml
    FROM nginx:latest
    COPY ./index.html /usr/share/nginx/html/index.html
    ```
- Criar 2 index.html para exibição de uma msg na tela, um para cada serviço

    - Service A

    ```bash
    cd weight/service-a
    echo "Service A" >> index.html
    ```
    - Service B

    ```bash
    cd weight/service-b
    echo "Service B" >> index.html
    ```

- Buildar duas imagens com versões diferentes uma da outra

    - Service A

    ```bash
    cd weight/service-a
    docker build -t leoviana00/nginx-web-server:a .
    ```

    - Service B

    ```bash
    cd weight/service-a 
    docker build -t leoviana00/nginx-web-server:b .
    ```

- Fazer um push da imagem para o registry
 
    - Logar no docker hub
    ```bash
    docker login
    ```
    - Push image
    ```bash
    docker push leoviana00/nginx-web-server:a
    docker push leoviana00/nginx-web-server:b
    ```

## Loadbalancer

- Criar `Dockerfile` para os serviços

    - Dockerfile

    ```yaml
    FROM nginx:latest
    COPY ./index.html /usr/share/nginx/html/index.html
    COPY ./nginx.conf /etc/nginx/conf.d/default.conf
    ```
- Criar 2 index.html para exibição de uma msg na tela, um para cada serviço

    - Service A

    ```bash
    cd loadbalancer/service-a
    echo "<h1>Service A: loadbalancer</h1>" >> index.html
    ```
    - Service B

    ```bash
    cd loadbalancer/service-b
    echo "<h1>Service B: loadbalancer</h1>" >> index.html
    ```

- Criar nginx.conf com o path `/lb`

    - nginx.conf

    ```bash
    server {
      listen 80;

      location /lb {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html =404;
      }

      include /etc/nginx/extra-conf.d/*.conf;
    }
    ```

- Buildar duas imagens com versões diferentes uma da outra

    - Service A

    ```bash
    cd loadbalancer/service-a
    docker build -t leoviana00/nginx-loadbalancer-service:a .
    ```

    - Service B

    ```bash
    cd loadbalancer/service-a 
    docker build -t leoviana00/nginx-loadbalancer-service:b .
    ```

- Fazer um push da imagem para o registry
 
    - Logar no docker hub
    ```bash
    docker login
    ```
    - Push image
    ```bash
    docker push leoviana00/nginx-loadbalancer-service:a
    docker push leoviana00/nginx-loadbalancer-service:b
    ```

## Consistent Hash

- Criar `Dockerfile` para os serviços

    - Dockerfile

    ```yaml
    FROM nginx:latest
    COPY ./index.html /usr/share/nginx/html/index.html
    COPY ./nginx.conf /etc/nginx/conf.d/default.conf
    ```
- Criar 2 index.html para exibição de uma msg na tela, um para cada serviço

    - Service A

    ```bash
    cd consistent-hash/service-a
    echo "<h1>Service A</h1>" >> index.html
    ```
    - Service B

    ```bash
    cd consistent-hash/service-b
    echo "<h1>Service B</h1>" >> index.html
    ```

- Criar nginx.conf com o path `/hash`

    - nginx.conf

    ```bash
    server {
      listen 80;

      location /hash {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html =404;
      }

      include /etc/nginx/extra-conf.d/*.conf;
    }
    ```

- Buildar duas imagens com versões diferentes uma da outra

    - Service A

    ```bash
    cd consistent-hash/service-a
    docker build -t leoviana00/nginx-hash-service:a .
    ```

    - Service B

    ```bash
    cd consistent-hash/service-b
    docker build -t leoviana00/nginx-hash-service:b .
    ```

- Fazer um push da imagem para o registry
 
    - Logar no docker hub
    ```bash
    docker login
    ```
    - Push image
    ```bash
    docker push leoviana00/nginx-hash-service:a
    docker push leoviana00/nginx-hash-service:b
    ```

## Fault Injection

- Criar `Dockerfile` para os serviços

    - Dockerfile

    ```yaml
    FROM nginx:latest
    COPY ./index.html /usr/share/nginx/html/index.html
    COPY ./nginx.conf /etc/nginx/conf.d/default.conf
    ```
- Criar 2 index.html para exibição de uma msg na tela, um para cada serviço

    - Service A

    ```bash
    cd fault-injection/service-a
    echo "Service A: Fault Injection" >> index.html
    ```
    - Service B

    ```bash
    cd fault-injection/service-b
    echo "Service B: Fault Injection" >> index.html
    ```

- Criar nginx.conf com o path `/injection`

    - nginx.conf

    ```bash
    server {
      listen 80;

      location /injection {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html =404;
      }

      include /etc/nginx/extra-conf.d/*.conf;
    }
    ```

- Buildar duas imagens com versões diferentes uma da outra

    - Service A

    ```bash
    cd fault-injection/service-a
    docker build -t leoviana00/nginx-fault-injection-service:a .
    ```

    - Service B

    ```bash
    cd fault-injection/service-b
    docker build -t leoviana00/nginx-fault-injection-service:b .
    ```

- Fazer um push da imagem para o registry
 
    - Logar no docker hub
    ```bash
    docker login
    ```
    - Push image
    ```bash
    docker push leoviana00/nginx-fault-injection-service:a
    docker push leoviana00/nginx-fault-injection-service:b
    ```
