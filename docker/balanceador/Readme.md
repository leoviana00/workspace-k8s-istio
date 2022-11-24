<h1 align="center">Balanceador Haproxy</h1>

<p align="center">
  <a href="#compose">Compose</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#comandos">Comandos</a>
</p>

<p align="center">
  <img alt="Balanceador" src="../../images/haproxy.png">
</p>


## Compose

- Criação de um docker-compose para subir um balanceador haproxy

  ```yaml
  version: "3.6"
  services:
      haproxy:
          image: haproxy
          env_file:
              - ./haproxy/haproxy.env
          volumes:
              - ./haproxy/haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg:ro
              - ./haproxy/abuse.lst:/usr/local/etc/haproxy/abuse.lst:ro
          ports:
              - "80:80"
              - "81:81"
              - "441:441"
              - "6443:6443"
              - "443:443"
              - "8081:8081"
  ```

- Aruivo de variáveis utilizadas

  - haproxy.env
  ```yaml
  #Global
  LOGGER=10.0.2.206

  #Listen Stats
  LISTEN=*
  STATS=enable
  STATSLP=admin:admin
  STATSURI=/stats
  STATSSHOW=Praticando Haproxy
  ABUSERS=/etc/haproxy/abuse.lst

  #Defaults
  TIMEOUT=50s
  
  #Listen Kubernetes-apiserver-https
  SERVER=192.168.50
  PORT_K8S=6443
  PORT_INGRESS_ISTIO=31987
  ```

- Criar arquivo de configuração haproxy
- Ativar dashboardo haproxy
- Adicionar o Cluster Kubernetes no haproxy
- Adicionar serviço nginx ao haproxy

  - haproxy.cfg

  ```yaml
  global
  # log "${LOGGER}:514" local0
      log /dev/log  local0
      log /dev/log  local1 notice
      user haproxy
      group haproxy
      daemon

  defaults
      log    global
      mode http
      timeout client "${TIMEOUT}"
      timeout server "${TIMEOUT}"
      timeout connect 5s

  listen stats
      bind "${LISTEN}:81"
      stats "${STATS}"
      # http-request rejeitar if { src -f "${ABUSERS}" }
      stats hide-version
      stats refresh 30s
      stats show-node
      stats auth "${STATSLP}"
      stats uri "${STATSURI}"
      stats show-desc "${STATSSHOW}"

  listen kubernetes-apiserver-https
      bind "${LISTEN}:6443"
      mode tcp
      option log-health-checks
      timeout client 3h
      timeout server 3h
      balance roundrobin
      server K8S_M01 "${SERVER}.11:${PORT_K8S}" check check-ssl verify none inter 2000

  frontend service-nginx
      mode http
      option log-health-checks
      bind "${LISTEN}:80"

      acl dns_nginx hdr(host) -i lab.k8s.io

      # config app teste weight
      acl path_nginx path_beg -i /
      use_backend nginx_weight if dns_nginx path_nginx

      # config app teste consistenthash
      acl path_nginx_hash path_beg -i /hash
      use_backend nginx_consistenthash if dns_nginx path_nginx_hash

      # config app teste loadbalancer
      acl path_nginx_lb path_beg -i /lb
      use_backend nginx_loadbalancer if dns_nginx path_nginx_lb

      # config app teste fault-injection
      acl path_nginx_injection path_beg -i /injection
      use_backend nginx_injection if dns_nginx path_nginx_injection

  backend nginx_weight
      mode http
      option forwardfor
      balance leastconn
      server RR_K8S "${SERVER}.11:${PORT_INGRESS_ISTIO}" check 

  backend nginx_consistenthash
      mode http
      option forwardfor
      balance leastconn
      server RR_K8S "${SERVER}.11:${PORT_INGRESS_ISTIO}" check 

  backend nginx_loadbalancer
      mode http
      option forwardfor
      balance leastconn
      server RR_K8S "${SERVER}.11:${PORT_INGRESS_ISTIO}" check 

  backend nginx_injection
      mode http
      option forwardfor
      balance leastconn
      server RR_K8S "${SERVER}.11:${PORT_INGRESS_ISTIO}" check 

  ```

## Comandos

- Subindo o balanceador

```bash
docker-compose up -d
```

- Derrubando o balanceador

```bash
docker-compose down
```

- Restartando o balanceador

```bash
docker-compose restart
```

- Haproxy Dashboard

<p align="center">
  <img alt="Dashboard" src="../../images/lb-haproxy.png">
</p>